import React from "react";
import { connect } from "react-redux";
import Splash from "./Splash";
import Search from "./Search";
import Applications from "./Applications";
import Dashboard from "./Dashboard";
import styled from "styled-components";

const PageWrapper = styled.div`
  top: 100px;
`;

class PageControl extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let currentPage;

    switch (window.location.pathname) {
      case "/search":
        currentPage = <Search />
        break;
      case "/applications":
        currentPage = <Applications />
        break;
      default:
        currentPage = <Splash />
    }

    return (
      <React.Fragment>
        <PageWrapper>
          {currentPage}
        </PageWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.isEditing,
    isSearching: state.isSearching,
    viewingApplications: state.viewingApplications
  }
};

export default connect(mapStateToProps)(PageControl);