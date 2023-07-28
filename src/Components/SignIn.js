import React, { useState, useEffect } from "react";
import "../Pages/css/Login.css";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "../Utils/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Redux/Slices/UserSlice';
import { useSelector, useDispatch } from "react-redux";


function SignIn() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState({
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    }
  });
  const dispatch = useDispatch();
  const { isLoading, errorMsg } = useSelector((state) => state.user);

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

  const validateForm = () => {
    let error = false
    if(!validateEmail()) {
        error = true;
    }
    if(!validatePassword()) {
        error = true;
    }
    return !error;
  }

  const postLogin = async (credentials) => {
    await dispatch(userLogin(credentials)).unwrap();
    console.log('Login complete');
    navigate('/', {replace: false});
  }

  const saveForm = () => {
    console.log("Logged In");
    if(validateForm()) {
        const credentials = {
          email: email,
          password: password
        }
         
        postLogin(credentials);
    }
  };

  return (
    <div className="Register">
      
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
        label="Password"
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

export default SignIn;
