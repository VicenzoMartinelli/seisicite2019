import React from "react";
import { Box, Button, Text } from "grommet";
import { Article, Home } from "grommet-icons";
import { Link } from 'react-router-dom';
import { Tag } from "grommet-controls/components";

const SidebarButton = ({ label, ...rest }) => (
  <Button plain fill {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "accent-1" : undefined}
        pad={{ horizontal: "large", vertical: "medium" }}
        direction={'row'}
        justify={"between"}
        align="center"
        fill={'horizontal'}
      >
        {rest.children}
        <Text size="large" color={'dark-2'}>{label}</Text>
      </Box>
    )}
  </Button>
);


export default () => {
  return (
    <Box
      direction={"column"}
      fill={'horizontal'}
    >
      <Link to={'/'} style={{ textDecoration: 'none', width: '100%' }}>
        <SidebarButton label="Home">
          <Home size='medium' />
        </SidebarButton>
      </Link>

      <Link style={{ textDecoration: 'none', width: '100%' }} to={{
        pathname: '/articles',
        search: `?event=1`
      }}>
        <SidebarButton label="Artigos SEI">
          <Article size='medium' />
        </SidebarButton>
      </Link>

      <Link style={{ textDecoration: 'none', width: '100%' }} to={{
        pathname: '/articles',
        search: `?event=2`
      }}>
        <SidebarButton label="Artigos SICITE">
          <Article size='medium' />
        </SidebarButton>
      </Link>
    </Box >
  );
};
