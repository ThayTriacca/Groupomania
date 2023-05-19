import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blacklogo from '../assets/blacklogo.png';
import '../styles/App.css';
import { BACKEND } from '../global';

const theme = createTheme();

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = this.state;
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    // Send a POST request to the backend with the user data for signup
    fetch(`${BACKEND}/auth/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(async data => {
      console.log(data);
      try {
        // After successful signup, send a POST request to the backend with the same email and password for login
        const response = await fetch(`${BACKEND}/auth/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // If the login response is successful, extract the data from the response and store it in session storage
          const data = await response.json();
          sessionStorage.setItem('userId', data.userId);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('firstName', data.firstName);
          window.location = '/main';
          console.log(data.userId);
        } else {
          // If there's an error, throw an error with the error message received from the backend
          const error = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        // Catch any errors that occur during the login request and display an alert with the error message
        alert("Error: " + error.message);
        console.error(error);
      }
    })
    .catch(error => {
      // Catch any errors that occur during the signup request and display an alert with the error message
      alert("Error " + error.message);
      console.error(error);
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={blacklogo} alt='Groupomania' className='gm-blacklogo' />
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"© "}
              {new Date().getFullYear()}
              {" Groupomania. All rights reserved."}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default SignUp;
