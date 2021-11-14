import React from "react";
import styled from "styled-components";
import { Layout } from "./components/Layout";
import { Table } from "./components/Table";

import "./App.css";

function App() {
  return (
    <Container>
      <Layout />
      <WrapContent>
        <h3>Top 50 songs in the World</h3>
        <Description>
          Top 50 songs of the moment in the world according to the Top 50 :
          Mondial playlist. <br /> This project is a technical test for Famoco ,
          the goal is to retrieve data from an API and display them in a table
          format. I am calling the Spotify API once and store the 50 tracks in
          the store. The pagination is handled manually to limit API calls.
        </Description>
        <Description></Description>
        <Table />
      </WrapContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
const WrapContent = styled.div`
  position: relative;
  min-height: calc(100vh);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 50px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;
const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

export default App;
