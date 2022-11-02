import { EyeIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type RecordProps = {
    record: any
}

export const Record: FC<RecordProps> = ({ record }) => {
    const renderImage = () => {
        if (record?.image) {
            return <Image src={record?.image?.previewUrls?.thumbnail || ''} alt={record?.title} layout='fill' objectFit='cover' />
        }

        return null;
    }
    return (
        <div className='flex flex-col w-full bg-white border-2 border-gray-200'>
            <div className="flex p-4">
                <div className="bg-gray-200 flex-[192px] shrink-0 grow-0 h-[146px] relative">
                    { renderImage() }
                </div>
                <div className="px-2 w-full flex flex-col items-start justify-between">
                    <div className="space-y-2">
                        <div className='text-md font-semibold'>
                            { record?.title }
                        </div>
                        <div className="text-md text-gray-600 flex items-center space-x-2">
                            <span>Id: {record?.id}</span>
                            <span className="bg-gray-600 w-1 h-1 rounded-full block" />
                            <span>pridané dňa {moment(record?.clientCreatedAt).format("DD.MM.YYYY")}</span>
                        </div>
                        <div className="font-bold text-xl flex items-center space-x-2">
                            <TagIcon className="w-5 h-5 text-red-600" />
                            <span>{ record?.priceCurrent.toLocaleString() } €</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 w-full justify-end">
                        <Link href={`/create/${record?.id}`} className='flex text-gray-700 items-center space-x-2 hover:text-black border py-1.5 px-3 rounded-xl hover:border-black'>
                            <ScaleIcon className="w-5 h-5" />
                            <span>pridať do dražby</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}