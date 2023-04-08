import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ImageAvatars from '../components/avatar';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../styles/Profile.css';


export default function Profile() {
    return (
        <div className="ProfilePage">
            <ResponsiveAppBar />
            <div className='ProfileCard'>
                <div className='ProfileAvatar'>
                    <ImageAvatars />
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '50ch' },
                        alignItems: 'center',
                    }}
                >
                    <div className='ProfileForm'>
                        <h2>Profile de USERNAME</h2>

                        {/* <Grid container spacing={2}>
                            <Grid item xs={12}> */}
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
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
                        />
                        {/* </Grid>
                        </Grid> */}
                    </div>
                    <div className='ProfileButtons'>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Edit Profile
                            </Button>
                        </label>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Delete Profile
                            </Button>
                        </label>
                    </div>
                </Box>
            </div>
        </div>
    )
};