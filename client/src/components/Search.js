import React from "react";
import { Container, Jumbotron, Button, InputGroup, InputGroupAddon, Label, Input } from "reactstrap";
import styled from "styled-components";

const SearchContainer = styled(Container)`
  padding-top: 200px;
`;

function Search() {
  return (
    <React.Fragment>
      <SearchContainer>
        <h2>Search for jobs</h2>
        <Jumbotron>
          <InputGroup>
            <Input type="text" placeholder="Software Engineer..." />
            <InputGroupAddon>
              <Button color="warning">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Jumbotron>
      </SearchContainer>
    </React.Fragment >
  );
}

export default Search;