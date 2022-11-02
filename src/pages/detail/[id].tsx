import { NextPageWithLayout } from "~/pages/_app";

const Detail: NextPageWithLayout = () => {
    return (
        <div className="w-full lg:w-[1280px] px-5 h-full flex flex-col-reverse md:flex-row flex-wrap gap-8">
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
                <div className="info">
                    <div className="date">
                        <span>Aukcia končí za</span>
                        <span>5 dní 20:30:40</span>
                    </div>
                    <div className="date">
                        <span>Forma aukcie</span>
                        <span>Tichá</span>
                    </div>
                    <div className="price">
                        <span>Minimálna ponúknutá suma</span>
                        <span>21 000 €</span>
                    </div>
                </div>
                <form>
                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website"
                               className="block text-sm font-medium text-gray-700">Website</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span
                                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">€</span>
                            <input type="price" name="company-website" id="company-website" value="21000" min="21000" step="100"
                                   className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                   placeholder="21000"/>
                        </div>
                    </div>
                    <button>Prihodiť na vozidlo</button>
                </form>
                <div className="contact">
                    <h2 className="name">TM-Auto</h2>
                    <img src="https://www.autobazar.eu/pics/logos/tm-auto.jpg?ptime=1653049219" alt="" />
                    <div>Profesionálny predajca Profesionálny predajca</div>
                    <div>Registrovaný predajca na Autobazar.EU od 15.02.2012</div>
                </div>

                <div className="trust-items">
                    <div className="item full done">
                        <h1>Overené nezávisle</h1>
                        <div>Vozidlo bolo overené odborníkom z autobazar.eu</div>
                    </div>
                    <div className="item half">
                        <h1>Vitaz autopredajca roka</h1>
                        <div>Predavajuci bol vitazom autopredajcu roka v roku 2021.</div>
                    </div>
                    <div className="item half">
                        <h1>Hodnotenie zákazníkov</h1>
                        <span>9.5 <small>/ 10</small></span>
                        <div>Hodnotenia zakaznikov z drazby</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie vozidla</h1>
                        <div>Overenie vozidla z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie kilometrov</h1>
                        <div>Overenie kilometrov z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie platnosti STK a EK</h1>
                        <div>Overenie STK a EK z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie originality</h1>
                        <div>Overenie originality z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie kradnuté</h1>
                        <div>Overenie či bolo vozidlo kradnuté, z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie záujemcami</h1>
                        <div>Počet kladných hodnotení záujemcov o toto vozidlo: 452</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie záujemcami</h1>
                        <div>Počet kladných hodnotení záujemcov o toto vozidlo: 452</div>
                    </div>
                    <div className="item small">
                        <h1>Na trhu</h1>
                        <div>Predávajúci je na trhu od 15.02.2012</div>
                    </div>
                    <div className="item small">
                        <h1>Veľkosť inzercie</h1>
                        <div>Predávajúci má na predaj ďalších 34 vozidiel.</div>
                    </div>
                </div>

                <div className="motivation-items">
                    <div className="item full done">
                        <h1>Overené nezávisle</h1>
                        <div>Vozidlo bolo overené odborníkom z autobazar.eu</div>
                    </div>
                    <div className="item half">
                        <h1>Vitaz autopredajca roka</h1>
                        <div>Predavajuci bol vitazom autopredajcu roka v roku 2021.</div>
                    </div>
                    <div className="item half">
                        <h1>Hodnotenie zákazníkov</h1>
                        <span>9.5 <small>/ 10</small></span>
                        <div>Hodnotenia zakaznikov z drazby</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie vozidla</h1>
                        <div>Overenie vozidla z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie kilometrov</h1>
                        <div>Overenie kilometrov z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie platnosti STK a EK</h1>
                        <div>Overenie STK a EK z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie originality</h1>
                        <div>Overenie originality z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie kradnuté</h1>
                        <div>Overenie či bolo vozidlo kradnuté, z online zdrojov</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie záujemcami</h1>
                        <div>Počet kladných hodnotení záujemcov o toto vozidlo: 452</div>
                    </div>
                    <div className="item small">
                        <h1>Overenie záujemcami</h1>
                        <div>Počet kladných hodnotení záujemcov o toto vozidlo: 452</div>
                    </div>
                    <div className="item small">
                        <h1>Na trhu</h1>
                        <div>Predávajúci je na trhu od 15.02.2012</div>
                    </div>
                    <div className="item small">
                        <h1>Veľkosť inzercie</h1>
                        <div>Predávajúci má na predaj ďalších 34 vozidiel.</div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Detail;