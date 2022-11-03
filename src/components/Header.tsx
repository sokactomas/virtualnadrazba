import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Login } from "./Login";

export const Header:FC = () => {
    let [isOpen, setIsOpen] = useState<boolean>(false)

    const { data: session } = useSession();

    const renderAuth = () => {
        if (session) {
            return (
                <div className='flex items-center space-x-2'>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full space-x-2 justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <UserCircleIcon className="w-5 h-5" />
                                <span>{ session?.user?.name }</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={'/account'}
                                                className={`${active ? 'text-red-700' : 'text-gray-900'
                                                    } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <span>
                                                    Moje konto
                                                </span>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => signOut({
                                                    callbackUrl: '/'
                                                })}
                                                className={`${active ? 'text-red-700' : 'text-gray-900'
                                                    } group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <span>
                                                    Odhlásiť sa
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            )
        }

        return (
            <>
                <button type='button' onClick={() => setIsOpen(true)} className='underline hover:text-red-600'>
                    prihlásiť sa
                </button>
                <Login isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
        )
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-white z-10 h-[56px] shadow-sm flex items-center justify-center">
            <div className="w-full lg:w-4/5 px-5 lg:px-0 h-full flex items-center justify-between">
                <Link href={"/"} className="text-3xl font-bold">
                    Virtualnadrazba.eu
                </Link>
                <div>
                    { renderAuth() }
                </div>
            </div>
        </header>
    )
}