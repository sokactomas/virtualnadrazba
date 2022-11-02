import { ArchiveBoxIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Auction } from "~/components/account/Auction";
import { InvalidRecord } from "~/components/create/InvalidRecord";
import { Record } from "~/components/create/Record";
import { NextPageWithLayout } from "../_app";

const Account: NextPageWithLayout = () => {
    const router = useRouter();

    const { slug } = router?.query;

    const renderContent = () => {
        if (slug && slug[0] === 'auction') {
            return (
                <Auction />
            )
        }

        return (
            <>
                <InvalidRecord />
                <Record />
                <Record />
                <Record />
            </>
        )
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className='flex items-center justify-between'>
                <div className="text-2xl font-semibold">Moje konto</div>
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