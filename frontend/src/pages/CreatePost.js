import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import '../styles/NewPostCard.css'
import UploadAndDisplayImage from '../components/UploadImages';
import { Button } from '@mui/material';
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
    e.preventDefault();

    // Get the user's token, ID, and first name from session storage
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const firstName = sessionStorage.getItem('firstName');

    // Create a FormData object
    const formData = new FormData();

    // Set the content, userID and firstName in the form data
    formData.append('content', this.state.content);
    formData.append('userId', userId);
    formData.append('createdByName', firstName);

    // If an imageURL is available, append it to the form data
    if (this.state.imageUrl) {
      formData.append('image', this.state.imageUrl);
    }

    // Make a POST request to the backend API to create a new post
    axios.post(`${BACKEND}/post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      // Redirect to the main page after successful
      window.location = '/main';
      console.log(res);
    });
  }

  handleContentChange(e) {
    // Update the content state when the input field value changes
    this.setState({ content: e.target.value });
  }

  render() {
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
                  sx={{
                    width: '50ch',
                    '@media (max-width: 768px)': {
                      width: '30ch',
                    },
                  }}
                />
                <UploadAndDisplayImage onChange={(value) => {
                  // Update the imageURL state when a new image is selected
                  this.setState({ imageUrl: value });
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
    );
  }
}
