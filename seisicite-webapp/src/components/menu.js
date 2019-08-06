import React from "react";
import { Box, Button, Anchor } from "grommet";
import { Article, Home } from "grommet-icons";

export default () => {
  return (
    <Box
      align={"start"}
      pad={"medium"}
      alignSelf={"start"}
      direction={"column"}
      justify={"start"}
    >
      <Anchor style={{ display: 'flex', marginBottom: 20 }} href='/'>
        <Home style={{ marginRight: 20 }} />
        Home
      </Anchor>

      <Anchor style={{ display: 'flex', marginBottom: 10 }} href='/articles'>
        <Article style={{ marginRight: 20 }} />
        Artigos
      </Anchor>
    </Box>
  );
};
