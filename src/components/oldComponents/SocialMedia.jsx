import styled from 'styled-components';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialMedia = styled.section`
  display: flex;
  justify-content: center;
  padding: 1rem;
  a {
    margin: 0 1rem;
    svg {
      width: 25px;
      height: 25px;
      transition: transform 0.3s ease;
    }
    &:hover svg {
      transform: scale(1.1);
    }
  }
`;

const SocialMediaComponent = () => (
  <SocialMedia>
    <a href="https://twitter.com/musician"><FaTwitter /></a>
    <a href="https://facebook.com/musician"><FaFacebook /></a>
    <a href="https://instagram.com/musician"><FaInstagram /></a>
  </SocialMedia>
);

export default SocialMediaComponent;
