import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import styled from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from 'redux/Users/selectors';
import { logOutUser } from 'redux/Users/operators';

const Header = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loggedIn = useSelector(isLoggedIn);
  // function to display all variables
  const displayDesktop = () => {
    // return the logo variable to render the logo
    return (
      <Toolbar className={styled.header_container}>
        <Link
          to={'/'}
          style={{ textDecoration: 'none', color: 'white', flexGrow: 1}}
        >
          {phoneBookLogo}
        </Link>
        {loggedIn ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(logOutUser())}
        >
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={() => nav('/login')}>
          Log In
        </Button>
      )}
      </Toolbar>
    );
  };

  /**
   * variable for logo */
  const phoneBookLogo = (
    // the h6 variant will ensure the size of the logo is of the size h46. However, if you want to maintain an element of h1
    // when it shows up on the DOM. A screenreader will automatically read an h1 element first by using component="h1"
    <Typography variant="h6" component="h1" className={styled.logo}>
      Phonebook App
    </Typography>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">{displayDesktop()}</AppBar>
    </Box>
  );
};

export default Header;
