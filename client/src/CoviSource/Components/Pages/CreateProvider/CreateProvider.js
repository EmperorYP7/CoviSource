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
import CreateContact from "./CreateContact";
import { useMutation } from "@apollo/client";
import { CREATE_PROVIDER } from "CoviSource/graphql/mutations/Provider/CreateProvider";
import CreateResource from "./CreateResource";
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
  const [resourceData, setresourceData] = useState({});
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [numberContact, setNumberContact] = useState(0);
  const [createProvider, { loading, data, error }] = useMutation(
    CREATE_PROVIDER
  );

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
    event.preventDefault();
    createProvider({
      variables: {
        input: {
          providerName: formData.providerName,
          address: formData.address,
          location: {
            latitude: formData.latitude * 1.0,
            longitude: formData.longitude * 1.0,
          },
        },
      },
    });
    if (!loading) {
      if (data) {
        if (data.createProvider.provider) {
          alert(
            "Created Provider: ",
            data.createProvider.provider.providerName
          );
          window.location.assign("/" + data.createProvider.provider.slug);
        } else if (data.createProvider.errors) {
          alert(data.createProvider.errors[0].message);
        }
      } else if (error) {
        alert(error);
      }
    }
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
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register your Institute/Provider</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Name of institute/provider"
                      id="providerName"
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
                        onChange: handleChange,
                        name: "providerName",
                      }}
                    />
                    <CustomInput
                      labelText="Address of provider"
                      id="address"
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
                        onChange: handleChange,
                        name: "address",
                      }}
                    />
                    <CustomInput
                      labelText="Location: Latitude"
                      id="latitude"
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
                        onChange: handleChange,
                        name: "latitude",
                      }}
                    />
                    <CustomInput
                      labelText="Location: Longitude"
                      id="longitude"
                      name="longitude"
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
                        onChange: handleChange,
                        name: "longitude",
                      }}
                    />
                  </CardBody>
                  <Button className="add-resource-button">
                    + Add Resources
                  </Button>
                  <Button
                    className="add-contact-button"
                    onClick={() => setNumberContact(numberContact + 1)}
                  >
                    + Add Contacts
                  </Button>
                  <CreateContact
                    classes={classes}
                    resourceData={resourceData}
                    setresourceData={setresourceData}
                  />
                  <CreateResource
                    classes={classes}
                    resourceData={resourceData}
                    setresourceData={setresourceData}
                  />
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
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
