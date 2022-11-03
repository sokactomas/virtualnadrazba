import { ArchiveBoxIcon, BanknotesIcon, GlobeEuropeAfricaIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Auction } from "components/account/Auction";
import { Offer } from "components/account/Offer";
import { NextPageWithLayout } from "../_app";
import { Bid } from "components/account/Bid";

const Account: NextPageWithLayout = () => {
    const router = useRouter();

    const { slug } = router?.query;

    const renderContent = () => {
        const content = slug ? slug[0] : undefined;

        switch (content) {
            case 'auction':
                return <Auction />
            case 'bid':
                return <Bid />
            default:
                return (
                    <div className="space-y-2">
                        <div className="text-xl">
                            Moja ponuka
                        </div>
                        <Offer />
                    </div>
                )
        }
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className='flex items-center justify-between'>
                <div className="text-2xl font-semibold">
                    Moje konto
                </div>
                <div>
                    <Link href={'/create'} className="button-primary">
                        Pridať do dražby
                    </Link>
                </div>
            </div>
            <div className="grid md:grid-cols-6 gap-3 lg:gap-4 lg:grid-cols-4">
                <div className="col-span-2 lg:col-span-1">
                    <ul className='space-y-2 w-full'>
                        <li className="group">
                            <Link href={"/account"} className="text-gray-700 flex items-center space-x-4 border bg-gray-100 py-1 px-4 rounded-lg group-hover:text-black group-hover:border-gray-300">
                                <ArchiveBoxIcon className="w-5 h-5" />
                                <span>Moja ponuka</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link href={"/account/auction"} className="text-gray-700 flex items-center space-x-4 border bg-gray-100 py-1 px-4 rounded-lg group-hover:text-black group-hover:border-gray-300">
                                <QueueListIcon className="w-5 h-5" />
                                <span>Moje dražby</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link href={"/account/bid"} className="text-gray-700 flex items-center space-x-4 border bg-gray-100 py-1 px-4 rounded-lg group-hover:text-black group-hover:border-gray-300">
                                <BanknotesIcon className="w-5 h-5" />
                                <span>Moje cenové ponuky</span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link href={"/"} className="text-gray-700 flex items-center space-x-4 border bg-gray-100 py-1 px-4 rounded-lg group-hover:text-black group-hover:border-gray-300 justify-between">
                                <span className="flex space-x-4 items-center">
                                    <GlobeEuropeAfricaIcon className="w-5 h-5" />
                                    <span>Dražba</span>
                                </span>
                                <span className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-full flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-white block rounded-full relative">
                                        <span className="h-2 w-2 bg-white block rounded-full absolute top-0 bottom-0 animate-ping"></span>
                                    </span>
                                    <span>živé</span>
                                </span>
                            </Link>
                        </li>
                        <li className="group">
                            <Link href={"/create"} className="text-gray-700 flex items-center space-x-4 border bg-gray-100 py-1 px-4 rounded-lg group-hover:text-black group-hover:border-gray-300">
                                <PlusIcon className="w-5 h-5" />
                                <span>Pridať do dražby</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='md:col-span-4 lg:col-span-3 space-y-2'>
                    { renderContent() }
                </div>
            </div>
        </div>
    )
}

export default Account;