import { useSession } from "next-auth/react";
import { FC } from "react";
import { trpc } from "utils/trpc";
import { Record } from "../create/Record";
import { RecordPlaceholder } from "../RecordPlaceholder";

export const Offer: FC = () => {
    const { data: session } = useSession();
    const offerQuery = trpc.offer.list.useQuery({
        userId: session?.user?.platformId || ''
    },{
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    const renderRecords = () => {
        if (offerQuery.isLoading) {
            return [...Array.from(Array(10).keys())].map((i) => (
                <RecordPlaceholder key={i} />
            ))
        }

        return offerQuery?.data?.map((record: any) => (
            <Record key={record?.id} record={record} />
        ))
    }

    return (
        <>
            { renderRecords() }
        </>
    )
}