import React, { useReducer } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// import Hospital from "@material-ui/icons/LocalHospital";
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

import { gql, useMutation } from "@apollo/client";

const useStyles = makeStyles(styles);

const ADD_USER = gql`
  mutation AddUser($input: UserRegisterInput!) {
    register(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function RegistrationPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [formData, setFormData] = useReducer(formReducer, {});
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [addUser, { data, loading }] = useMutation(ADD_USER);

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser({
      variables: {
        input: {
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          password: formData.password,
        },
      },
    });
    if (!loading && !data) {
      alert("Registration successfull!");
    }
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
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
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
                      id="contactNumber"
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
                        name: "contactNumber",
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
