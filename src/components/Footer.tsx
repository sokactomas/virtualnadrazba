import { FC } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export const Footer: FC = () => {
    return (
        <footer className="bg-white flex flex-col items-center py-5 space-y-2 border-t border-gray-200">
            <div className='flex items-center space-x-2'>
                <span>Vytvorené zo</span>
                <HeartIcon className='w-6 h-6 text-red-600' />
                <span>Hackathon 2022</span>
            </div>            
        </footer>
    )
}