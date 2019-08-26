import React, { useState, useEffect, useRef } from 'react'
import { Box, Heading, InfiniteScroll, Text, Button } from 'grommet'
import Sidebar from '../components/sidebar'
import withAuth from '../components/withAuth'
import CardArticle from '../components/cardArticle';
import { findArticles } from '../services/api';
import { Add } from 'grommet-icons';

const step = 9;

export default withAuth((props) => {
  const event = new URLSearchParams(props.history.location.search).get("event");

  const [data, setData] = useState([]);
  const [page] = useState(0);
  const latestData = useRef(data);
  const latestPage = useRef(page);

  const onMore = () => {
    console.log('aaaa')
    findArticles(event, page)
      .then(res => {
        latestData.current = [...latestData.current, ...res.data.items];
        latestPage.current = res.data.page;

        setData(latestData.current);
      });
  }

  useEffect(() => {
    latestData.current = [];
    latestPage.current = 0;
    onMore();
  }, [props.history.location.search]);

  const allItems = Array(2000)
    .fill()
    .map((_, i) => `item ${i + 1}`);

  return (
    <Box fill>
      <Sidebar>
        <Box flex align="center" justify="center">
          <Heading level={2}>
            <Box gap="small">
              <Heading level={4} textAlign={"start"}>Artigos disponíveis</Heading>
            </Box>
          </Heading>
          <Box
            direction={'column'}
            fill
          >
            <Box
              direction="column"
            >
              {
                latestData.current.map((art) => (
                  <CardArticle
                    key={art.id}
                    {...art}
                  />
                ))
              }
            </Box>
            <Box
              direction="row"
              justify="center"
              pad={'large'}
            >
              <Button style={{ padding: '40px !important' }} onClick={onMore} icon={<Add />} label={<Text weight={'bold'} color={'brand'}>Carregar mais</Text>} />
            </Box>
          </Box>
        </Box>
      </Sidebar>
    </Box >
  )
});
