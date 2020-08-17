import React, { useState, useEffect, memo } from 'react';
import { Header } from '@buffetjs/custom';
import { Table } from '@buffetjs/core';
import styled from 'styled-components';
import axios from 'axios';



const Wrapper = styled.div`
  padding: 18px 30px;
  p{
    margin-top: 1rem;
  }
`

const HomePage = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get("https://api.github.com/users/jgbotelho3/repos")
    .then((res) => setRows(res.data))
    .catch(e => createStrapi.notification.error(`Github API error, ${e}`))
  })
  const headers = [
    {
      name: "Name",
      value: "name"
    },
    {
      name: "url",
      value: "html_url"
    },
  ];

  return (
    
    <Wrapper>
      <Header
      title={{ label: 'Won Games Repositories' }}
      content="A list of Repositories from won Games"
      />
      <Table headers={headers} rows={rows}/>
    </Wrapper>
    
  );
};

export default memo(HomePage);