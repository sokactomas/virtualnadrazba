import { TagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FC } from "react";

export const Record: FC = () => {
    return (
        <div className='flex'>
            <div className="bg-gray-200 rounded-xl flex-[192px] grow-0 h-[146px]" />
            <div className="px-2 flex flex-col items-start justify-between">
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
                <div className="py-4">
                    <Link href={"/create/1"} className='button-primary'>
                        pridať do dražby
                    </Link>
                </div>
            </div>
        </div>
    )
}