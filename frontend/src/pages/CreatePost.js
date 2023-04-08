import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import '../styles/PostCard.css'
import UploadAndDisplayImage from '../components/UploadImages';
import { Button } from '@mui/material';

function RedBar() {
    return (
        <Box
            sx={{
                height: 20,
            }}
        />
    );
}

export default function CreatePost() {
    return (
        <div className="PostPage">
            <ResponsiveAppBar />
            <div className='PostContainer'>
                <div className='PostCard'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { width: '50ch' },
                            alignItems: 'center',
                        }}
                    >
                        <RedBar />
                        <TextField
                            id="content-basic"
                            label="Post Content"
                            variant="outlined"
                            multiline
                            rows={5}
                        />
                        <UploadAndDisplayImage />
                        <RedBar />
                        <Button variant="contained" color="primary" component="span">
                            Add Post
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    )
};

//Arrumar add post