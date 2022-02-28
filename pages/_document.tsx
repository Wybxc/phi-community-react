import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="PhiCommunity-React" />
          <meta
            name="apple-mobile-web-app-title"
            content="PhiCommunity-React"
          />
          <meta name="msapplication-tooltip" content="PhiCommunity-React" />
          <meta name="theme-color" content="#ada5dc" />
          <meta name="msapplication-navbutton-color" content="#ada5dc" />
          <meta name="msapplication-starturl" content="/tap-to-start" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
