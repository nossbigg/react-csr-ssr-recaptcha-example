import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://www.google.com/recaptcha/api.js?render=6LcxMLcZAAAAAOrxHHT0XcgKfjs_SkUj8kYPfXrh"></script>
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
