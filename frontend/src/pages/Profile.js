import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ImageAvatars from '../components/avatar';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../styles/Profile.css';
import { BACKEND } from '../global';


export default function Profile() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const handleImageChange = (event) => {
        setProfilePicture(event.target.files[0]);
    }

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`${BACKEND}/auth/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setEmail(data.email);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }

        fetchUserData();
    }, [userId, token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await fetch(`${BACKEND}/auth/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
              });
            if (response.ok) {
                console.log('Profile updated successfully!');
            } else {
                console.error('Failed to update profile:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="ProfilePage">
            <ResponsiveAppBar />
            <div className='ProfileCard'>
                <div className='ProfileAvatar'>
                    <ImageAvatars />
                    <input type="file" onChange={handleImageChange} />
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '50ch' },
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className='ProfileForm'>
                            <h2>Profile de {userData && userData.firstName}</h2>

                            {/* <Grid container spacing={2}>
                            <Grid item xs={12}> */}
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoFocus
                            />
                            {/* </Grid>
                            <Grid item xs={12}> */}
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {/* </Grid>
                            <Grid item xs={12}> */}
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* </Grid>
                            <Grid item xs={12}> */}
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* </Grid>
                        </Grid> */}
                        </div>
                        <div className='ProfileButtons'>
                            <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
                                    Edit Profile
                                </Button>
                            </label>
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Delete Profile
                                </Button>
                            </label>
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    )
};