import styled from 'styled-components';
import { IoMdShare } from 'react-icons/io';
export const Page = styled.div`
  background-color: var(--white-shade);
  position: relative;
`;
export const UpButton = styled.div`
  margin-top: 1rem;
  width: 0;
  height: 0;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-bottom: 1.5rem solid
    ${(props) => (props.spellCheck ? '#360ccc' : '#3a3b3c')};
`;
export const DownButton = styled.div`
  width: 0;
  height: 0;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-top: 1.5rem solid ${(props) => (props.spellCheck ? '#f00' : '#3a3b3c')};
`;
export const CenterPosts = styled.div`
  display: flex;
  padding-top: 3rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    margin-bottom: 2rem;
  }
`;
export const Post = styled.div`
  display: flex;
  border-radius: 0.8rem;
  width: auto;
  max-width: 50rem;
  background-color: var(--white);
  box-shadow: 0.4rem 1rem 1rem var(--black);
`;
export const ShareButton = styled(IoMdShare)`
  font-size: 5rem;
`;
export const EitherSideofPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 3rem;
  align-items: center;
  &:first-of-type {
    margin-left: 2rem;
  }
  & > * {
    margin-bottom: 1.5rem;
  }
`;
export const MarginTopImage = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const Image = styled.img`
  border-radius: 0.8rem;
  width: 100%;
  height: auto;
`;
