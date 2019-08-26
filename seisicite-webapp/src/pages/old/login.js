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
import { Formik } from "formik";
import Card from "../components/card";
import history from "../history";
import * as auth from "../services/auth";
import Dialog from "../components/dialog";

const Label = prop => (
  <Text textAlign={"center"} color={'brand'}>
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

  const onClose = () => {
    setDialogInfo({
      open: false
    })
  }

  const onSubmit = (values, bag) => {
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
  };

  useEffect(() => {
    if (auth.loggedIn()) history.replace("/");
  }, []);

  return (
    <>
      <Dialog
        opened={dialogInfo.open}
        message={dialogInfo.message}
        status={dialogInfo.status}
        onCloseDialog={onClose} />
      <Box
        direction="row-responsive"
        justify="start"
        align="center"
        pad="xlarge"
        background={{
          image: `url(${LoginBackground})`,
          size: "38% 66%",
          position: "80%;",
          repeat: "no-repeat"
        }}
        fill={true}
        responsive={true}
        gap={"xlarge"}
      >
        <Card
          pad={'medium'}
          align="center"
          round={'small'}
          width={"large"}
          responsive={true}
        >
          <Heading color={'brand'} level={2} textAlign={"center"}>
            Acesso <User size="large" color={'brand'} />
          </Heading>

          <Formik
            validateOnBlur={submit}
            validateOnChange={submit}
            onSubmit={onSubmit}
          >

            {({ values, errors, handleChange, handleSubmit }) => (
              <Box fill pad={'medium'} responsive={true}>
                <Form
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
                      color="#000"
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
                      value={values.password || ""}
                      onChange={handleChange}
                    />
                  </FormField>
                  <Box
                    direction="row"
                    justify="center"
                    fill={'horizontal'}
                    pad={'large'}
                    gap={'large'}
                  >
                    <Button type="submit" label={<Text weight={'bold'} color={'brand'}>Entrar</Text>} fill />
                  </Box>
                </Form>
              </Box>
            )}
          </Formik>
        </Card>
      </Box>
    </>
  );
};
