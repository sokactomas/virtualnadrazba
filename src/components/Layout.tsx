import Head from "next/head";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Hackathon 2022 | Dražba</title>
            </Head>
            <div className='flex flex-col min-h-[calc(100vh-56px)]'>
                <main className="w-full flex-1 flex justify-center sm:p-2 md:p-3 lg:p-5">
                    {children}
                </main>
            </div>
        </>
    )
}