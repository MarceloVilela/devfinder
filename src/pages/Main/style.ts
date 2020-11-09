import styled from 'styled-components';
import { Container } from '../../components'

export const ContainerFullWidth = styled(Container)`
  @media screen and (max-width: 1024px) {
    & {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .container-edge-spacing {
      padding: 1rem;
    }
  }
`;

export const VideoList = styled.ul`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 600px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    & {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
