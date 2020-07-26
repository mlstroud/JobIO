import React from "react";
import { Container, Jumbotron, Button, InputGroup, InputGroupAddon, Label, Input } from "reactstrap";
import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import Job from "./Job";
import { Spinner } from "reactstrap";
const axios = require("axios");

const SearchContainer = styled(Container)`
  padding-top: 200px;
`;

function Search() {

  const [stuff, doStuff] = useState(null);
  const [isLoading, toggleLoad] = useState(false);
  const [loadingIcon, toggleIcon] = useState(null);

  let searchResults = [];

  async function getSearchResults() {

    toggleIcon(<Spinner />);

    axios.get(`http://localhost:5000/search`)
      .then((response) => {
        console.log(response.data);
        doStuff(response.data);
        toggleLoad(!isLoading);
        toggleIcon(null);
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
        {/* {stuff} */}
        {loadingIcon}
        {stuff !== null && stuff.map((job) => {
          return <Job title={job.title}
            company={job.company}
            location={job.location}
            summary={job.summary} />
        })}
      </SearchContainer>
    </React.Fragment >
  );
}

export default Search;