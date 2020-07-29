import React from "react";
import { Container, Jumbotron, Button, InputGroup, InputGroupAddon, Label, Input } from "reactstrap";
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

  async function getSearchResults() {

    loadContent(<Spinner />);

    axios.get(`http://localhost:5000/search`)
      .then((response) => {
        loadContent(<JobList jobList={response.data} />);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  return (
    <React.Fragment>
      <SearchContainer>
        <HeaderTron>
          <h2>Search for jobs</h2>
        </HeaderTron>
        <SearchTron>
          <InputGroup>
            <SearchInputJob type="text" name="searchJob" placeholder="Software Engineer..." />
            <SearchInputLocation type="text" name="searchLocation" placeholder="Location" />
            <InputGroupAddon>
              <SearchButton color="warning" onClick={() => getSearchResults()}>Search</SearchButton>
            </InputGroupAddon>
          </InputGroup>
        </SearchTron>

        <SearchResults>
          {searchContent}
        </SearchResults>
      </SearchContainer>
    </React.Fragment >
  );
}

export default Search;