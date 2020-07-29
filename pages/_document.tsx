import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { RECAPTCHA_SITE_KEY } from "./recaptchaEnvVars";

class MyDocument extends Document {
  render() {
    const recaptchaScriptSource = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;

    return (
      <Html>
        <Head>
          <script src={recaptchaScriptSource}></script>
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
