import {  ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import moment, { Duration } from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type RecordProps = {
    record: any
}

export const Record: FC<RecordProps> = ({ record }) => {
    const [duration, setDuration] = useState<Duration|null>(null);

    useEffect(() => {
        let interval: any = null;
        interval = setInterval(() => {
            const now = moment();
            const time = moment(record.validUntil);

            if (now.isBefore(time)) {
                setDuration(moment.duration(time.diff(now)));
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    const renderDuration = () => {
        if (duration) {
            return (
                <span>
                    {duration.days()} Dní {duration.hours()}:{duration.minutes()}:{duration.seconds()}
                </span>
            )
        }
        return (
            <div>
                - Dní --:--:--
            </div>
        );
    }

    return (
        <div className='flex w-full bg-white p-4 rounded-xl'>
            <div className="bg-gray-200 rounded-xl flex-[192px] shrink-0 grow-0 h-[146px]" />
            <div className="px-2 w-full flex flex-col items-start justify-between">
                <div className="space-y-1">
                    <div className='text-lg font-semibold'>
                        {record?.title}
                    </div>
                    <div className="text-md text-gray-600 flex items-center space-x-2">
                        <span>Id: {record.id}</span>
                        <span className="bg-gray-600 w-1 h-1 rounded-full block" />
                        <span>pridané dňa{moment(record.createdAt).format('DD.MM.YYYY')}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">Vyvolavacia cena:</span> 
                        <div className="flex items-center space-x-2">
                            <TagIcon className="w-6 h-6 text-red-600" />
                            <span className='text-2xl font-bold'>
                                {record.price.toLocaleString()} €
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 w-full justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <ClockIcon className={`w-6 h-6 ${duration && (duration?.days() || 0) <= 10 ? 'animate-pulse': ''}`} />
                            <span>
                                {renderDuration()}
                            </span>
                        </div>
                    </div>
                    <Link href={'/detail/1'} className='flex items-center space-x-2 hover:underline hover:text-red-600'>
                        <EyeIcon className="w-5 h-5" />
                        <span>zobraziť detail</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}