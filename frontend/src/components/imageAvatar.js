import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UploadProfileAndDisplayImage from "./UploadProfileImage";
import { useEffect } from "react";
import { BACKEND } from "../global";

export default class ImageAvatars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      showAvatar: true,
    };
  }

  componentDidMount(){ 
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`${BACKEND}/auth/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          this.state.profilePicture = userData.profilePicture;
        } else {
          console.error('Erro ao buscar dados do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }
 

  handleUpload = (value) => {
   // Update the state with the uploaded profile picture and hide the avatar
    this.setState({
      profilePicture: value,
      showAvatar: false
    }, () => {
      // Call the onChange callback prop and pass the profile picture value
      this.props.onChange(this.state.profilePicture);
    });
  };


  render() {
    const { profilePicture, showAvatar } = this.state;
    const { username } = this.props;

    console.log('profile picture', profilePicture);
    const image = profilePicture || "http://localhost:9000/images/avatar.png";
    return (
      <div className="ProfileAvatar">
        {showAvatar && (
          <Stack direction="row" spacing={2}>
            <Avatar
              alt={username}
              src={image}
              sx={{ width: 56, height: 56 }}
              onError={(e) => {
                // If there's an error loading the image, set the source to a default avatar image
                e.target.src = "avatar.png";
              }}
            />
          </Stack>
        )}
        <UploadProfileAndDisplayImage  name="profilePicture" value={profilePicture} onChange={this.handleUpload} />
      </div>
    );
  }
}