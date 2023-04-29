// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';


import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UploadAndDisplayImage from "./UploadImages";

export default class ImageAvatars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      showAvatar: true // estado inicial verdadeiro
    };
  }

  handleUpload = (value) => {
    this.setState({
      profilePicture: value,
      showAvatar: false // atualiza o estado para falso
    });
  };

  render() {
    const { profilePicture, showAvatar } = this.state;
    return (
      <div className="ProfileAvatar">
        {showAvatar ? ( // verifica se showAvatar é verdadeiro
          <Stack direction="row" spacing={2}>
            <Avatar
              alt={this.props.username}
              src={profilePicture ? `http://localhost:9000/images/${profilePicture}` : "avatar.png"} // usa a imagem do perfil ou avatar.png se profilePicture for nulo ou indefinido
              sx={{ width: 56, height: 56 }}
            />
          </Stack>
        ) : null}
        <UploadAndDisplayImage onChange={this.handleUpload} />
      </div>
    );
  }
}
