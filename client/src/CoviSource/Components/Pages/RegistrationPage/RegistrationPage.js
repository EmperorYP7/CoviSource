import React, { useReducer, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
import "./RegistrationPage.scss";

import image from "assets/img/bg2.jpg";
import Phone from "@material-ui/icons/Phone";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_USER } from "CoviSource/graphql/mutations/User/AddUser";
import { GET_USER } from "CoviSource/graphql/queries/User/GetUser";
import GoogleLogin from "react-google-login";

const useStyles = makeStyles(styles);

// To map each entry field to its value
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function RegistrationPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [formData, setFormData] = useReducer(formReducer, {});
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USER);

  if (queryLoading) return <>Loading...</>;
  if (queryError) return <>Error</>;
  if (queryData.me) {
    window.location.assign("/");
  }

  // addUser mutation
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  // Handling change for individual entries of form data
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  // Submit function to call the mutation
  const handleSubmit = (event) => {
    event.preventDefault();
    addUser({
      variables: {
        input: {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        },
      },
    });
    // If loading then do nothing
    if (loading);
    // If error, alert the user
    if (error) {
      alert(error);
    }
    if (data) {
      // If backend sends an error, alert the user
      if (data.register.errors) {
        alert(data.register.errors[0].message);
      }
      // Success
      if (data.register.user) {
        alert("Registration sucessful!");
        // Send to homepage
        window.location.assign("/");
      }
    }
  };

  // On obtaining valid Google OAuth tokens
  const googleSuccess = async (res) => {
    await addUser({
      variables: {
        input: {
          name: `${res.profileObj.givenName} ${res.profileObj.familyName}`,
          email: res.profileObj.email,
          phoneNumber: `${res.profileObj.googleId}`.substring(0, 10),
          password: res.qc.login_hint,
        },
      },
    });
    if (loading);
    if (error) {
      alert(error);
    }
    if (data) {
      if (data.register.errors) {
        alert(data.register.errors[0].message);
      }
      if (data.register.user) {
        alert("Registration sucessful!");
        window.location.assign("/");
      }
    }
  };

  // On invalid Google OAuth
  const googleFailure = () => {
    alert("Google Signup was unsucessfull");
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
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register Yourself</h4>
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
                      labelText="Your Name.."
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        name: "name",
                        onChange: handleChange,
                      }}
                    />
                    <CustomInput
                      labelText="Email ID.."
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
                        name: "email",
                        onChange: handleChange,
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
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
                        name: "password",
                        onChange: handleChange,
                      }}
                    />
                    <CustomInput
                      labelText="Contact Number"
                      id="phoneNumber"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Phone className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        name: "phoneNumber",
                        onChange: handleChange,
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Get started
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
