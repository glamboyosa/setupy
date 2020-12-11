import { CenterInputs, Input } from '../components/input.style';
import { useLoginMutation } from '../generated/graphql';
import Head from 'next/head';
import React, { useState } from 'react';
import {
  ButtonsParent,
  PrimaryButton,
  SecondaryButton,
} from '../components/button.style';
import { SecondaryHeading } from '../components/header.style';
import { LinkToPages } from '../components/links.style';
import withApollo from '../libs/withApollo';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const [loginMutation, { data, loading, error }] = useLoginMutation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginMutation({ variables: { email: email!, password: password! } });
    console.log(email, password);
    console.log(loading, data, error);
    console.log(loginMutation);
  };
  const notify = (error: string) =>
    toast.error(error, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  if (error) {
    notify(error.message);
    console.log(error.message);
  }
  if (data) {
    console.log(data.Login);
  }
  return (
    <>
      <Head>
        <title>Setupy - Login</title>
      </Head>

      <CenterInputs>
        <SecondaryHeading>
          Login to see what your pals are up to
        </SecondaryHeading>
        <Input type='email' onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' onChange={(e) => setPassword(e.target.value)} />
        <ButtonsParent>
          <PrimaryButton disabled={loading} onClick={submitHandler}>
            Let's Go
          </PrimaryButton>
          <SecondaryButton disabled={loading}>Let's Go</SecondaryButton>
        </ButtonsParent>
        <Link href='/register'>
          <LinkToPages>Don't have an account? Sign up.</LinkToPages>
        </Link>
        <Link href='/forgot-password'>
          <LinkToPages>Forgot password.</LinkToPages>
        </Link>
      </CenterInputs>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default withApollo({ ssr: false })(Login);
