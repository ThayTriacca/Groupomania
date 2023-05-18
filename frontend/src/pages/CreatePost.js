import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import '../styles/NewPostCard.css'
import UploadAndDisplayImage from '../components/UploadImages';
import { Button, Input } from '@mui/material';
import { BACKEND } from '../global';
import axios from 'axios';

function RedBar() {
    return (
        <Box
            sx={{
                height: 20,
            }}
        />
    );
}

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.state = {
            content: '',
            imageUrl: '',
            userId: sessionStorage.getItem('userId')
        }
    }
    onSubmit(e) {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const firstName = sessionStorage.getItem('firstName');

        const formData = new FormData();
        
        formData.append('content', this.state.content);
        formData.append('userId', userId);
        formData.append('createdByName', firstName);
        console.log('Esse eh o ' + this.state.imageUrl);
        if (this.state.imageUrl) {
            formData.append('image', this.state.imageUrl)
        }


        axios.post(`${BACKEND}/post`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) .then(res => {
            window.location = '/main';
            console.log(res)
        })
    }
    
    handleContentChange(e) {
        this.setState({ content: e.target.value });
    }
    render () {
        return (
            <div className="PostPage">
                <ResponsiveAppBar />
                <div className='PostContainer'>
                    <form onSubmit={this.onSubmit}>
                    <div className='NewPostCard'>
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
                                type='text'
                                name='content'
                                id="content-basic"
                                label="Post Content"
                                variant="outlined"
                                multiline
                                rows={5}
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            />
                            <UploadAndDisplayImage onChange={(value)=> {
                                this.setState({imageUrl: value});
                            }} />
                            <RedBar />
                            <Button variant="contained" color="primary" component="span" onClick={this.onSubmit}>
                                Add Post
                            </Button>
                        </Box>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}