import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import '../styles/PostCard.css'
import UploadAndDisplayImage from '../components/UploadImages';
import { Button } from '@mui/material';
import { BACKEND } from '../global';

function RedBar() {
    return (
        <Box
            sx={{
                height: 20,
            }}
        />
    );
}


class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: '',
          media: '',//upload an imahge put here
          iduser:'//* look at the sessionStorag*/'
        };
      }

      handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        });
      }

      handleAddPost = () => {
        console.log('Valor do conteudo aqui:', this.state.content);
      }


      submitPost = () =>{
        console.log('Content:', this.state.content);
        //add a body from this.state
        fetch(`${BACKEND}/post`)
        .then((res) => res.json())
        .then((data) => {
       
        });
      }


    render() {
        // let { content, media } = this.state;

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
                                value= {this.state.content}
                                onChange= {this.handleContentChange}
                            />
                            <UploadAndDisplayImage /*props to revceive event with image url*/ />
                            <RedBar />
                            <Button variant="contained" color="primary" component="span">
                                Add Post
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
};

CreatePost.propTypes = {

};

export default CreatePost;
