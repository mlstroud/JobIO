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
            <Input type="text" placeholder="Software Engineer..." />
            <InputGroupAddon>
              <Button color="warning" onClick={() => getSearchResults()}>Search</Button>
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