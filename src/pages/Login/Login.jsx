import { Card, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styled from './Login.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'redux/Users/operators';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'redux/Users/selectors';

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const loggedIn = useSelector(isLoggedIn);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const signedUp = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  // eslint-disable-next-line
  const [loginError, setLoginError] = useState('');

  async function handleLogin() {
    try {
     
      if (
        user.email !== formData.email ||
        user.password !== formData.password
      ) {
        setLoginError('Login failed! Please check your credentials.');
        nav('/signup');
        return;
      }
      else if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        await dispatch(loginUser(formData));
        console.log('Login successful!');
        nav('/');
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login.');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin();

    // Clear the form data after submission
    setFormData({
      email: '',
      password: '',
    });
  }

  return (
    <div className={styled.login_container}>
      <Card sx={{ padding: '100px 150px' }}>
        <h1 className={styled.login_title}>Login</h1>
        <Box
          component="form"
          className={styled.form_container}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ margin: '10px 0 10px 0' }}
            label="Email"
            name="email"
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            required
          />
          <TextField
            label="Password"
            name="password"
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
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
            <Link to={'/signup'}>
              <Button color="secondary">Sign up</Button>
            </Link>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default Login;
