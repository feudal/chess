import Head from "next/head";

import { Board, BoardInfo, Chat, UserList } from "../components";
import { Layout } from "../layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online chess</title>
      </Head>

      <Layout
        sideBar={
          <>
            <BoardInfo />
            <UserList />
            <Chat />
          </>
        }
      >
        <Board />
      </Layout>
    </>
  );
}
