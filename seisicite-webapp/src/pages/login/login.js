import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, createStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Email, LockOutlined } from "@material-ui/icons";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import * as Yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import loginPageStyle from "./login-style";
import image from '../../imgs/login.svg';
import {
  Formik
} from 'formik';
import * as auth from '../../services/auth';
import history from '../../history';

const valSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Informe um email válido'),
  password: Yup
    .string()
    .required('Informe a senha')
    .min(6, "A senha deve possuir no mínimo 6 caracteres")
});

const useStyles = makeStyles((theme) => createStyles(loginPageStyle));

const LoginPage = (props) => {
  const classes = useStyles();
  const [cardAnimation, setCardAnimation] = useState('cardHidden');
  const { addToast } = useToasts();

  const onSubmit = (values, bag) => {
    bag.setSubmitting(true);

    auth
      .login(values.email, values.password)
      .then(res => {

        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: 'error', autoDismiss: true });
          return;
        }

        history.push("/");
      })
      .catch(err => {
        console.log(err)
        addToast(err, { appearance: 'error', autoDismiss: true });
      });
  };

  useEffect(() => {
    if (auth.loggedIn())
      history.push("/");

    setTimeout(() => setCardAnimation(""), 250);
  }, []);

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimation.toString()]}>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={onSubmit}
                  validationSchema={valSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      handleChange,
                      handleSubmit,
                    } = props;
                    return (
                      <form onSubmit={handleSubmit}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                          <h4>Sei Sicite - 2019</h4>
                        </CardHeader>
                        <CardBody>
                          <CustomInput
                            labelText="Email"
                            error={(errors.email && touched.email)}
                            labelError={(errors.email && touched.email) && errors.email}
                            id="email"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "email",
                              onChange: handleChange,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              )
                            }}
                          />
                          <CustomInput
                            labelText="Senha"
                            error={(errors.password && touched.password)}
                            labelError={(errors.password && touched.password) && errors.password}
                            id="password"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "password",
                              onChange: handleChange,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <LockOutlined className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                              autoComplete: "off"
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button type='submit' simple color="primary" size="lg">
                            Entrar
                          </Button>
                        </CardFooter>
                      </form>
                    );
                  }}
                </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
LoginPage.propTypes = {
  classes: PropTypes.object
};

export default LoginPage;
