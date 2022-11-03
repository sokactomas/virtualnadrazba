import { Fragment, useState } from "react";
import { Record } from "components/Record";
import { NextPageWithLayout } from "pages/_app";
import { trpc } from "utils/trpc";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Login } from "components/Login";

const Homepage: NextPageWithLayout = () => {
    const { data: session, status } = useSession();
    const [number, setNumber] = useState<number>();
    const [isOpen, setIsOpen] = useState(false);

    const recordQuery = trpc.record.list.useInfiniteQuery({
        limit: 10,
    }, {
        getNextPageParam(lastPage: any) {
            return lastPage.nextCursor;
        },
    });

    trpc.randomNumber.useSubscription(undefined, {
        onData(n) {
            setNumber(n)
        }
    });
    
    const renderRecords = () => {
        if (!recordQuery.isLoading) {
            return recordQuery?.data?.pages?.map((page: any, index: number) => (
                <Fragment key={page.items[0]?.id || index}>
                    {page.items.map((item: any) => (
                        <Record key={item.id} record={item} />
                    ))}
                </Fragment>
            ))
        }

        return null
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex items-center justify-center">
                <div>
                    <div className="w-[970px] h-[308px] relative">
                        <Image src={'/homepage.png'} alt="homepage" layout='fill' objectFit='cover' />
                    </div>
                    <div className="flex justify-center">
                        <button className="button-primary" onClick={() => setIsOpen(true)}>
                            prihlásiť sa
                        </button>
                        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className="flex items-center space-x-1">
                <RocketLaunchIcon className="w-4 h-4" />
                <span>Socket testing: { number }</span>
            </div>
            <div className="flex flex-col w-full space-y-2">
            { renderRecords() }
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="border border-gray-300 text-gray-800 rounded-xl px-4 py-2 hover:border-gray-500 disabled:cursor-default disabled:hover:border-none disabled:border-none"
                    onClick={() => recordQuery.fetchNextPage()}
                    disabled={
                        !recordQuery.hasNextPage || recordQuery.isFetchingNextPage
                    }
                >
                    {recordQuery.isFetchingNextPage
                        ? 'Načítava sa viac...'
                        : recordQuery.hasNextPage
                            ? 'Načítať viac'
                            : 'Všetky výsledky sú zobrazené'}
                </button>
            </div>
        </div>
    )
}

export default Homepage;