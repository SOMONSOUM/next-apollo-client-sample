import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          /> */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          />
          <link href="https://fonts.googleapis.com/css?family=Hanuman&amp;display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Moul&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Siemreap&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;