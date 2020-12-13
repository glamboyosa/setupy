import styled from 'styled-components';
import { IoMdShare } from 'react-icons/io';
import Image from 'next/image';
export const Page = styled.div`
  background-color: var(--white-shade);
`;
export const UpButton = styled.div`
  margin-top: 1rem;
  width: 0;
  height: 0;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-bottom: 1.5rem solid
    ${(props) => (props.upvote ? '#360ccc' : '#fafafa')};
`;
export const DownButton = styled.div`
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid ${(props) => (props.downvote ? '#f00' : '#fafafa')};
`;
export const CenterPosts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    margin-bottom: 2rem;
  }
`;
export const Post = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  border-radius: 0.8rem;
  background-color: var(--white);
  box-shadow: 0.4rem 1rem 1rem var(--black);
`;
export const ShareButton = styled(IoMdShare)`
  font-size: 1.5rem;
`;
export const EitherSideofPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin-bottom: 1.5rem;
  }
`;
export const DemoImage = styled(Image)`
  border-radius: 0.8rem;
  margin-top: 1rem;
`;
