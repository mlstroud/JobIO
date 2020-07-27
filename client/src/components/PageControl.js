import React from "react";
import { connect } from "react-redux";
import Splash from "./Splash";
import Search from "./Search";
import Applications from "./Applications";
import styled from "styled-components";

const PageWrapper = styled.div`
  top: 100px;
`;

class PageControl extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    let currentPage = <Splash />

    if (this.props.isSearching) {
      currentPage = <Search />
    } else if (this.props.viewingApplications) {
      currentPage = <Applications />
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