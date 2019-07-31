import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Collapsible,
  ResponsiveContext,
  Layer,
  Text
} from "grommet";
import { light } from "../styles/theme";
import { Notification } from "grommet-icons";

const AppBar = props => (
  <Box
    tag="header"
    direction="row-reverse"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
)

export default () => {
  console.log("aaa");
  const [showSidebar, setShowSidebar] = useState(false);

  const [open, setOpened] = useState(undefined);

  const onClose = () => setOpened(undefined);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
          <AppBar>
            <Heading color={light} level="4" margin="none">
              SeiSicite - Comissão
            </Heading>
            <Button
              icon={<Notification color={light} />}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </AppBar>
          <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
            {!showSidebar || size !== "small" ? (
              <Collapsible direction="horizontal" open={showSidebar}>
                <Box
                  flex
                  width="medium"
                  background="light-2"
                  elevation="small"
                  align="center"
                  justify="center"
                >
                  sidebar
                </Box>
              </Collapsible>
            ) : (
              <Layer
                position="center"
                modals
                responsive={true}
                onClickOutside={onClose}
                onEsc={onClose}
              >
                <Box
                  pad="medium"
                  gap="small"
                  width="medium"
                  fill
                  align={"center"}
                  justify={"center"}
                >
                  <Heading level={3} margin="none">
                    Confirm
                  </Heading>
                  <Text>Are you sure you want to delete?</Text>
                  <Box
                    as="footer"
                    gap="small"
                    direction="row"
                    align="center"
                    justify="end"
                    pad={{ top: "medium", bottom: "small" }}
                  >
                    <Button label="Open 2" color="dark-3" />
                    <Button
                      label={
                        <Text color="white">
                          <strong>Delete</strong>
                        </Text>
                      }
                      onClick={onClose}
                      primary
                      color="status-critical"
                    />
                  </Box>
                </Box>
              </Layer>
            )}
            <Box flex align="center" justify="center">
              {" "}
              app body{" "}
            </Box>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};
