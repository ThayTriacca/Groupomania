import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LongMenu from './LongMenu'
import { Avatar } from '@mui/material';
import { BACKEND } from '../global';

export default function PostCard(props) {
  const [user, setUser] = useState(null);
  const postDate = new Date(props.post.createdAt);
  const onlyDate = `${postDate.getDate()}-${postDate.getMonth() + 1}-${postDate.getFullYear()}`;


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const userResponse = await fetch(`${BACKEND}/auth/${props.post.userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.table('users ',userData );
          setUser(userData); 
        } else {
          console.error('Erro ao buscar dados do usuário:', userResponse.statusText);
        }
      
      } catch (error) {
        console.error('Erro ao buscar dados: ', error);
      }
    };
  
    fetchPostData();
  }, []);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`${BACKEND}/auth/${props.post.userId}`);
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUser(userData);
  //         setFirstNameInitial(userData.firstName.charAt(0).toUpperCase());
  //       } else {
  //         console.error('Erro ao buscar dados do usuário:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Erro ao buscar dados do usuário:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <Card sx={{ maxWidth: 500, margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar
        alt="User Profile"
        src={user?.profilePicture || ""}
        title={user?.firstName || ""}
      >
        {user?.profilePicture == null || user?.profilePicture == ''? (
          user?.firstName.charAt(0).toUpperCase()
        ) : (
          <Avatar
            alt="User Profile"
            src={user?.profilePicture}
          />
        )}
      </Avatar>
    }
    action={
      <div>
        <Typography fontWeight="lg">{user && user.firstName}</Typography>
        <LongMenu />
      </div>
    }
  />
      {props.post && props.post.imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={props.post.imageUrl}
        
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.content}
        </Typography>
      </CardContent>
      <CardHeader
        subheader={
          <Typography variant="subtitle2" sx={{ className: 'subheader' }}>
            {onlyDate}
          </Typography>
        }
      />
    </Card>
  );
}