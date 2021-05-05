import React, { useReducer, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import LocationCity from "@material-ui/icons/LocationCity";
// import People from "@material-ui/icons/People";
import Hospital from "@material-ui/icons/LocalHospital";
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
import "./CreateProvider.scss";

import image from "assets/img/bg7.jpg";
// import CreateContact from "./CreateContact";
// import Map from "CoviSource/Components/UtilityComponents/Map/Map";

const useStyles = makeStyles(styles);

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function CreateProvider(props) {
  const [formData, setFormData] = useReducer(formReducer, {});
  // const [resourceData, setresourceData] = useReducer(formReducer, {});
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    // console.log(resourceData);
  };

  return (
    <div className="create-provider">
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
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register your Institute/Provider</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Name of institute/provider"
                      id="providerName"
                      name="providerName"
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Hospital className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Address of provider"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationCity className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Location: Latitude"
                      id="latitude"
                      name="latitude"
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationCity className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Location: Longitude"
                      id="longitude"
                      name="longitude"
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LocationCity className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <Button className="add-resource-button">
                    + Add Resources
                  </Button>
                  <Button className="add-contact-button">+ Add Contacts</Button>
                  {/* <CreateContact
                    classes={classes}
                    resourceData={resourceData}
                    setresourceData={setresourceData}
                  /> */}
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Register
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
