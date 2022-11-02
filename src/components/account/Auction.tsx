import { useSession } from "next-auth/react";
import { FC, Fragment } from "react";
import { trpc } from "~/utils/trpc";
import { Record } from "../Record";

export const Auction: FC = () => {
    const { data: session } = useSession();

    const recordQuery = trpc.record.list.useInfiniteQuery({
        limit: 20,
        userId: session?.user?.id
    }, {
        getNextPageParam(lastPage) {
            return lastPage.nextCursor;
        },
    });

    const renderRecords = () => {
        let hasRecords = false;
        let records;
        if (!recordQuery.isLoading) {
            records = recordQuery?.data?.pages?.map((page, index) => {
                if (page?.items?.length !== 0) {
                    hasRecords = true;
                }
                return (
                    <Fragment key={page.items[0]?.id || index}>
                        {page.items.map((item) => (
                            <Record key={item.id} record={item} />
                        ))}
                    </Fragment>
                )
            })
        }

        if (!hasRecords && !recordQuery.isFetching) {
            return (
                <div className="bg-sky-50 text-sky-900 p-4 border border-sky-200">
                    Momentálne nemáte žiadne inzeráty v dražbe
                </div>
            )
        }

        if (!records) {
            return null;
        }

        return (
            <Fragment>
                <div className="flex flex-col w-full space-y-2">
                    { records }
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
            </Fragment>
        );
    }

    return (
        <div className="space-y-2">
            <div className="text-xl">
                Moje dražby
            </div>
            <div className="space-y-4">
                { renderRecords() }
            </div>
        </div>
    )
}