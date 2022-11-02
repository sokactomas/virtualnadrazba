import { Record } from "~/components/home/Record";
import { NextPageWithLayout } from "~/pages/_app";
import { trpc } from "~/utils/trpc";

const Homepage: NextPageWithLayout = () => {
    const { data, isLoading } = trpc.record.list.useQuery({});
    
    const renderRecords = () => {
        if (!isLoading) {
            return data?.map((record) => {
                return <Record key={record.id} record={record} />
            })
        }

        return null
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className="flex flex-col w-full space-y-2">
            { renderRecords() }
            </div>
        </div>
    )
}

export default Homepage;