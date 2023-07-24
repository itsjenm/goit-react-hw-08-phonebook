import { Card, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import styled from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from 'redux/Users/operators';

const Signup = () => {
  // set the form state to empty strings
  const [formData, setFormData] = useState({
    "name" : '',
    "email": '',
    "password" : '',
  });
  const nav = useNavigate();
  const dispatch = useDispatch();

  // create a function to handle the form submission and dispatch our operator
  const handleSubmit = async (e) => {
    e.preventDefault();
    // to call operator, after the user logs in, they should be navigated to main page
    try {
      await dispatch(signUpUser(formData))
      nav('/login');
    
    } catch (error) {
      console.error('Error occurred during sign up: ', error)
    }
  }
  return (
    <div className={styled.signup_container}>
      <Card sx={{ padding: '100px 150px' }}>
        <h1 className={styled.signup_title}>Sign up</h1>
        <Box
          component="form"
          className={styled.form_container}
          onSubmit={handleSubmit}
        >
          <TextField
          type='text'
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value })}
          />
          <TextField
          type='email'
            sx={{ margin: '10px 0 10px 0' }}
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value })}
            required
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value })}
            required
          />
          <div className={styled.button_container}>
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: '20px', backgroundColor: '#400CCC' }}
            >
              Submit
            </Button>
            <Link to={'/login'}>
              <Button color="secondary">Log In</Button>
            </Link>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default Signup;
