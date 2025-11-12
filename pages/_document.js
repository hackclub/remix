import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.5/keen-slider.min.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.css"/>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@marqueefy/marqueefy@1.0.3/dist/css/marqueefy.min.css"
          integrity="sha384-wADgvhAqbORDLWCl6LHRmwaldDxcsCZJ9EfC4tyLmlqRSrxK8SQSmUprPJYdtCZb"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://unpkg.com/rc-dialog@9.6.0/assets/index.css"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

