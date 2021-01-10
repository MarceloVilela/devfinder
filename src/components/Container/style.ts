import styled from 'styled-components';

export const Main = styled.main`
&.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;

  /* header fixed */
  padding-top: 100px;

  min-height: 94.8vh;
}

@media screen and (max-width: 1024px) {
  &.container { 
    max-width: 100%;
    width: 100%;
    padding: 32px 16px;
    /* header fixed */
    padding-top: 100px; 
  }

  &.container-full-width { 
    padding-left: 0;
    padding-right: 0;
  }

  .break-row {
    /*border: 1px solid black;*/
    flex-wrap: wrap;
  }

  .break-row > * {
    flex-basis: 100%;
    margin-left: 0;
  }
}

& > article.loading-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

& > article.loading-wrapper img {
  width: 64px;
  height: 64px;
}`;