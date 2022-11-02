import '../../public/globals.css'
import { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Layout } from "~/components/Layout";
import { SessionProvider } from "next-auth/react";
import { trpc } from '~/utils/trpc';

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<TProps, TInitialProps> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = (({ Component, pageProps: { session, ...pageProps} }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            { getLayout(<Component {...pageProps} />) }
        </SessionProvider>
    ) 
}) as AppType;

export default trpc.withTRPC(App);