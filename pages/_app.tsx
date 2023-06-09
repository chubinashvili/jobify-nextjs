/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { SharedLayout } from '@/components'
import { wrapper } from '@/store'
import '@/styles/globals.css'

const MyApp: NextPage<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const router = useRouter()

  const routesWithoutSharedLayout = ['/landing', '/404', '/register']

  const shouldWrapWithSharedLayout = !routesWithoutSharedLayout.includes(router.pathname)

  return (
    <>
      <Head>
        <title>Jobify</title>
        <meta name='description' content='jobify' />
        <meta name='referrer' content='no-referrer-when-downgrade' />
        <meta property='og:site_name' content='jobify' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='jobify' />
        <meta property='og:description' content='jobify' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='jobify-icon.ico' />
      </Head>
      <Provider store={store}>
        {/* @ts-ignore */}
        <PersistGate persistor={store.__persistor}>
          {shouldWrapWithSharedLayout ? (
            <SharedLayout>
              <Component {...props.pageProps} />
            </SharedLayout>
          ) : (
            <Component {...props.pageProps} />
          )}
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
