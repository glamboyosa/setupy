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
  Image,
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
import { useGetPostsQuery, useLogoutMutation } from '../../generated/graphql';
const Posts = () => {
  console.log(process.env.NODE_ENV === 'development');
  const [spellCheckk, setSpellCheck] = useState(false);
  const [logoutMutation, { loading }] = useLogoutMutation();
  const { data } = useGetPostsQuery();
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
            <NavButton onClick={() => router.push('/uploads')}>
              Upload
            </NavButton>
          </NavItems>
          <Label htmlFor='checkbox' spellCheck={spellCheckk} />
        </Nav>
        <CenterPosts>
          <PrimaryHeading>See the hottest posts 🔥</PrimaryHeading>
        </CenterPosts>
        {data && !loading ? (
          data!.GetPosts!.posts!.map((el) => (
            <CenterPosts>
              <Post>
                <EitherSideofPost>
                  <UpButton spellCheck={false} />
                  <div style={{ fontSize: '1.5rem' }}>{el.votes}</div>
                  <DownButton spellCheck={false} />
                  <ShareButton />
                </EitherSideofPost>
                <EitherSideofPost>
                  <MarginTopImage>
                    <Image src={el.photoPath} width='auto' height='auto' />
                  </MarginTopImage>
                  <SecondaryHeading>{el.description}</SecondaryHeading>
                  <Link href={`/posts/${el.username}`}>
                    <LinkToPages>post by glamboyosa</LinkToPages>
                  </Link>
                </EitherSideofPost>
              </Post>
            </CenterPosts>
          ))
        ) : (
          <svg
            width='55'
            height='80'
            viewBox='0 0 55 80'
            xmlns='http://www.w3.org/2000/svg'
            fill='#034245'
          >
            <g transform='matrix(1 0 0 -1 0 80)'>
              <rect width='10' height='20' rx='3'>
                <animate
                  attributeName='height'
                  begin='0s'
                  dur='4.3s'
                  values='20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20'
                  calcMode='linear'
                  repeatCount='indefinite'
                />
              </rect>
              <rect x='15' width='10' height='80' rx='3'>
                <animate
                  attributeName='height'
                  begin='0s'
                  dur='2s'
                  values='80;55;33;5;75;23;73;33;12;14;60;80'
                  calcMode='linear'
                  repeatCount='indefinite'
                />
              </rect>
              <rect x='30' width='10' height='50' rx='3'>
                <animate
                  attributeName='height'
                  begin='0s'
                  dur='1.4s'
                  values='50;34;78;23;56;23;34;76;80;54;21;50'
                  calcMode='linear'
                  repeatCount='indefinite'
                />
              </rect>
              <rect x='45' width='10' height='30' rx='3'>
                <animate
                  attributeName='height'
                  begin='0s'
                  dur='2s'
                  values='30;45;13;80;56;72;45;76;34;23;67;30'
                  calcMode='linear'
                  repeatCount='indefinite'
                />
              </rect>
              <rect x='15' width='10' height='80' rx='3'>
                <animate
                  attributeName='height'
                  begin='0s'
                  dur='2s'
                  values='80;55;33;5;75;23;73;33;12;14;60;80'
                  calcMode='linear'
                  repeatCount='indefinite'
                />
              </rect>
            </g>
          </svg>
        )}
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(Posts);
