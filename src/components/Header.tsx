import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export const Header:FC = () => {
    const { data: session } = useSession();

    const renderAuth = () => {
        if (session) {
            return (
                <div className='flex items-center space-x-2'>
                    <Link href={'/account'} className='text-gray-700 hover:underline hover:text-red-600'>
                        Moje konto
                    </Link>
                    <span>
                        Prihlasený ako <span className="font-semibold">{session?.user?.name}</span>
                    </span>
                    <button onClick={() => signOut()}>
                        <ArrowRightOnRectangleIcon className='w-6 h-6' />
                    </button>
                </div>
            )
        }

        return (
            <button onClick={() => signIn()} className='button-primary'>
                prihlásiť
            </button>
        )
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-white z-10 h-[56px] shadow-sm flex items-center justify-center">
            <div className="w-full lg:w-[1280px] px-5 h-full flex items-center justify-between">
                <Link href={"/"} className="text-3xl font-bold">
                    Drazba.eu
                </Link>
                <div>
                    { renderAuth() }
                </div>
            </div>
        </header>
    )
}