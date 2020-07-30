import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Jumbotron, Button, InputGroup, InputGroupAddon, Label, Input } from "reactstrap";
import styled from "styled-components";
import { useState } from "react";
import { Spinner } from "reactstrap";
import JobList from "./JobList";

const axios = require("axios");

const SearchContainer = styled(Container)`
  padding-top: 100px;
`;

const HeaderTron = styled(Jumbotron)`
  text-align: center;
  background-color: #CED9E0;
`
const SearchTron = styled(Jumbotron)`
  box-shadow: 1px 2px 2px black;
`;

const SearchButton = styled(Button)`
  margin-left: 5px;
  box-shadow: 1px 1px 1px black;
`;

const SearchInputJob = styled(Input)`
  box-shadow: 1px 1px 1px black;
  width: 70%
`;

const SearchInputLocation = styled(Input)`
  box-shadow: 1px 1px 1px black;
  width: 30%;
`;

function Search() {

  const SearchResults = styled.div`
    text-align: center;
  `;

  const [searchContent, loadContent] = useState(null);
  const [searchError, setSearchError] = useState(false);

  async function getSearchResults() {

    const jobQuery = document.getElementById("searchJob").value;
    const locationQuery = document.getElementById("searchLocation").value.replace(",", "%2C");

    if (jobQuery !== "" && locationQuery !== "") {
      loadContent(<Spinner />);

      axios.get(`http://localhost:5000/search/job/${jobQuery}/location/${locationQuery}`)
        .then((response) => {
          loadContent(<JobList jobList={response.data} />);
        })
        .catch((error) => {
          console.log(error.message);
        })
    } else {
      setSearchError(!searchError);
    }
  }

  return (
    <React.Fragment>
      <SearchContainer>
        <HeaderTron>
          <h1>Search for jobs</h1>
        </HeaderTron>
        <SearchTron>
          <InputGroup>
            <SearchInputJob type="text" id="searchJob" placeholder="Job title" />
            <SearchInputLocation type="text" id="searchLocation" placeholder="City and state, or zip code." />
            <InputGroupAddon>
              <SearchButton color="warning" onClick={() => getSearchResults()}>Search</SearchButton>
            </InputGroupAddon>
          </InputGroup>
        </SearchTron>

        <SearchResults>
          {searchContent}
        </SearchResults>
      </SearchContainer>

      <Modal isOpen={searchError} toggle={() => setSearchError((!searchError))}>
        <ModalHeader toggle={() => setSearchError(!searchError)}>Oops!</ModalHeader>
        <ModalBody>
          You must enter a job title and location to search.
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setSearchError(!searchError)}>Close</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment >
  );
}

export default Search;