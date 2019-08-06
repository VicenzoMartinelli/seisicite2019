import React, { useState, useContext, useEffect } from "react";
import LoginBackground from "../imgs/login.svg";
import {
  Box,
  Button,
  Heading,
  ResponsiveContext,
  TextInput,
  FormField,
  Text,
  Form
} from "grommet";
import { User } from "grommet-icons";
import { brand, light, dark } from "../styles/theme";
import { Formik } from "formik";
import Card from "../components/card";
import history from "../history";
import * as auth from "../services/auth";
import Dialog from "../components/dialog";

const Label = prop => (
  <Text textAlign={"center"} color={brand}>
    {prop.text}
  </Text>
);

export default () => {
  const [submit, setSubmit] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    open: false,
    message: "",
    status: ""
  });
  const size = useContext(ResponsiveContext);

  const onClose  = () => {
    setDialogInfo({
      open: false
    })
  }

  useEffect(() => {
    if (auth.loggedIn()) history.replace("/");
  }, []);

  return (
    <>
      <Dialog
        opened={dialogInfo.open}
        message={dialogInfo.message}
        status={dialogInfo.status}
        onCloseDialog={onClose}
      />
      <Box
        direction="row-responsive"
        justify="start"
        align="center"
        pad="xlarge"
        background={{
          image: `url(${LoginBackground})`,
          size: "70% 50%",
          position: "65%",
          repeat: "no-repeat"
        }}
        fill={true}
        responsive={true}
        gap={"xlarge"}
      >
        <Card
          pad="large"
          align="center"
          gap="small"
          height={"500px"}
          width={"medium"}
        >
          <Heading color={brand} level={2} textAlign={"center"}>
            Acesso <User size="large" color={brand} />
          </Heading>

          <Formik
            validate={values => {
              const errors = {};

              return errors;
            }}
            validateOnBlur={submit}
            validateOnChange={submit}
            onSubmit={(values, bag) => {
              bag.setSubmitting(true);

              auth
                .login(values.email, values.password)
                .then(res => {
                  if (res === false) {
                    setDialogInfo({
                      message: "Não foi possível realizar o login",
                      open: true,
                      status: "status-error"
                    });
                    return;
                  }

                  history.replace("/");
                })
                .catch(err => {
                  alert(err);
                });
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  setSubmit(true);
                  handleSubmit();
                }}
              >
                <FormField
                  label={<Label text={"E-mail"} />}
                  error={errors.email}
                >
                  <TextInput
                    name="email"
                    type="email"
                    required
                    style={{ color: dark }}
                    value={values.email || ""}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField
                  label={<Label text={"Senha"} />}
                  error={errors.password}
                >
                  <TextInput
                    name="password"
                    type="password"
                    required
                    style={{ color: dark }}
                    value={values.password || ""}
                    onChange={handleChange}
                  />
                </FormField>

                <Box
                  direction="row"
                  justify="between"
                  margin={{ top: "medium" }}
                >
                  <Button type="submit" label="Entrar" primary />
                </Box>
              </form>
            )}
          </Formik>
        </Card>
      </Box>
    </>
  );
};
