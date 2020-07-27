import React from "react";
import { connect } from "react-redux";
import Splash from "./Splash";
import Search from "./Search";
import Applications from "./Applications";
import Dashboard from "./Dashboard";
import ManageApplication from "./ManageApplication";
import ApplicationDetail from "./ApplicationDetail";
import styled from "styled-components";
import { withFirestore } from "react-redux-firebase";

const PageWrapper = styled.div`
  top: 100px;
`;

class PageControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selected: null
    }
  }

  handleEditingApplication = () => {

    let action = {
      type: "TOGGLE_MANAGE"
    }

    this.props.dispatch(action);
  }

  handleSelectingApplication = (id) => {
    const { dispatch } = this.props;
    this.props.firestore.get({ collection: "applications", doc: id })
      .then((application) => {
        const firestoreApplication = {
          title: application.get("title"),
          company: application.get("company"),
          location: application.get("location"),
          appliedDate: application.get("appliedDate"),
          stage: application.get("stage"),
          id: application.id
        };

        let action = {
          type: "SELECT_APPLICATION",
          application: firestoreApplication
        }
        dispatch(action)
      });
  }

  handleClickingEdit = () => {
    let action = {
      type: "TOGGLE_MANAGE"
    }

    this.props.dispatch(action);
  }

  handleDeletingApplication() {

  }

  render() {
    let currentPage;


    if (this.props.isEditing) {
      console.log(this.state.selected);
      currentPage = <ManageApplication
        onEditApplication={this.handleEditingApplication}
        application={this.props.selectedApplication}
      />
    } else if (this.props.selectedApplication !== null) {
      currentPage = <ApplicationDetail
        application={this.props.selectedApplication}
        onClickingEdit={this.handleClickingEdit}
        onClickingDelete={this.handleDeletingApplication} />
    } else {
      switch (window.location.pathname) {
        case "/search":
          currentPage = <Search />
          break;
        case "/applications":
          currentPage = <Applications
            onSelectApplication={this.handleSelectingApplication}
            onClickEdit={this.handleClickingEdit}
          />
          break;
        default:
          currentPage = <Splash />
      }
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
    selectedApplication: state.selectedApplication,
    viewingApplications: state.viewingApplications
  }
};

export default connect(mapStateToProps)(withFirestore(PageControl));
