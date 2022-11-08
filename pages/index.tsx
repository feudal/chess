import Head from "next/head";

import { Board } from "../components";
import { Layout } from "../layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online chess</title>
      </Head>

      <Layout>
        <Board />
      </Layout>
    </>
  );
}
