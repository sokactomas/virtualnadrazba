import { NextPageWithLayout } from "~/pages/_app";
import { useState, useRef } from "react";

const Detail: NextPageWithLayout = () => {
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <div className="w-full lg:w-4/5 px-5 h-full flex flex-col-reverse md:flex-row flex-wrap gap-8">
            <article className="p-content">
                <h1 className="mt-0 mb-6 text-2xl">Škoda Superb Combi 2.0 TDI 190k Sportline EU6</h1>
                <div className="rounded-md overflow-hidden">
                    <div className="">
                        <img src="https://www.autobazar.eu/pics/9021/30068963_1.jpg" alt=""/>
                    </div>
                    <div className="mt-3 gap-3 grid grid-cols-6 gap-2 xl:gap-4">
                        <img src="https://www.autobazar.eu/pics/9021/30068963_2.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_3.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_4.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_5.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_6.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_7.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_8.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_9.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_10.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_11.jpg" alt="" />
                        <img src="https://www.autobazar.eu/pics/9021/30068963_12.jpg" alt="" />
                    </div>
                </div>
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Základné údaje</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Palivo:</span>
                            <span className="p-cap">Diesel</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Karoséria:</span>
                            <span className="p-cap">Combi</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Rok výroby:</span>
                            <span className="p-cap">4/2017</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Prevodovka:</span>
                            <span className="p-cap">Manuálna - 6 stupňov</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Objem valcov:</span>
                            <span className="p-cap">1 968 cm<sup>3</sup></span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Výkon:</span>
                            <span className="p-cap">140kW (190PS)</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Najazdené km:</span>
                            <span className="p-cap">146 711 km</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Pohon:</span>
                            <span className="p-cap">Predný</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Počet dverí:</span>
                            <span className="p-cap">5 (5 miest)</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Farba:</span>
                            <span className="p-cap">Biela</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">VIN:</span>
                            <span className="p-cap">TMBJJ7NPXH7502968</span>
                        </li>
                    </ul>
                </div>
                <hr className="mt-8" />
                <div className="mt-8">
                    <h3 className="mt-0 mb-3 text-2xl">Spotreba</h3>
                    <ul className="grid grid-cols-3 gap-4">
                        <li className="p-item">
                            <span className="block font-bold">Kombinovaná:</span>
                            <span className="p-value">4.2 l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">V meste:</span>
                            <span className="p-value">5 l</span>
                        </li>
                        <li className="p-item">
                            <span className="block font-bold">Mimo mesta:</span>
                            <span className="p-value">3.8 l</span>
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
                                <li>ABS</li>
                                <li>ASR(TC,EDS)</li>
                                <li>Airbag 7X</li>
                                <li>Alarm</li>
                                <li>DSC(DTC)</li>
                                <li>Deaktivácia airbagov</li>
                                <li>EBD/EBV</li>
                                <li>ESP(VDC)</li>
                                <li>Indikátor tlaku v pneu</li>
                                <li>Isofix</li>
                                <li>MSR</li>
                                <li><span className="p-highlight">Natáčacie svetlomety</span></li>
                                <li>Posilňovač riadenia</li>
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
                                <li>Bezkľúčové otváranie dverí</li>
                                <li>Bluetooth</li>
                                <li><span className="p-highlight">Dažďový senzor</span></li>
                                <li>Disky z ľahkej zliatiny</li>
                                <li>El. otváranie kufra</li>
                                <li>El. zatváranie kufra</li>
                                <li>Hmlové svetlomety</li>
                                <li>Imobilizér</li>
                                <li>LED denné svietenie</li>
                                <li>LED svetlomety</li>
                                <li>Navigačný systém</li>
                                <li>Palubný počítač</li>
                                <li><span className="p-highlight">Pamäťové sedačky</span></li>
                                <li>Parkovacie senzory vzadu a vpredu</li>
                                <li>Stop&amp;Start systém</li>
                                <li>Strešný nosič</li>
                                <li><span className="p-highlight">Svetelný senzor</span></li>
                                <li>Tempomat</li>
                                <li>Tónované sklá</li>
                                <li>Vyhrievané predné sedadlá</li>
                                <li>Vyhrievané spätné zrkadlá</li>
                            </ul>
                        </div>
                    </div>
                    <h4 className="mt-4 mb-3 text-lg font-bold">Ďalšia výbava</h4>
                    <div className="p-message">
                        Adaptívny podvozok, Kožený paket, Asistent rozjazdu do kopca, SPORTLINE, LED denné svietenie,
                        Front assist - systém núdzového brzdenia, Rozpoznávanie dopravných značiek, Elektricky
                        nastaviteľné sedadlo vodiča s pamäťou, 2x el. sedadlá, Elektricky nastaviteľné vonkajšie spätné
                        zrkadlá s pamäťou, Farebný Maxi DOT - plnegrafický displej palubného počítača, Interiér
                        SportLine - športové sedadlá Alcantara so strieborným prešitím, SunSet - zadné sklá s vyšším
                        tónovaním od B-stlpika, 19&quot; hliníkové disky, Asistent rozjazdu do kopca, El. ovládaný batožinový
                        priestor, Dvojité dno kufra, Svetelný asistent - Coming Home/Leaving Home, Bezkľúčové otváranie
                        dverí, Bezkľúčové štartovanie, El. sklápanie spätných zrkadiel, Ambientné osvetlenie interiéru,
                        MirrorLink, Zásuvka na 230V..
                    </div>
                </div>
            </article>
            <aside className="p-info">
                <div className="rounded-md border p-5 shadow-2xl">
                    <ul className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2 text-center">
                        <li>
                            <span>Aukcia končí za</span>
                            <span className="block font-bold text-2xl">5 dní 20:30:40</span>
                        </li>
                        <li>
                            <span>Min. ponúknutá suma</span>
                            <span className="block font-bold text-2xl">21 000 €</span>
                        </li>
                    </ul>
                    <form className="mt-4">
                        <div className="col-span-3 sm:col-span-2">
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">€</span>
                                <input type="number" name="price" id="company-website" value="21000" min="21000" step="100" className="block w-full p-2 rounded-none rounded-r-md border border-gray-300 sm:text-sm" placeholder="21000"/>
                            </div>
                        </div>
                        <button type="button" className="mt-4 w-full bg-amber-600 p-2 text-white rounded-md border border-amber-700">Prihodiť na vozidlo</button>
                    </form>
                </div>

                <div className="mt-8">
                    <div className="rounded border py-2 px-3 border-green-600 text-green-900 bg-green-100 flex items-center justify-center">
                        <div className="w-12 h-12 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>
                        <div className="">
                            <div className="font-bold text-lg mb-1">Overené nezávisle</div>
                            <div>Vozidlo bolo nezávisle overené odborníkom z autobazar.eu</div>
                        </div>
                    </div>
                    <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:grid" + (!show ? " hidden" : "")}>
                        <div className="mt-3 rounded border py-2 px-3 border-orange-600 text-orange-900 bg-orange-100">
                            <div>
                                <div className="font-bold mb-1">História vozidla</div>
                                <div>Skontrolujte históriu, počet kilometrov, výbavu...</div>
                                <button type="button" className="mt-4 w-full bg-amber-600 p-1 text-white rounded-md border border-amber-700">Overiť vozidlo</button>
                            </div>
                        </div>
                        <div className="mt-3 rounded border py-2 px-3 border-orange-600 text-orange-900 bg-orange-100">
                            <div>
                                <div className="font-bold mb-1">Overenie STK a EK</div>
                                <div>Overenie STK a EK z online zdrojov.</div>
                                <button type="button" className="mt-4 w-full bg-amber-600 p-1 text-white rounded-md border border-amber-700">Overiť STK / EK</button>
                            </div>
                        </div>
                    </div>
                    <div className={"grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:grid" + (!show ? " hidden" : "")}>
                        <div className="mt-3 rounded border py-2 px-3 border-green-600 text-green-900 bg-green-100">
                            <div className="h-12">
                                <img src="https://www.autopredajcaroka.eu/images/badge-result.svg" className="h-12 m-auto" />
                            </div>
                            <div>
                                <div className="font-bold mb-1">Vitaz autopredajca roka</div>
                                <div>Predavajuci bol vitazom autopredajcu roka v roku 2021.</div>
                            </div>
                        </div>
                        <div className="mt-3 rounded border py-2 px-3 border-green-600 text-green-900 bg-green-100">
                            <div className="h-12 text-center">
                                <span className="text-3xl">9.5 <small className="text-base">/ 10</small></span>
                            </div>
                            <div>
                                <div className="font-bold mb-1">Hodnotenie zákazníkov</div>
                                <div>Hodnotili prechádzajúci zákazníci.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mt-8 rounded-md border p-5 shadow-2xl md:block" + (!show ? " hidden" : "")}>
                    <div className="flex items-center">
                        <img src="https://www.autobazar.eu/pics/logos/tm-auto.jpg?ptime=1653049219" alt="" className="rounded-md h-16 w-16" />
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">TM-Auto</h2>
                            <div className="flex">
                                <img src="https://tm-auto.autobazar.eu/assets/images/icons/profesionlny-predajca.svg" alt="" />
                                <span className="ml-1">Profesionálny predajca</span>
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4">
                        <li className="text-green-800 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span className="pl-1">prihlásime auto za vás</span>
                        </li>
                        <li className="text-red-800 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="pl-1">zabezpečíme dovoz auta</span>
                        </li>
                        <li className="text-green-800 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span className="pl-1">financovanie ukončené</span>
                        </li>
                        <li className="text-gray-500 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <span className="pl-1">servisované v autorizovanom servise</span>
                        </li>
                    </ul>
                    <div className="mt-4">Registrovaný predajca na Autobazar.EU od 15.02.2012</div>
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