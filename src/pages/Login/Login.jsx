import { Card, Box, TextField, Button } from '@mui/material';
import React from 'react';
import styled from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={styled.login_container}>
      <Card sx={{ padding: '100px 150px' }}>
        <h1 className={styled.login_title}>Login</h1>
        <Box component="form" className={styled.form_container}>
          <TextField
            sx={{ margin: '10px 0 10px 0' }}
            label="Email"
            name="email"
            required
          />
          <TextField label="Password" name="password" required />
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
