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
        onChange={handleChange}
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
        }}
      />
      <CustomInput
        labelText="Contact Number"
        id="contactNo"
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
