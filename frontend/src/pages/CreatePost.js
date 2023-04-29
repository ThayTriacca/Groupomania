import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import '../styles/PostCard.css'
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
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.state = {
            content: '',
            imageUrl: '',
            userId: sessionStorage.getItem('userId')
        }
    }
    onFileChange(e){
        if (e.target && e.target.files && e.target.files[0]) {
            this.setState({imageUrl: e.target.files[0]});
        }
    }
    onSubmit(e) {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const firstName = sessionStorage.getItem('firstName');

        const formData = new FormData()
        
        formData.append('content', this.state.content);
        formData.append('userId', userId);
        formData.append('createdByName', firstName);
        console.log('Esse eh o ' + this.state.imageUrl);
        if (this.state.imageUrl) {
            formData.append('imageUrl', this.state.imageUrl)
        }
        axios.post(`${BACKEND}/post`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) .then(res => {
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
                    <form enctype="multipart/form-data" onSubmit={this.onSubmit}>
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
                            <UploadAndDisplayImage onChange={this.onFileChange} imageUrl={this.state.imageUrl} />
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



// import React, { Component } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import ResponsiveAppBar from "../components/ResponsiveAppBar";
// import '../styles/PostCard.css'
// import UploadAndDisplayImage from '../components/UploadImages';
// import { Button } from '@mui/material';
// import { BACKEND } from '../global';

// function RedBar() {
//     return (
//         <Box
//             sx={{
//                 height: 20,
//             }}
//         />
//     );
// }

// class CreatePost extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             content: '',
//             images: null,
//             userId: sessionStorage.getItem('userId')
//         };
//     }

//     handleContentChange = (event) => {
//         this.setState({
//             content: event.target.value
//         });
//     }

//     submitPost = (event) => {
//         event.preventDefault();
//         const token = sessionStorage.getItem('token');
//         const userId = sessionStorage.getItem('userId');
//         const firstName = sessionStorage.getItem('firstName');

//         const formData = new FormData();

//         formData.append('content', this.state.content);
//         formData.append('userId', userId);
//         formData.append('createdByName', firstName);

//         if (this.state.images) {
//             formData.append('images', this.state.images);
//         }
//         console.log("This if formData" + formData);
//         console.log("This is images" + this.state.images);

//         fetch(`${BACKEND}/post`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             body: formData
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//     }

//     handleImagesChange = (images) => {
//         this.setState({
//             images: images
//         });
//     }

//     render() {

//         return (
//             <div className="PostPage">
//                 <ResponsiveAppBar />
//                 <div className='PostContainer'>
//                     <div className='NewPostCard'>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 '& .MuiTextField-root': { width: '50ch' },
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <RedBar />
//                             <TextField
//                                 id="content-basic"
//                                 label="Post Content"
//                                 variant="outlined"
//                                 multiline
//                                 rows={5}
//                                 value={this.state.content}
//                                 onChange={this.handleContentChange}
//                             />
//                             <UploadAndDisplayImage onChange={(value) => {
//                                 this.setState({
//                                     images: value
//                                 })
//                             }} />
//                             <RedBar />
//                             <Button variant="contained" color="primary" component="span" onClick={this.submitPost}>
//                                 Add Post
//                             </Button>
//                         </Box>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };

// export default CreatePost;
