import React, { useState } from "react";
import { Box, Text, Image } from "grommet";
import Sidebar from "../components/sidebar";
import withAuth from "../components/withAuth";

export default withAuth(() => {
  return (
    <Box fill>
      <Sidebar>
        <Box flex align="center" justify="center">
          <Text>
            Ola mundo de  merda
          </Text>
        </Box>
      </Sidebar>
    </Box>
  );
});
