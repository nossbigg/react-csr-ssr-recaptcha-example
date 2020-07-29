import React from "react";
import { GetServerSideProps } from "next";

type IndexPageType = IndexPageServerSideProps;
type IndexPageServerSideProps = { unprotectedInfo: Object };

const IndexPage: React.FC<IndexPageType> = (props) => {
  const { unprotectedInfo } = props;

  return (
    <div>
      Hello World!
      <br />
      Unprotected Info: {JSON.stringify(unprotectedInfo)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageServerSideProps> = async () => {
  const resp = await fetch("http://localhost:3005/unprotected");
  const respJson = await resp.json();

  return { props: { unprotectedInfo: respJson } };
};

export default IndexPage;
