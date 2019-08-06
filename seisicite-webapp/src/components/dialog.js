import React, { useEffect } from "react";
import { Layer, Box, Text, Button } from "grommet";
import { StatusGood, StatusCritical, FormClose } from "grommet-icons";
import theme from '../styles/theme';

const Dialog = ({ opened, status, message, onCloseDialog }) => {
  const st = status || "status-ok";

  useEffect(() => {
    setTimeout(() => onCloseDialog()
    , 5000);
  }, []);

  return (
    <>
      {opened && (
        <Layer
          position="bottom"
          modal={false}
          margin={{ vertical: "medium", horizontal: "small" }}
          onEsc={onCloseDialog}
          responsive={false}
          plain
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            justify="between"
            round="medium"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
            background={'rgba(36, 40, 43, 1)'}
          >
            <Box align="center" direction="row" gap="xsmall">
              {st === "status-ok" ? <StatusGood color={st} /> : <StatusCritical color={st} />}
              <Text color={theme.global.colors.white} size={'small'}>{message}</Text>
            </Box>
            <Button icon={<FormClose />} onClick={onCloseDialog} plain />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default Dialog;
