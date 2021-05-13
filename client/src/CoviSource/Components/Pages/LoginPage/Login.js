import React, { useReducer } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Password from "@material-ui/icons/Lock";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Header from "CoviSource/Components/UtilityComponents/Header/Header";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import "./Login.scss";

import image from "assets/img/bg7.jpg";

import { useMutation } from "@apollo/client";
import { LOGIN } from "CoviSource/graphql/mutations/User/Login";
import GoogleLogin from "react-google-login";

const useStyles = makeStyles(styles);

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function Login(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [formData, setFormData] = useReducer(formReducer, {});
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [login, { data, error, loading }] = useMutation(LOGIN);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      variables: {
        input: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
    if (loading);
    if (error) {
      alert(error);
      return;
    }
    if (data) {
      if (data.login.errors) {
        alert(data.login.errors[0].message);
      } else {
        alert("Logged In!");
        window.location.assign("/");
      }
    }
  };

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  const googleSuccess = async (res) => {
    console.log(res);
    await login({
      variables: {
        input: {
          email: res.profileObj.email,
          password: res.qc.login_hint,
        },
      },
    });
    if (loading);
    if (error) {
      alert(error);
      return;
    }
    if (data) {
      if (data.login.errors) {
        alert(data.login.errors[0].message);
      } else {
        alert("Logged In!");
        window.location.assign("/");
      }
    }
  };
  const googleFailure = () => {
    console.log("Google Signin was unsucessfull.");
  };

  return (
    <div>
      <Header
        theme="DARK"
        color="transparent"
        changeColorOnScroll={scrollChangeData}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_OAUTH}
                        render={(renderProps) => (
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                          >
                            <i className={"fab fa-google-plus-g"} />
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                      />
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: handleChange,
                        name: "email",
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Password className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onChange: handleChange,
                        name: "password",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Lets Save Lives!
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
