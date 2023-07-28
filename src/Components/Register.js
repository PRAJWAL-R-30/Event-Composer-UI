import React, { useState, useEffect } from "react";
import "../Pages/css/Login.css";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "../Utils/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../Redux/Slices/UserSlice"


function Register() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [inputValid, setInputValid] = useState({
    firstName: {
      error: false,
      helperText: "",
    },
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    },
    rePassword: {
      error: false,
      helperText: "",
    },
  });

  const dispatch = useDispatch();
  const { isLoading, errorMsg } = useSelector((state) => state.user);

  const validateFirstName = () => {
    if (!firstName.trim()) {
      setInputValid((prevInputValid) => ({
        ...prevInputValid,
        firstName: {
          ...prevInputValid.firstName,
          error: true,
          helperText: 'First Name is required!'
        },
      }));
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setInputValid((prevInputValid) => ({
        ...prevInputValid,
        email: {
          ...prevInputValid.email,
          error: true,
          helperText: "Email is required",
        },
      }));
      return false;
    }

    if (!validator.isEmail(email)) {
      setInputValid((prevInputValid) => ({
        ...prevInputValid,
        email: {
          ...prevInputValid.email,
          error: true,
          helperText: "Please enter a valid email Id",
        },
      }));
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    if(!password.trim()) {
        setInputValid((prevInputValid) => ({
            ...prevInputValid,
            password:{
                ...prevInputValid.password,
                error: true,
                helperText: 'Password is required'
            }
        }));
        return false;
    }
    return true;
  }

  const validateRePassword = () => {
    if(!rePassword.trim()) {
        setInputValid((prevInputValid) => ({
            ...prevInputValid,
            rePassword: {
                ...prevInputValid.rePassword,
                error: true,
                helperText: 'Please re-enter the password'
            }
        }));
        return false;
    }
    // Check Password Matching
    if(rePassword !== password) {
        setInputValid((prevInputValid) => ({
            ...prevInputValid,
            rePassword: {
                ...prevInputValid.rePassword,
                error: true,
                helperText: 'Password do not match'
            }
        }));
        return false;
    }
    return true;
  }

  const validateForm = () => {
    let error = false
    if(!validateFirstName()) {
        error = true
    }
    if(!validateEmail()) {
        error = true;
    }
    if(!validatePassword()) {
        error = true;
    }
    if(!validateRePassword()) {
        error = true;
    }
    console.log(!error);
    return !error;
  }

  const postUser = async (user) => {
    await dispatch(userRegister(user)).unwrap();
    navigate('/', {replace: false});
  }

  const saveForm = () => {
    console.log("Save Form");
    if(validateForm()) {
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
         
        postUser(user);
    }
  };

  return (
    <div className="Register">
      
      <TextField
        sx={textFieldStyle}
        label="First Name"
        variant="outlined"
        className="text-field"
        value={firstName}
        required
        onBlur={validateFirstName}
        error={inputValid.firstName.error}
        helperText={inputValid.firstName.helperText}
        onChange={(e) => {
            setFirstName(e.target.value);
          setInputValid((prevInputValid) => ({
                ...prevInputValid,
                firstName: {
                  ...prevInputValid.firstName,
                  error: false,
                  helperText: ''
                },
              }));
        }}
      />
      <TextField
        sx={textFieldStyle}
        label="Last Name"
        variant="outlined"
        className="text-field"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <TextField
        sx={textFieldStyle}
        label="Email"
        type={"email"}
        variant="outlined"
        className="text-field"
        value={email}
        required
        onBlur={validateEmail}
        error={inputValid.email.error}
        helperText={inputValid.email.helperText}
        onChange={(e) => {
          setEmail(e.target.value);
          setInputValid((prevInputValid) => ({
            ...prevInputValid,
            email: {
              ...prevInputValid.email,
              error: false,
              helperText: ''
            },
          }));
        }}
      />
      <TextField
        sx={textFieldStyle}
        label="Set Password"
        variant="outlined"
        type="password"
        className="text-field"
        value={password}
        required
        onBlur={validatePassword}
        error={inputValid.password.error}
        helperText={inputValid.password.helperText}
        onChange={(e) => {
          setPassword(e.target.value);
          setInputValid((prevInputValid) => ({
            ...prevInputValid,
            password:{
                ...prevInputValid.password,
                error: false,
                helperText: ''
            }
        }));
        }}
      />
      <TextField
        sx={textFieldStyle}
        label="Re-enter Password"
        variant="outlined"
        type="password"
        className="text-field"
        value={rePassword}
        required
        onBlur={validateRePassword}
        error={inputValid.rePassword.error}
        helperText={inputValid.rePassword.helperText}
        onChange={(e) => {
          setRePassword(e.target.value);
          setInputValid((prevInputValid) => ({
            ...prevInputValid,
            rePassword: {
                ...prevInputValid.rePassword,
                error: false,
                helperText: ''
            }
        }));
        }}
      />
      {errorMsg ? <p className="error-msg">{errorMsg}</p> : <></>}

      <LoadingButton 
        size="small"
        onClick={saveForm}
        loading={isLoading}
        variant="contained"
        className="NavButton submit-button"
      >
        Submit
      </LoadingButton>
    </div>
  );
}

export default Register;
