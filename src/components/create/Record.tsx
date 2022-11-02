import { BanknotesIcon, EyeIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";

export const Record: FC = () => {
    return (
        <div className='flex w-full hover:shadow-md p-4 rounded-xl'>
            <div className="bg-gray-200 rounded-xl flex-[192px] shrink-0 grow-0 h-[146px]" />
            <div className="px-2 w-full flex flex-col items-start justify-between">
                <div className="space-y-2">
                    <div className='text-lg font-semibold'>
                        Volkswagen Passat Variant 2.0 TDI BMT Comfortline DSG
                    </div>
                    <div className="text-md text-gray-600 flex items-center space-x-2">
                        <span>id: 30071928</span>
                        <span className="bg-gray-600 w-1 h-1 rounded-full block" />
                        <span>Combi</span>
                        <span className="bg-gray-600 w-1 h-1 rounded-full block" />
                        <span>pridané 02.11.2022 11:29:46</span>
                    </div>
                    <div className="font-bold text-xl flex items-center space-x-2">
                        <TagIcon className="w-5 h-5 text-red-600" />
                        <span>17 650 €</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 w-full justify-end">
                    <Link href={'/detail/1'} className='flex items-center space-x-2 hover:underline hover:text-red-600'>
                        <EyeIcon className="w-5 h-5" />
                        <span>zobraziť detail</span>
                    </Link>
                    <Link href={'/create/1'} className='flex items-center space-x-2 hover:underline hover:text-red-600'>
                        <BanknotesIcon className="w-5 h-5" />
                        <span>pridať do dražby</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}