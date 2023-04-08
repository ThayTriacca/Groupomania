import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import ImageAvatars from '../components/avatar';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../styles/Profile.css';


export default function Profile() {
    return (
        <div className="ProfilePage">
            <ResponsiveAppBar />
            <div className='ProfileContainer'>
                <div className='ProfileCard'>
                    <ImageAvatars/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { width: '50ch' },
                            alignItems: 'center',
                        }}
                    >
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Add Post
                            </Button>
                        </label>
                    </Box>
                </div>
            </div>
        </div>
    )
};