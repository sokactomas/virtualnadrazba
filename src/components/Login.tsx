import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { BaseSyntheticEvent, FC, Fragment, useState } from "react";

type LoginProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export const Login: FC<LoginProps> = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleOnSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        signIn('credentials', {
            email,
            password: password,
            callbackUrl: '/account'
        })
    }

    const signInAs = ({ email, password }: { email: string, password: string }) => {
        signIn('credentials', {
            email,
            password: password,
            callbackUrl: '/account'
        })
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full space-y-2 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <form className="space-y-2" onSubmit={handleOnSubmit}>
                                    <div className="flex items-center justify-center">
                                        <span className="text-xl font-bold">Prihlásenie</span>
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                                            E-mail
                                        </label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="starting-price" placeholder='johndoe@drazba.eu' className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 field-outline-ring' />
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                                            Heslo
                                        </label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="starting-price" className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 field-outline-ring' />
                                    </div>
                                    <button
                                        type="submit"
                                        className="block w-full button-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Prihlásiť
                                    </button>
                                </form>

                                <div>
                                    <div className="flex items-center justify-center py-2">
                                        <span className="uppercase font-semibold text-sm">Prihlásiť ako</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="hover:bg-sky-100 flex items-center justify-center space-x-2 bg-sky-50 rounded-md text-sky-800 border border-sky-300 py-1 px-4 flex-1" onClick={(e) => {
                                            e.preventDefault();
                                            signInAs({
                                                email: 'ponyslaystation@gmail.com',
                                                password: 'superheslo',
                                            })
                                        }}>
                                            <UserIcon className="w-4 h-4" />
                                            <span>ponyslaystation</span>
                                        </button>
                                        <button className="hover:bg-sky-100 flex items-center  justify-center space-x-2 bg-sky-50 rounded-md text-sky-800 border border-sky-300 py-1 px-4 flex-1" onClick={(e) => {
                                            e.preventDefault();
                                            signInAs({
                                                email: 'johndoe@gmail.com',
                                                password: 'superheslo',
                                            })
                                        }}>
                                            <UserIcon className="w-4 h-4" />
                                            <span>johndoe</span>
                                        </button>
                                        <button className="hover:bg-sky-100 flex items-center  justify-center space-x-2 bg-sky-50 rounded-md text-sky-800 border border-sky-300 py-1 px-4 flex-1" onClick={(e) => {
                                            e.preventDefault();
                                            signInAs({
                                                email: 'groot@gmail.com',
                                                password: 'superheslo',
                                            })
                                        }}>
                                            <UserIcon className="w-4 h-4" />
                                            <span>Groot</span>
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}