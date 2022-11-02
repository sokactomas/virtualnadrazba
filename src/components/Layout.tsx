import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Hackathon 2022 | Dražba</title>
            </Head>
            <div className='flex flex-col min-h-[100vh]'>
                <Header />
                <main className="w-full flex-1 flex justify-center sm:p-2 md:p-3 lg:p-5">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}