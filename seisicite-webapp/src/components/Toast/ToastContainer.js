import React from 'react'
import styled from "styled-components";

const Root = styled.div`
    box-sizing: border-box;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 8px;
    position: fixed;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 5000;
`;

const ToastContainer = ({ children, ...rest }) => {
  return <Root {...rest}>{children}</Root>;
};

export default ToastContainer;