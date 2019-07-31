import React, { Component } from "react";
import { Box } from "grommet";

const Card = ({ children, background, ...rest }) => {
    
    return (
    <Box background={background || '#FFF'} round="xxsmall" elevation="small" overflow="hidden" {...rest}>
      {children}
    </Box>
  );
};

export default Card;
