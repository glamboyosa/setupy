import Head from 'next/head';
import { useHelloQuery } from '../generated/graphql';
import withApollo from '../libs/withApollo';
function Home() {
  const { data } = useHelloQuery();
  return (
    <>
      <Head>
        <title>Setupy - Home</title>
      </Head>
      <h1>{data?.hello}</h1>
    </>
  );
}
export default withApollo({ ssr: true })(Home);
