import React from "react";
import { GetServerSideProps } from "next";
import { useRecaptchaHook } from "../src/common/useRecaptchaHook";
import { useGetProtectedInfoHook } from "../src/common/useGetProtectedInfoHook";
import { RECAPTCHA_SITE_KEY } from "./recaptchaEnvVars";

type IndexPageType = IndexPageServerSideProps;
type IndexPageServerSideProps = { unprotectedInfo: Object };

const IndexPage: React.FC<IndexPageType> = (props) => {
  const { unprotectedInfo } = props;

  const token = useRecaptchaHook(RECAPTCHA_SITE_KEY);
  const protectedInfo = useGetProtectedInfoHook(token);

  return (
    <div>
      Hello World!
      <br />
      Unprotected Info: {JSON.stringify(unprotectedInfo)}
      <br />
      Protected Info: {JSON.stringify(protectedInfo)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageServerSideProps> = async () => {
  let respJson: Object = {};
  try {
    const resp = await fetch("http://localhost:3005/getItem");
    respJson = await resp.json();
  } catch (e) {}

  return { props: { unprotectedInfo: respJson } };
};

export default IndexPage;
