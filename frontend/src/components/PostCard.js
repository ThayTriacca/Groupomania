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

  //Initializing user state and formatting post date
  const [user, setUser] = useState(null);
  const postDate = new Date(props.post.createdAt);
  const onlyDate = `${postDate.getDate()}-${postDate.getMonth() + 1}-${postDate.getFullYear()}`;

  //Fetching user data using useEffect hook when component is mounted
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const userResponse = await fetch(`${BACKEND}/auth/${props.post.userId}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData); 
        } else {
          console.error('Error fetching user data:', userResponse.statusText);
        }
      
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchPostData();
  }, []);

  //Rendering the PostCard component
  return (
    <Card sx={{ minWidth: 300, margin: 5 }}>
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
        <LongMenu post={props.post}/>
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