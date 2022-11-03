import { NextPageWithLayout } from "pages/_app";
import { useState, BaseSyntheticEvent } from "react";
import {IDamage, IPhotoDamage} from "common/interfaces/detail/damage.interface";
import {trpc} from "utils/trpc";
import {useRouter} from "next/router";
import { BidPrice } from "components/detail/BidPrice";
import { ArrowPathIcon, CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Detail: NextPageWithLayout = () => {
    const [show, setShow] = useState<boolean>(false);
    const [damageCheck, setDamageCheck] = useState<number>(0);
    const [stkValid, setStkValid] = useState<number>(0);
    const [ekValid, setEkValid] = useState<number>(0);
    const [stk, setStk] = useState<Date>();
    const [ek, setEk] = useState<Date>();

    const invalidPhotos: string[] = [
        'https://m1.aimg.sk/inzercie/78b744033b71ffd3fe6924d3e4f2ac62c3a747581667467364.png',
        'https://m1.aimg.sk/inzercie/6f475ebfdfcb8c110b8e10ec6aaa91cb170c13f21667467424.png'
    ];

    const rapidApiMutation = trpc.rapidApi.vehicleDamage.useMutation();

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

    const setStkEk = () => {
        // fetch('https://www.autobazar.work/ajax/json_iris_gettechnickeudajevozidla.php?ecv_vozidla=' + (recordQuery?.data?.pltRecord[0].licensePlate ? recordQuery?.data?.pltRecord[0].licensePlate : 'HE006CN'), {
        //     method: 'GET'
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //     });

        const response = JSON.parse('{"orig":{"GetTechnickeUdajeVozidloResult":{"Msg":{"Description":"OK","ErrorId":"OK"},"Vozidlo":{"DatumPrvejEvidencie":"2015-11-05T00:00:00","DatumPrvejEvidencieSK":"2020-10-23T00:00:00","Farba":"\u0160ed\u00e1 metal\u00edza","Karoseria":"AB hatchback 5dv.","Model":"A5 SPORTBACK","Palivo":"NAFTA","PalivoSpotreba":null,"PlatnostEK":"2024-10-24T00:00:00","PlatnostTK":"2024-10-24T00:00:00","PocetMiestSedenie":null,"Prevodovka":"automatick\u00e1","PrevodovkaPocetStupnov":"7","RokVyroby":"0","VIN":"WAUZZZ8T1GA014569","VykonMotora":"180","ZdvihovyObjem":"2967","Znacka":"AUDI"}}},"DatumPrvejEvidencie":"2015-11-05T00:00:00","DatumPrvejEvidencieSK":"2020-10-23T00:00:00","PalivoSpotreba":null,"PlatnostEK":"2024-10-24T00:00:00","PlatnostTK":"2024-10-24T00:00:00","PocetMiestSedenie":null,"PrevodovkaPocetStupnov":"7","VIN":"WAUZZZ8T1GA014569","VykonMotora":"180","ZdvihovyObjem":"2967","IdLog":135961,"Znacka":"5","Model":"3770","Karoseria":16,"Farba":"808080","Palivo":1,"RokVyroby":"2015","Prevodovka":7,"PocetParametrov":30,"KaroseriaEurotax":13}');

        const stk = new Date(response.PlatnostTK);
        setStk(stk);

        const ek = new Date(response.PlatnostEK);
        setEk(ek);

        if (stk > new Date()) {
            setStkValid(1);
        } else {
            setStkValid(2);
        }

        if (ek > new Date()) {
            setEkValid(1);
        } else {
            setEkValid(2);
        }
    };

    const getPhotoData = (image: string): Promise<any> => {
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

    const handleVerifyVehicle = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        await rapidApiMutation.mutateAsync({
            images: invalidPhotos
        });
    }

    const numberFormat = new Intl.NumberFormat('sk-SK', { maximumSignificantDigits: 3 });

    const renderImage = () => {
        if (recordQuery?.data?.pltRecord?.image) {
            return (
                <div className="w-full h-[542px] relative flex items-center justify-center rounded-xl overflow-hidden">
                    <Image src={recordQuery?.data?.pltRecord?.image.previewUrls.orig} alt="" layout='fill' objectFit='cover' />
                </div>
            )
        }

        return (
            <div className="bg-gray-200 min-w-[723px] w-full h-[542px] relative flex items-center justify-center" />
        )
    }

    const renderThumbs = () => {
        if (recordQuery?.data?.pltRecord?.images) {
            return recordQuery?.data?.pltRecord?.images?.map((image) => (
                <div key={image?.id} className="w-[104px] h-[80px] relative mr-0.5 mb-0.5 rounded-md overflow-auto">
                    <Image src={image?.previewUrls?.thumbnail} alt={recordQuery?.data?.pltRecord?.title || ''} layout='fill' objectFit='cover' />
                </div>
            ))
        }

        return null;
    }

    const renderInvalidPhotos = () => {
        return invalidPhotos.map((url, index) => (
            <div key={index} className="w-[104px] h-[80px] relative mr-0.5 mb-0.5 rounded-md overflow-auto">
                <Image src={url} alt={recordQuery?.data?.pltRecord?.title || ''} layout='fill' objectFit='cover' />
            </div>
        ))
    }

    const renderVehicleverificationButton = () => {
        if (rapidApiMutation.isSuccess && rapidApiMutation?.data?.length > 0) {
            return (
                <div className="flex items-center justify-center border border-green-300 space-x-2 bg-green-100 text-green-700 py-1.5 px-4 rounded-md">
                    <CheckCircleIcon className="w-6 h-6" />
                    <span>Úspešne overené</span>
                </div>
            )
        }

        if (rapidApiMutation.isLoading) {
            return (
                <div className="flex items-center justify-center border border-sky-300 space-x-2 bg-sky-100 text-sky-700 py-1.5 px-4 rounded-md">
                    <ArrowPathIcon className="w-6 h-6 animate-spin" />
                    <span>Overuje...</span>
                </div>
            )
        }

        return (
            <button type="button" className="flex items-center justify-center border border-sky-300 font-semibold space-x-2 bg-sky-100 hover:bg-sky-200 text-sky-700 py-1.5 px-4 rounded-md" onClick={handleVerifyVehicle}>
                Overiť stav
            </button>
        )
    }

    const renderVehicleverification = () => {
        return (
            <div className="rounded border py-2 px-3 flex flex-col justify-evenly space-y-2">
                <div className="font-bold">Overenie poškodenia</div>
                <div className="text-sm">Overiť poškodenie vozidla pomocou umelej inteligencie.</div>
                { renderVehicleverificationButton() }
            </div>
        )
    }

    const renderVehicleHistory = () => {
        return (
            <div className="rounded border py-2 px-3 flex flex-col justify-evenly space-y-2">
                <div className="font-bold">História vozidla</div>
                <div className="text-sm">Skontrolujte históriu, počet kilometrov, výbavu...</div>
                <a rel="noreferrer" href={'https://www.carvertical.com/sk/predbezna-kontrola?a=uc&b=82735778&chan=abeudskt3&vin=' + (recordQuery?.data?.pltRecord?.vin)} target="_blank" className="flex items-center justify-center border border-sky-300 font-semibold space-x-2 bg-sky-100 hover:bg-sky-200 text-sky-700 py-1.5 px-4 rounded-md">
                    Overiť vozidlo
                </a>
            </div>
        )
    }

    const renderVehicleDamageElement = (vehicleDamageElement: any) => {
        return vehicleDamageElement?.map((element: any) => (
            <div key={element?.damage_id} className='text-sm flex items-center space-x-2'>
                <div>Kategória: {element?.damage_category}</div>
                <div>Miesto: {element?.damage_location}</div>
                <div>Skóre: <span className="font-bold">{Math.floor(element?.score * 100)}</span> / 100</div>
            </div>
        ))
    }

    const renderVehicleDamage = () => {
        return rapidApiMutation?.data?.map((vehicleDamage: any) => (
            <div key={vehicleDamage.job_id} className='flex space-x-2'>
                <div className="shrink-0 bg-gray-200 w-[276px] h-[210px] relative rounded-md overflow-auto">
                    <Image src={vehicleDamage?.output_url} alt={vehicleDamage?.job_id} layout='fill' objectFit='cover' />
                </div>
                <div className="flex flex-col space-y-1">
                    {renderVehicleDamageElement(vehicleDamage?.output?.elements)}
                </div>
            </div>
        ))
    }

    const renderVehicleDamageSection = () => {
        if (rapidApiMutation.isSuccess && rapidApiMutation?.data?.length > 0) {
            return (
                <div className="space-y-2 py-4">
                    <div className="text-xl font-semibold">Poškodenie vozidla</div>
                    { renderVehicleDamage() }
                </div>
            )
        }

        return null;
    }

    return (
        <div className="w-full lg:w-4/5 px-5 h-full flex flex-col-reverse md:flex-row flex-wrap gap-8">
            <article className="p-content space-y-4">
                <div>
                    <h1 className="mt-0 mb-6 text-2xl font-bold">{ recordQuery?.data?.record.title }</h1>
                    <div className="space-y-4">
                        { renderImage() }
                        <div className="flex flex-wrap">
                            { renderThumbs() }
                            { renderInvalidPhotos() }
                        </div>
                    </div>
                    {renderVehicleDamageSection() }
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="mt-0 mb-3 text-2xl">Základné údaje</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Palivo:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.fuelValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Karoséria:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.bodyworkValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Rok výroby:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.monthValue }/{ recordQuery?.data?.pltRecord?.yearValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Prevodovka:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.gearboxValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Objem valcov:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord?.engineCapacity)) } cm<sup>3</sup></span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Výkon:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord?.enginePower)) }kW</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Najazdené km:</span>
                            <span className="p-cap">{ numberFormat.format(Number(recordQuery?.data?.pltRecord?.mileage)) } km</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Pohon:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.driveValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Farba:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.colorValue }</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">VIN:</span>
                            <span className="p-cap">{ recordQuery?.data?.pltRecord?.vin }</span>
                        </li>
                    </ul>
                </div>
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Spotreba</h3>
                    <ul className="grid grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Kombinovaná:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord?.consumptionCombined } l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">V meste:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord?.consumptionInTheCity } l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Mimo mesta:</span>
                            <span className="p-value">{ recordQuery?.data?.pltRecord?.consumptionOutOfTown } l</span>
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
                                    recordQuery?.data?.pltRecord?.carEquipmentValue.split(',').map((item, index) => {
                                        return (
                                            <li key={index}>{item.trim()}</li>
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
                                    recordQuery?.data?.pltRecord?.otherEquipment?.split(',').map((item, index) => {
                                        return (
                                            <li key={index}>{item.trim()}</li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <h4 className="mt-4 mb-3 text-lg font-bold">Ďalšia výbava</h4>
                    <div className="p-message">
                        {recordQuery?.data?.pltRecord?.otherEquipment}
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
                <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 space-y-2 md:space-y-0 md:grid" + (!show ? " hidden" : "")}>
                    { renderVehicleHistory() }
                    <div className="rounded border py-2 px-3 flex flex-col justify-evenly space-y-2">
                        <div className="font-bold">Overenie STK a EK</div>
                        <div className="text-sm">Overenie STK a EK z online zdrojov.</div>
                        {(stkValid !== 1 || ekValid !== 1) && (<button type="button" className="flex items-center justify-center border border-sky-300 font-semibold space-x-2 bg-sky-100 hover:bg-sky-200 text-sky-700 py-1.5 px-4 rounded-md" onClick={setStkEk}>
                            Overiť STK / EK
                        </button>)}
                        {stkValid === 1 && <div className="mt-2">Platnosť STK: { stk?.getDate() }.{ stk && stk?.getMonth() + 1 }.{ stk?.getFullYear() }</div>}
                        {stkValid === 2 && <div className="mt-2 text-red-900">Platnosť STK: neplatné</div>}
                        {ekValid === 1 && <div className="mt-2">Platnosť EK: { ek?.getDate() }.{ ek && ek?.getMonth() + 1 }.{ ek?.getFullYear() }</div>}
                        {ekValid === 2 && <div className="mt-2 text-red-900">Platnosť EK: neplatné</div>}
                    </div>
                </div>
                <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 space-y-2 md:space-y-0 md:grid" + (!show ? " hidden" : "")}>
                    { renderVehicleverification() }
                    <div className="rounded border py-2 px-3 flex flex-col justify-evenly border-green-300 text-green-900 bg-green-100">
                        <div className="h-12 text-center">
                            <span className="text-3xl">9.5 <small className="text-base">/ 10</small></span>
                        </div>
                        <div>
                            <div className="font-bold mb-1">Hodnotenie zákazníkov</div>
                            <div className="text-sm">Hodnotili prechádzajúci zákazníci.</div>
                        </div>
                    </div>
                </div>

                <div className={"mt-8 space-y-4 rounded-md border py-2 px-3 md:block" + (!show ? " hidden" : "")}>
                    <div className="font-bold text-xl">Základné údaje:</div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-green-800 flex items-center justify-between">
                            <span className="block font-bold">Počet majiteľov/držiteľov vozidla v SR:</span>
                            <span className="p-value">3 / 3</span>
                        </div>
                        <div className="text-green-800 flex items-center justify-between">
                            <span className="block font-bold">Pátranie:</span>
                            <span>nie</span>
                        </div>
                        <div className="text-red-800 flex items-center justify-between">
                            <span className="block font-bold">Kontrola originality:</span>
                            <span>nie</span>
                        </div>
                        <div className="text-red-800 flex items-center justify-between">
                            <span className="block font-bold">Leasing vozidla:</span>
                            <span>nie</span>
                        </div>
                        <div className="text-red-800 flex items-center justify-between">
                            <span className="block font-bold">Poškodenie vozidla:</span>
                            <span>nie</span>
                        </div>
                        <div className="text-green-800 flex items-center justify-between">
                            <span className="block font-bold">Servisované v autorizovanom servise:</span>
                            <span>áno</span>
                        </div>
                        <div className="text-red-800 flex items-center justify-between">
                            <span className="block font-bold">Prihlásime auto za vás:</span>
                            <span>nie</span>
                        </div>
                        <div className="text-red-800 flex items-center justify-between">
                            <span className="block font-bold">Zabezpečíme dovoz auta k vám domov:</span>
                            <span>nie</span>
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