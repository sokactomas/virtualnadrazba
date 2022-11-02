import {  ClockIcon, EyeIcon, FireIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import moment, { Duration } from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type RecordProps = {
    record: any
}

export const Record: FC<RecordProps> = ({ record }) => {
    const [duration, setDuration] = useState<Duration|null>(null);
    const { data: session } = useSession();

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
                    {duration.days()} dní {duration.hours()}:{duration.minutes()}:{duration.seconds()}
                </span>
            )
        }
        return (
            <div>
                - Dní --:--:--
            </div>
        );
    }

    const renderCreatedAt = () => {
        const createdAt = moment(record.createdAt);
        const duration = moment.duration(moment().diff(createdAt))
        if (duration.hours() <= 1) {
            return (
                <span className="flex items-center space-x-1">
                    <span>pridané pred</span>
                    <span className="bg-red-600 py-1 px-2 text-white flex items-center space-x-1">
                        <FireIcon className="h-5 w-5 animate-pulse" />
                        <span className="uppercase text-sm font-semibold">
                            menej ako hodinou
                        </span>
                    </span>
                </span>
            )
        }
        return (
            <span>pridané dňa {createdAt.format('DD.MM.YYYY')}</span>
        )
    }

    const renderType = () => {
        if (record.type === 1) {
            return 'tichá dražba'
        }

        return 'rýchla dražba';
    }

    const renderCancel = () => {
        if (session?.user?.id === record?.userId) {
            return (
                <button className='flex items-center space-x-2 button-primary'>
                    <XMarkIcon className="w-5 h-5" />
                    <span>ukončiť dražbu</span>
                </button>
            )
        }

        return null;
    }

    return (
        <div className='flex flex-col w-full bg-white border-2 border-gray-200'>
            <div className="flex p-4">
                <div className="bg-gray-200 flex-[192px] shrink-0 grow-0 h-[146px]" />
                <div className="px-2 w-full flex flex-col items-start justify-between">
                    <div className="space-y-1">
                        <div className='text-lg font-semibold'>
                            {record?.title}
                        </div>
                        <div className="text-md text-gray-600 flex items-center space-x-2">
                            <span>Id: {record.id}</span>
                            <span className="bg-gray-600 w-1 h-1 rounded-full block" />
                            { renderCreatedAt() }
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
                                <div className="font-semibold">
                                    { renderType() }
                                </div>
                                <ClockIcon className={`w-6 h-6 ${duration && (duration?.days() || 0) <= 10 ? 'animate-pulse': ''}`} />
                                <span>
                                    {renderDuration()}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link href={`/detail/${record?.id}`} className='flex items-center space-x-2 hover:underline hover:text-red-600'>
                                <EyeIcon className="w-5 h-5" />
                                <span>zobraziť detail</span>
                            </Link>
                            { renderCancel() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}