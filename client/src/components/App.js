import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SignIn from "./SignIn";
import PageControl from "./PageControl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

function App() {

  const Wrapper = styled.div`
    top: 100px;
    min-height: calc(100vh - 200px);
  `;

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Wrapper>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/">
              <PageControl />
            </Route>
          </Switch>
        </Wrapper>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
