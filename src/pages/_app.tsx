import '../../public/globals.css'
import { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Layout } from "~/components/Layout";

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<TProps, TInitialProps> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return getLayout(
        <Component {...pageProps} />
    ) 
}) as AppType;

export default App;