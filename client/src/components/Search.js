import React from "react";
import { Container, Jumbotron, Button, InputGroup, InputGroupAddon, Label, Input } from "reactstrap";
import styled from "styled-components";
import { useState } from "react";
const axios = require("axios");

const SearchContainer = styled(Container)`
  padding-top: 200px;
`;

function Search() {

  const [stuff, doStuff] = useState(null);
  let searchResults = [];

  async function getSearchResults() {
    axios.get(`http://localhost:5000/search`)
      .then((response) => {
        console.log(response.data);
        doStuff(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  return (
    <React.Fragment>
      <SearchContainer>
        <h2>Search for jobs</h2>
        <Jumbotron>
          <InputGroup>
            <Input type="text" placeholder="Software Engineer..." />
            <InputGroupAddon>
              <Button color="warning" onClick={() => getSearchResults()}>Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Jumbotron>
        {stuff}
      </SearchContainer>
    </React.Fragment >
  );
}

export default Search;