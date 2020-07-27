import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Splash from "./Splash";
import PageControl from "./PageControl";
import styled from "styled-components";

function App() {

  const Wrapper = styled.div`
    top: 100px;
    min-height: calc(100vh - 200px);
  `;

  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <PageControl />
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

export default App;
