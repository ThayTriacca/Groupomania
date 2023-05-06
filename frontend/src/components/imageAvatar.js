import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UploadAndDisplayImage from "./UploadImages";

export default class ImageAvatars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      showAvatar: true,
    };
  }

  handleUpload = (value) => {
   
    this.setState({
      profilePicture: value,
      showAvatar: false
    }, () => {
      this.props.onChange(this.state.profilePicture);
    });
    console.log('Inside handleupload' + this.state.profilePicture);
  };

  render() {
    const { profilePicture, showAvatar } = this.state;
    const { username } = this.props;
    console.log("inside render - imageAvatar" + this.state.profilePicture);

    return (
      <div className="ProfileAvatar">
        {showAvatar && (
          <Stack direction="row" spacing={2}>
            <Avatar
              alt={username}
              src={`http://localhost:9000/api/auth/${profilePicture || "avatar.png"}`}
              sx={{ width: 56, height: 56 }}
              onError={(e) => {
                e.target.src = "avatar.png";
              }}
            />
          </Stack>
        )}
        <UploadAndDisplayImage name="profilePicture" value={profilePicture} onChange={this.handleUpload} />
      </div>
    );
  }
}