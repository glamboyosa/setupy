import Head from 'next/head';
import {
  Header,
  PrimaryHeading,
  SecondaryHeading,
} from '../components/header.style';
import {
  ButtonsParent,
  PrimaryButton,
  SecondaryButton,
} from '../components/button.style';
import { useRouter } from 'next/dist/client/router';

function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Setupy - Home</title>
      </Head>
      <Header>
        <PrimaryHeading>Setupy - Reddit but for dev setups 🔥</PrimaryHeading>
        <SecondaryHeading>
          See what your dev friends are pushing with.
        </SecondaryHeading>
        <ButtonsParent>
          <PrimaryButton onClick={() => router.push('/login')}>
            Let's Go
          </PrimaryButton>
          <SecondaryButton>Let's Go</SecondaryButton>
        </ButtonsParent>
      </Header>
    </>
  );
}
export default Home;
