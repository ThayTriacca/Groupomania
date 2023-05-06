import React, { Component } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ImageAvatars from '../components/imageAvatar';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../styles/Profile.css';
import { BACKEND } from '../global';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);

    this.state = {
      userData: null,
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: '',
    };
  }

  async fetchUserData() {
    try {
      const response = await axios.get(`${BACKEND}/auth/${this.userId}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        this.setState({
          userData: data,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profilePicture: data.profilePicture,
        });
        console.log('Inside fetchuserdata - Profile +' + data.profilePicture);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  handleProfilePictureChange = (value) => {
    this.setState({
      profilePicture: value
    });
    console.log('Inside handleProfilePictureChange - Profile + ' + value);
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token');
    console.log("inside handlesubmit - Profile + " + this.state.profilePicture);

    const formData = new FormData();
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('email', this.state.email);
    console.log('Inside handleSubmit - Profile + ' + this.state.profilePicture);
    if (this.state.profilePicture) {
      formData.append('image', this.state.profilePicture);
    }

    try {
      const response = await axios.put(`${BACKEND}/auth/${this.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      console.log(response.data);
      sessionStorage.setItem('profilePictureUrl', `http://localhost:9000/api/auth/${this.state.profilePicture} || "avatar.png"`);
       //add profilePicture into session storage (http://localhost:9000/api/auth/${profilePicture || "avatar.png")
    } catch (error) {
      console.error(error);
    }
  }


  handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(`${BACKEND}/auth/${this.userId}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.status === 200) {
        console.log('Profile deleted successfully!');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('firstName');
        window.location.href = '/login';
      } else {
        console.error('Failed to delete profile:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  }

  componentDidMount() {
    this.userId = sessionStorage.getItem('userId');
    this.token = sessionStorage.getItem('token');
    this.fetchUserData();
  }

  render() {
    const { userData, firstName, lastName, email } = this.state;

    return (
      <div className="ProfilePage">
        <ResponsiveAppBar />
        <div className="ProfileCard">
          <div className="ProfileAvatar">
            <ImageAvatars onChange={(value) => {
              this.setState({ profilePicture: value });
            }} />
          </div>
          <form onSubmit={this.handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '50ch' },
                alignItems: 'center',
              }}
            >
              <div className="ProfileForm">
                <h2>Profile de {userData && userData.firstName}</h2>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                  autoFocus
                />
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="ProfileButtons">
                <Button variant="contained" color="primary" type="submit" onClick={this.handleSubmit}>
                  Save Profile
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleDeleteProfile}>
                  Delete Profile
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </div>
    );
  };
}


//------ Envia pro backend, porem envia como null

{/* <ImageAvatars onChange={(value) => {
  this.setState({ imageUrl: value });
}} />     */}

//------ Nao envia pro backend, mas reconhece o value
{/* <ImageAvatars onChange={this.handleProfilePictureChange} /> */ }