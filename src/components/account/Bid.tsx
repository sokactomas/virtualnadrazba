import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, Fragment } from "react";
import { trpc } from "utils/trpc";

export const Bid: FC = () => {
    const { data: session } = useSession();

    const bidQuery = trpc.bid.list.useInfiniteQuery({
        limit: 20,
        userId: session?.user?.id
    }, {
        getNextPageParam(lastPage: any) {
            return lastPage.nextCursor;
        },
    });

    const renderHighesPrice = (item: any) => {
        if (item.price === item.record.bidPrice) {
            return (
                <div>
                    Vaša ponuka je najvyššia!
                </div>
            )
        }

        const diffPrice = item.record.bidPrice - item.price;

        return (
            <div className="flex items-center justify-between">
                <span>Najvyššia ponuka: {item.record.bidPrice.toLocaleString()} € (+ {diffPrice.toLocaleString()}€)</span>
                <Link href={`/detail/${item.record.id}`} className="button-primary">
                    Prihodiť
                </Link>
            </div>
        )
    }

    const renderRecords = () => {
        let hasRecords = false;
        let records;
        if (!bidQuery.isLoading) {
            records = bidQuery?.data?.pages?.map((page: any, index: number) => {
                if (page?.items?.length !== 0) {
                    hasRecords = true;
                }
                return (
                    <Fragment key={page.items[0]?.id || index}>
                        {page.items.map((item: any) => (
                            <div key={item.id} className='bg-white p-4 border-2 border-gray-200'>
                                <div className="text-xl font-bold">
                                    {item.record.title}
                                </div>
                                <div>
                                    <div>
                                        Vaša ponuka: <span className="font-semibold">{item.price.toLocaleString()} €</span>
                                    </div>
                                    <div>
                                        {renderHighesPrice(item)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                )
            })
        }

        if (!hasRecords && !bidQuery.isFetching) {
            return (
                <div className="bg-sky-50 text-sky-900 p-4 border border-sky-200">
                    Momentálne nemáte žiadne cenové ponuky
                </div>
            )
        }

        if (!records) {
            return null;
        }

        return (
            <Fragment>
                <div className="flex flex-col w-full space-y-2">
                    {records}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="border border-gray-300 text-gray-800 rounded-xl px-4 py-2 hover:border-gray-500 disabled:cursor-default disabled:hover:border-none disabled:border-none"
                        onClick={() => bidQuery.fetchNextPage()}
                        disabled={
                            !bidQuery.hasNextPage || bidQuery.isFetchingNextPage
                        }
                    >
                        {bidQuery.isFetchingNextPage
                            ? 'Načítava sa viac...'
                            : bidQuery.hasNextPage
                                ? 'Načítať viac'
                                : 'Všetky výsledky sú zobrazené'}
                    </button>
                </div>
            </Fragment>
        );
    }

    return (
        <div className="space-y-2">
            <div className="text-xl">
                Moje cenové ponuky
            </div>
            <div className="space-y-4">
                {renderRecords()}
            </div>
        </div>
    )
}