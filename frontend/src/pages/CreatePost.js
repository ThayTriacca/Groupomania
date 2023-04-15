import React, { Component } from 'react';
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


class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: [],
          media: [],
        };
      }

    //   componentDidMount() {
    //     fetch("")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         this.setState({
    //           content: data,
    //           loaded: true,
    //         });
    //       });
    //   }


    render() {
        let { content, media } = this.state;

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
                                onChange={(event) => {
                                    this.state.content = event.target.value;
                                    console.log("Valor", this.state.content);
                                }}
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
        );
    }
};

CreatePost.propTypes = {

};

export default CreatePost;
