import { InputAdornment } from "@material-ui/core";
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/Phone";
import CustomInput from "components/CustomInput/CustomInput";
import propTypes from "prop-types";
import React from "react";

export default function CreateContact({ classes, setresourceData }) {
  const handleChange = (event) => {
    setresourceData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  return (
    <div className="contact">
      <CustomInput
        labelText="Name"
        id="name"
        name="name"
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
          autoComplete: "off",
          name: "name",
          onChange: handleChange,
        }}
      />
      <CustomInput
        labelText="Quantity"
        id="quantity"
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
          name: "quantity",
          onChange: handleChange,
        }}
      />
    </div>
  );
}

CreateContact.propTypes = {
  classes: propTypes.object,
  formData: propTypes.object,
  setresourceData: propTypes.func,
};
