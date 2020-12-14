import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useState, useContext, useEffect } from 'react';
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
  UpButton,
  Page,
  MarginTopImage,
} from '../../components/posts.style';
import { Input, Label, Nav, NavItems } from '../../components/nav.style';
import { NavButton } from '../../components/button.style';
import { Context } from '../../libs/userProvider';
import {
  useGetPostsQuery,
  useLogoutMutation,
  useVotePostMutation,
} from '../../generated/graphql';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Posts = () => {
  const [spellCheckk, setSpellCheck] = useState(false);
  const [upvoteColor, setUpvoteColor] = useState(false);
  const [downvoteColor, setDownvoteColor] = useState(false);
  const [webShareError, setWebShareError] = useState<string | null>(null);
  const [logoutMutation, { loading }] = useLogoutMutation();
  const { data, refetch } = useGetPostsQuery();
  const [emptyPosts, setEmptyPosts] = useState(false);
  const router = useRouter();
  const { user, setUserHandler } = useContext(Context);
  const [
    postMutation,
    { data: voteData, loading: voteLoading },
  ] = useVotePostMutation();
  useEffect(() => {
    if (data!.GetPosts!.posts!.length < 1 && !loading) {
      setEmptyPosts(true);
    }
  }, [data]);
  useEffect(() => {
    if (voteData?.VotePost) {
      refetch();
    }
  }, [voteData]);
  const logoutHandler = () => {
    logoutMutation();
    setUserHandler(null);
  };
  const webShareHandler = async (id: number, username: string) => {
    console.log(id);
    try {
      await navigator.share({
        title: 'Setupy - Posts🔥',
        text: 'Check out this sweet setup',
        url: `https://setupy.vercel.app/posts/${username}/${id}`,
      });
    } catch (e) {
      setWebShareError("Oops. Sharing isn't supported in your browser");
    }
  };
  const votesHandler = (id: number, type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      setUpvoteColor(!upvoteColor);
      setDownvoteColor(false);
      console.log(id, type);
      postMutation({ variables: { id, type } });
    } else if (type === 'downvote') {
      setDownvoteColor(!downvoteColor);
      setUpvoteColor(false);
      console.log(id, type);
      postMutation({ variables: { id, type } });
    }
  };
  if (emptyPosts) {
    return (
      <Page>
        <CenterPosts>
          <SecondaryHeading>
            looks like no one's posted anything yet.
          </SecondaryHeading>
          <Link href='/uploads'>
            <LinkToPages>Be the first to upload</LinkToPages>
          </Link>
        </CenterPosts>
      </Page>
    );
  }

  const notify = (error: string) =>
    toast.error(error, {
      position: 'top-center',
      type: 'error',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  if (webShareError) {
    notify(webShareError);
    setWebShareError(null);
  }
  if (voteData?.VotePost === null) {
    notify('there was a problem voting please try again');
  }
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
      <ToastContainer
        position='top-center'
        style={{ fontSize: '2rem', fontFamily: 'inherit' }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
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
        <CenterPosts>
          {data && !loading ? (
            data!.GetPosts!.posts!.map((el) => (
              <Post key={el.id}>
                <EitherSideofPost>
                  <UpButton
                    aria-disabled={voteLoading}
                    onClick={() => votesHandler(el.id, 'upvote')}
                    spellCheck={upvoteColor}
                  />
                  <div style={{ fontSize: '1.5rem' }}>{el.votes}</div>
                  <DownButton
                    aria-disabled={voteLoading}
                    onClick={() => votesHandler(el.id, 'downvote')}
                    spellCheck={downvoteColor}
                  />
                  <NavButton
                    onClick={() => webShareHandler(el.id, el.username)}
                  >
                    Share Post
                  </NavButton>
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
            ))
          ) : (
            <CenterPosts>
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
            </CenterPosts>
          )}
        </CenterPosts>
      </Page>
    </>
  );
};

export default withApollo({ ssr: true })(Posts);
