import '../../public/globals.css'
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Layout } from "components/Layout";
import { getSession, SessionProvider } from "next-auth/react";
import { trpc } from 'utils/trpc';

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<TProps, TInitialProps> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return (
        <SessionProvider session={pageProps['session']} refetchInterval={5 * 60}>
            { getLayout(<Component {...pageProps} />) }
        </SessionProvider>
    ) 
}) as any;

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
    return {
        session: await getSession(ctx)
    }
}

export default trpc.withTRPC(App);

