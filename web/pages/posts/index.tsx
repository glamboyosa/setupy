import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { SecondaryHeading } from '../../components/header.style';
import { LinkToPages } from '../../components/links.style';
import {
  CenterPosts,
  DemoImage,
  DownButton,
  EitherSideofPost,
  Post,
  ShareButton,
  UpButton,
  Page,
} from '../../components/posts.style';
const Posts = () => {
  const description = [
    'A super big Mac setup with 55" monitor!',
    "Who says Window's isn't cool",
  ];
  return (
    <>
      <Head>
        <title>Setupy - Posts🔥</title>
      </Head>
      <NextSeo
        title='Setupy - Posts🔥'
        openGraph={{
          url: window.location.href,
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
        {description.map((el) => (
          <CenterPosts>
            <EitherSideofPost>
              <UpButton />
              <DownButton />
              <ShareButton />
            </EitherSideofPost>
            <EitherSideofPost>
              <Post>
                <DemoImage src='/test.jpg_medium' width='70%' />
                <SecondaryHeading>{el}</SecondaryHeading>
                <Link href={`/posts/${el}`}>
                  <LinkToPages>post by glamboyosa</LinkToPages>
                </Link>
              </Post>
            </EitherSideofPost>
          </CenterPosts>
        ))}
      </Page>
    </>
  );
};
export default Posts;
