import React, { Component } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ImageAvatars from '../components/imageAvatar';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import '../styles/Profile.css';
import { BACKEND } from '../global';
import UploadAndDisplayImage from '../components/UploadImages';
import axios from 'axios';
import avatarImage from '../components/imageAvatar';

export default class Profile extends Component {
    constructor(props) {
        super(props);

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
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };    

    handleSubmit = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
    
        const formData = new FormData();
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
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
                    }}/>
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
                      Edit Profile
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
    
//         this.token = sessionStorage.getItem('token');
//         this.userId = sessionStorage.getItem('userId');
//         this.handleImageChange = this.handleImageChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
//     }

//     componentDidMount() {
//         this.fetchUserData();
//     }

//     async fetchUserData() {
//         try {
//             const response = await fetch(`${BACKEND}/auth/${this.userId}`, {
//                 method: 'GET',
//                 credentials: 'include',
//                 withCredentials: true,
//                 headers: {
//                     'Authorization': `Bearer ${this.token}`
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 this.setState({
//                     userData: data,
//                     firstName: data.firstName,
//                     lastName: data.lastName,
//                     email: data.email,
//                     profilePicture: data.profilePicture,
//                 });
//             } else {
//                 console.error('Failed to fetch user data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Failed to fetch user data:', error);
//         }
//     }

//     handleImageChange(event) {
//         const file = event.target.files[0];
//         this.setState({
//           profilePicture: file,
//         });
//       }

//     async handleSubmit(event) {
//         event.preventDefault();
//         const token = sessionStorage.getItem('token');
    
//         try {
//             const formData = new FormData();
//             formData.append('firstName', this.state.firstName);
//             formData.append('lastName', this.state.lastName);
//             formData.append('email', this.state.email);
//             if (this.state.profilePicture) {
//                 formData.append('image', this.state.profilePicture);
//             }
    
//             await axios.post(`${BACKEND}/auth/${this.userId}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
    
//             console.log('Profile updated successfully!');
//         } catch (error) {
//             console.error('Failed to update profile:', error);
//         }
//     }
    
//     async handleDeleteProfile() {
//         try {
//             const response = await fetch(`${BACKEND}/auth/${this.userId}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//                 withCredentials: true,
//                 headers: {
//                     'Authorization': `Bearer ${this.token}`
//                 }
//             });

//             if (response.ok) {
//                 console.log('Profile deleted successfully!');
//                 sessionStorage.removeItem('userId');
//                 sessionStorage.removeItem('token');
//                 sessionStorage.removeItem('firstName');
//                 window.location.href = '/login';
//             } else {
//                 console.error('Failed to delete profile:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Failed to delete profile:', error);
//         }
//     }

//     render() {
//         const { userData, firstName, lastName, email } = this.state;
      
//         return (
//           <div className="ProfilePage">
//             <ResponsiveAppBar />
//             <div className='ProfileCard'>
//                 <form onSubmit={this.handleSubmit}>
//               <div className='ProfileAvatar'>
//                 <ImageAvatars />
//                 <UploadAndDisplayImage onChange={(value)=> {
//                   this.setState({profilePicture: value});
//                 }} />
//               </div>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   '& .MuiTextField-root': { width: '50ch' },
//                   alignItems: 'center',
//                 }}
//               >
//                     console.log('Estou dentro do form' + profilePicture);
//                   <div className='ProfileForm'>
//                     <h2>Profile de {userData && userData.firstName}</h2>
//                     <TextField
//                       autoComplete="given-name"
//                       name="firstName"
//                       required
//                       fullWidth
//                       id="firstName"
//                       label="First Name"
//                       value={firstName}
//                       onChange={(e) => this.setState({firstName: e.target.value})}
//                       autoFocus
//                     />
//                     <TextField
//                       required
//                       fullWidth
//                       id="lastName"
//                       label="Last Name"
//                       name="lastName"
//                       autoComplete="family-name"
//                       value={lastName}
//                       onChange={(e) => this.setState({lastName: e.target.value})}
//                     />
//                     <TextField
//                       required
//                       fullWidth
//                       id="email"
//                       label="Email Address"
//                       name="email"
//                       autoComplete="email"
//                       value={email}
//                       onChange={(e) => this.setState({email: e.target.value})}
//                     />
//                   </div>
//                   <div className='ProfileButtons'>
//                     <Button variant="contained" color="primary" type="submit">
//                       Edit Profile
//                     </Button>
//                     <Button variant="contained" color="primary" onClick={this.handleDeleteProfile}>
//                       Delete Profile
//                     </Button>
//                   </div>
//                 </form>
//               </Box>
//             </div>
//           </div>
//         );
//       };
      
// }



//-------------CODIGO ANTIGO-----------------
// import React, { useEffect, useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import Box from '@mui/material/Box';
// import ImageAvatars from '../components/imageAvatar';
// import ResponsiveAppBar from '../components/ResponsiveAppBar';
// import '../styles/Profile.css';
// import { BACKEND } from '../global';
// import UploadAndDisplayImage from '../components/UploadImages';

// export default function Profile(props) {
//     const [userData, setUserData] = useState(null);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [profilePicture, setProfilePicture] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);

//     const token = sessionStorage.getItem('token');
//     const userId = sessionStorage.getItem('userId');

//     const handleImageChange = (event) => {
//         console.log(event.target.files[0]);
//         setSelectedImage(event.target.files[0]);
//         if(event.target && event.target.files && event.target.files[0]){
//           props.onChange(event.target.files[0]);
//         }
     
//       }

//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const response = await fetch(`${BACKEND}/auth/${userId}`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     withCredentials: true,
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setUserData(data);
//                     setFirstName(data.firstName);
//                     setLastName(data.lastName);
//                     setEmail(data.email);
//                     setProfilePicture(data.profilePicture);
//                 } else {
//                     console.error('Failed to fetch user data:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch user data:', error);
//             }
//         }

//         fetchUserData();
//     }, [userId, token]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append('firstName', firstName);
//             formData.append('lastName', lastName);
//             formData.append('email', email);
//             formData.append('password', password);
//             if (this.state.profilePicture) {
//                 formData.append('image', this.state.profilePicture);
//             }
            
//             const response = await fetch(`${BACKEND}/auth/${userId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 credentials: 'include',
//                 body: formData
//             });
    
//             if (response.ok) {
//                 console.log('Profile updated successfully!');
//             } else {
//                 console.error('Failed to update profile:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Failed to update profile:', error);
//         }
//     };
    

    
//     const handleDeleteProfile = async () => {
//         try {
//             const response = await fetch(`${BACKEND}/auth/${userId}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//                 withCredentials: true,
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
            
//             if (response.ok) {
//                 console.log('Profile deleted successfully!');
//                 sessionStorage.removeItem('userId');
//                 sessionStorage.removeItem('token');
//                 sessionStorage.removeItem('firstName');
//                 window.location.href = '/login';
//             } else {
//                 console.error('Failed to delete profile:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Failed to delete profile:', error);
//         }
//     };
    
    
//     return (
//         <div className="ProfilePage">
//             <ResponsiveAppBar />
//             <div className='ProfileCard'>
//                 <div className='ProfileAvatar'>
//                     <ImageAvatars />
//                     {/* <input type="file" onChange={handleImageChange}/> */}
//                     <UploadAndDisplayImage onChange={(value)=> {
//                                 this.setState({profilePicture: value});
//                             }} />
//                 </div>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         '& .MuiTextField-root': { width: '50ch' },
//                         alignItems: 'center',
//                     }}
//                     >
//                     <form onSubmit={handleSubmit}>
//                         <div className='ProfileForm'>
//                             <h2>Profile de {userData && userData.firstName}</h2>

//                             {/* <Grid container spacing={2}>
//                             <Grid item xs={12}> */}
//                             <TextField
//                                 autoComplete="given-name"
//                                 name="firstName"
//                                 required
//                                 fullWidth
//                                 id="firstName"
//                                 label="First Name"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 autoFocus
//                                 />
//                             {/* </Grid>
//                             <Grid item xs={12}> */}
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="lastName"
//                                 label="Last Name"
//                                 name="lastName"
//                                 autoComplete="family-name"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 />
//                             {/* </Grid>
//                             <Grid item xs={12}> */}
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             {/* </Grid>
//                             <Grid item xs={12}> */}
//                             <TextField
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="new-password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             {/* </Grid>
//                         </Grid> */}
//                         </div>
//                         <div className='ProfileButtons'>
//                             <label htmlFor="contained-button-file">
//                             <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
//                                     Edit Profile
//                                 </Button>
//                             </label>
//                             <label htmlFor="contained-button-file">
//                                 <Button variant="contained" color="primary" component="span" onClick={handleDeleteProfile}>
//                                     Delete Profile
//                                 </Button>
//                             </label>
//                         </div>
//                     </form>
//                 </Box>
//             </div>
//         </div>
//     )
// };

// const uploadImage = async () => {
//     try {
//         const formData = new FormData();
//         formData.append('profilePicture', profilePicture);
//         const response = await fetch(`${BACKEND}/auth/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             credentials: 'include',
//             body: formData
//         });

//         if (response.ok) {
//             const data = await response.json();
//             setUserData({
//                 ...userData,
//                 profilePicture: data.profilePicture
//             });
//             console.log('Profile picture updated!');
//         } else {
//             console.log('Failed to upload:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Failed to upload 1:', error);
//     }
// }