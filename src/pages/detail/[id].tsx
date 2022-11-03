import { NextPageWithLayout } from "pages/_app";
import { useState, useRef } from "react";
import {IDamage, IPhotoDamage} from "common/interfaces/detail/damage.interface";
import {trpc} from "utils/trpc";
import {useRouter} from "next/router";
import { BidPrice } from "components/detail/BidPrice";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const Detail: NextPageWithLayout = () => {
    const [show, setShow] = useState<boolean>(false);
    const [invalidPhotos, setInvalidPhotos] = useState<IPhotoDamage[]>([]);

    const toggleShow = () => {
        setShow(!show);
    }

    const router = useRouter();

    const recordQuery = trpc.record.get.useQuery({
        id: Number(router?.query?.id)
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    if (recordQuery.isLoading) {
        return (
            <div>Načítavam ...</div>
        );
    }

    const getPhotoData = (image:string): Promise<any> => {
        return fetch('https://vehicle-damage-assessment.p.rapidapi.com/run', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '6e2b5c626dmsh6e3498a12d61233p1105abjsn3385b4effa49',
                'X-RapidAPI-Host': 'vehicle-damage-assessment.p.rapidapi.com'
            },
            body: JSON.stringify({
                draw_result: true,
                image
            })
        });
    }

    const getInvalidPhotos = () => {
        const photos = [
            'https://jixjiastorage.blob.core.windows.net/public/sensor-ai/vehicle_damage/sample.jpg',
            'https://jixjiastorage.blob.core.windows.net/public/sensor-ai/vehicle_damage/sample.jpg'
        ];

        photos.forEach(image => {
            getPhotoData(image)
                .then(response => response.json())
                .then(response => {
                    let damages:IDamage[] = [];
                    response.output.elements.forEach((res: { score: number; bbox: any; }) => {
                        if (res.score >= 0.4) {
                            damages.push({
                                score: res.score,
                                box: res.bbox
                            });
                        }
                    });

                    if (damages.length > 0) {
                        damages.sort((a: IDamage, b: IDamage): number => {
                            if (a.score > b.score) {
                                return -1;
                            }
                            if (a.score < b.score) {
                                return 1;
                            }

                            return 0;
                        });

                        invalidPhotos.push({
                            photo: image,
                            result: {
                                photo: response.output_url,
                                urlExpiry: response.url_expiry,
                                isDamaged: true,
                                damages
                            }
                        });

                        setInvalidPhotos(invalidPhotos);
                    }
                })
        });
    }

    const numberFormat = new Intl.NumberFormat('sk-SK', { maximumSignificantDigits: 3 });

    console.log(recordQuery?.data?.pltRecord[0])

    return (
        <div className="w-full lg:w-4/5 px-5 h-full flex flex-col-reverse md:flex-row flex-wrap gap-8">
            <article className="p-content">
                <h1 className="mt-0 mb-6 text-2xl">{ recordQuery?.data?.record.title }</h1>
                {(recordQuery?.data?.pltRecord[0].image || recordQuery?.data?.pltRecord[0].images.length > 0) &&
                    <div className="rounded-md overflow-hidden">
                        { recordQuery?.data?.pltRecord[0].image &&
                            <div className="">
                                <img src={ recordQuery?.data?.pltRecord[0].image.previewUrls.orig } alt=""/>
                            </div>
                        }
                        {recordQuery?.data?.pltRecord[0].images.length > 0 &&
                            <div className="mt-3 gap-3 grid grid-cols-6 gap-2 xl:gap-4">
                                {recordQuery?.data?.pltRecord[0].images.map(image => {
                                    return (
                                        <img src={image.previewUrls.orig} alt=""/>
                                    );
                                })
                                }
                            </div>
                        }
                    </div>
                }
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Základné údaje</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Palivo:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].fuelValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Karoséria:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].bodyworkValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Rok výroby:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].monthValue }/{ recordQuery?.data?.pltRecord[0].yearValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Prevodovka:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].gearboxValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Objem valcov:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord[0].engineCapacity)) } cm<sup>3</sup></span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Výkon:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord[0].enginePower)) }kW</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Najazdené km:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord[0].mileage)) } km</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Pohon:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].driveValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Farba:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].colorValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">VIN:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord[0].vin }</span>
                        </li>
                    </ul>
                </div>
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Spotreba</h3>
                    <ul className="grid grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Kombinovaná:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord[0].consumptionCombined } l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">V meste:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord[0].consumptionInTheCity } l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Mimo mesta:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord[0].consumptionOutOfTown } l</span>
                        </li>
                    </ul>
                </div>
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Výbava:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div>
                            <h4 className="mt-0 mb-3 text-lg font-bold">Bezpečnosť:</h4>
                            <ul className="p-options">
                                {
                                    recordQuery?.data?.pltRecord[0].carEquipmentValue.split(',').map(item => {
                                        return (
                                            <li>{item.trim()}</li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <h4 className="mt-0 mb-3 text-lg font-bold">Komfort:</h4>
                            <ul className="p-options">
                                <li>Automatická dvojzónová klimatizácia</li>
                                <li><span className="p-highlight">Bezkľúčové štartovanie</span></li>
                                <li>Centrálne uzamykanie</li>
                                <li>Diaľkové ovládanie</li>
                                <li>El. nastaviteľné sedadlá</li>
                                <li>El. predné a zadné okná</li>
                                <li>El. zrkadlá</li>
                                <li>Klimatizovaná priehradka</li>
                                <li>Lakťová opierka</li>
                                <li>Multifunkčný volant</li>
                                <li>Ostrekovače svetlometov</li>
                                <li>Rádio</li>
                                <li>Rádio/CD/DVD</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mt-0 mb-3 text-lg font-bold">Ostatné:</h4>
                            <ul className="p-options">
                                {
                                    recordQuery?.data?.pltRecord[0].otherEquipment.split(',').map(item => {
                                        return (
                                            <li>{item.trim()}</li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <h4 className="mt-4 mb-3 text-lg font-bold">Ďalšia výbava</h4>
                    <div className="p-message">
                        {recordQuery?.data?.pltRecord[0].otherEquipment}
                    </div>
                </div>
            </article>
            <aside className="p-info space-y-2">
                <BidPrice 
                    record={recordQuery?.data?.record} 
                />
                <div className="rounded border py-2 px-3 border-green-600 text-green-900 bg-green-100 flex items-center justify-center space-x-4">
                    <ShieldCheckIcon className="w-14 h-14" />
                    <div>
                        <div className="font-bold text-lg">Overené nezávisle</div>
                        <div>Vozidlo bolo nezávisle overené odborníkom z autobazar.eu</div>
                    </div>
                </div>
                <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:grid" + (!show ? " hidden" : "")}>
                    <div className="rounded border py-2 px-3 border-orange-600 text-orange-900 bg-orange-100">
                        <div>
                            <div className="font-bold mb-1">História vozidla</div>
                            <div>Skontrolujte históriu, počet kilometrov, výbavu...</div>
                            <button type="button" className="mt-4 w-full bg-amber-600 p-1 text-white rounded-md border border-amber-700">Overiť vozidlo</button>
                        </div>
                    </div>
                    <div className="rounded border py-2 px-3 border-orange-600 text-orange-900 bg-orange-100">
                        <div>
                            <div className="font-bold mb-1">Overenie STK a EK</div>
                            <div>Overenie STK a EK z online zdrojov.</div>
                            <button type="button" className="mt-4 w-full bg-amber-600 p-1 text-white rounded-md border border-amber-700">Overiť STK / EK</button>
                        </div>
                    </div>
                </div>
                <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:grid" + (!show ? " hidden" : "")}>
                    <div className="rounded border py-2 px-3 border-orange-600 text-orange-900 bg-orange-100">
                        <div>
                            <div className="font-bold mb-1">Overenie poškodenia</div>
                            <div>Overiť poškodenie vozidla pomocou umelej inteligencie.</div>
                            <button type="button" className="mt-4 w-full bg-amber-600 p-1 text-white rounded-md border border-amber-700" onClick={getInvalidPhotos}>Overiť stav</button>
                        </div>
                    </div>
                    <div className="rounded border py-2 px-3 border-green-600 text-green-900 bg-green-100">
                        <div className="h-12 text-center">
                            <span className="text-3xl">9.5 <small className="text-base">/ 10</small></span>
                        </div>
                        <div>
                            <div className="font-bold mb-1">Hodnotenie zákazníkov</div>
                            <div>Hodnotili prechádzajúci zákazníci.</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-row justify-center cursor-pointer select-none md:hidden" onClick={toggleShow}>
                    <span className={(show ? 'rotate-180' : '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                    <span className="ml-1">{(show ? "Zobraziť menej" : "Zobraziť viac")}</span>
                </div>
            </aside>
        </div>
    )
}

export default Detail;