import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  PrimaryHeading,
  SecondaryHeading,
} from '../../components/header.style';
import { LinkToPages } from '../../components/links.style';
import withApollo from '../../libs/withApollo';
import {
  CenterPosts,
  DemoImage,
  DownButton,
  EitherSideofPost,
  Post,
  ShareButton,
  UpButton,
  Page,
  MarginTopImage,
} from '../../components/posts.style';
import { Input, Label, Nav, NavItems } from '../../components/nav.style';
import { NavButton } from '../../components/button.style';
import { Context } from '../../libs/userProvider';
import { useLogoutMutation } from '../../generated/graphql';
const Posts = () => {
  console.log(process.env.NODE_ENV === 'development');
  const [spellCheckk, setSpellCheck] = useState(false);
  const [logoutMutation, { loading }] = useLogoutMutation();
  const router = useRouter();
  const { user, setUserHandler } = useContext(Context);
  console.log(user);
  const description = [
    'A super big Mac setup with 55" monitor!',
    "Who says Window's isn't cool",
  ];
  const logoutHandler = () => {
    logoutMutation();
    setUserHandler(null);
  };
  return (
    <>
      <Head>
        <title>Setupy - Posts🔥</title>
      </Head>
      <NextSeo
        title='Setupy - Posts🔥'
        openGraph={{
          url:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/posts'
              : 'https://setupy.vercel.app/posts',
          title: 'Setupy - Posts🔥',
          images: [
            {
              url:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=752&q=80',
            },
          ],
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      <Page>
        <Nav spellCheck={spellCheckk}>
          <Link href='/'>
            <SecondaryHeading style={{ whiteSpace: 'nowrap' }}>
              Setupy🔥
            </SecondaryHeading>
          </Link>
          <Input
            checked={spellCheckk}
            onChange={() => setSpellCheck(!spellCheckk)}
            id='checkbox'
          />
          <NavItems spellCheck={spellCheckk}>
            {user && (
              <img src='/user-image-with-black-background.svg' width='7%' />
            )}
            {!user ? (
              <NavButton onClick={() => router.push('/login')}>Login</NavButton>
            ) : (
              <NavButton disabled={loading} onClick={logoutHandler}>
                Logout
              </NavButton>
            )}
            <NavButton>Upload</NavButton>
          </NavItems>
          <Label htmlFor='checkbox' spellCheck={spellCheckk} />
        </Nav>
        <CenterPosts>
          <PrimaryHeading>See the hottest posts 🔥</PrimaryHeading>
        </CenterPosts>
        {description.map((el) => (
          <CenterPosts>
            <Post>
              <EitherSideofPost>
                <UpButton spellCheck={false} />
                <DownButton spellCheck={false} />
                <ShareButton />
              </EitherSideofPost>
              <EitherSideofPost>
                <MarginTopImage>
                  <DemoImage
                    src='/test.jpg_medium'
                    width='auto'
                    height='auto'
                  />
                </MarginTopImage>
                <SecondaryHeading>{el}</SecondaryHeading>
                <Link href={`/posts/${el}`}>
                  <LinkToPages>post by glamboyosa</LinkToPages>
                </Link>
              </EitherSideofPost>
            </Post>
          </CenterPosts>
        ))}
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(Posts);
