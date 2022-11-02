import { Fragment } from "react";
import { record } from "zod";
import { Record } from "~/components/home/Record";
import { NextPageWithLayout } from "~/pages/_app";
import { trpc } from "~/utils/trpc";

const Homepage: NextPageWithLayout = () => {
    const recordQuery = trpc.record.list.useInfiniteQuery({
        limit: 2
    }, {
        getNextPageParam(lastPage) {
            return lastPage.nextCursor;
        },
    });
    
    const renderRecords = () => {
        if (!recordQuery.isLoading) {
            return recordQuery?.data?.pages?.map((page, index) => (
                <Fragment key={page.items[0]?.id || index}>
                    {page.items.map((item) => (
                        <Record key={item.id} record={item} />
                    ))}
                </Fragment>
            ))
        }

        return null
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className="flex flex-col w-full space-y-2">
            { renderRecords() }
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="border border-gray-300 text-gray-800 rounded-xl px-4 py-2 hover:border-gray-500"
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