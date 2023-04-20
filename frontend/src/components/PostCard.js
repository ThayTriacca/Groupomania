import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LongMenu from './MoreVerticalMenu'

export default function PostCard(props) {
  
  return (
  //  props.post.
    <Card sx={{ maxWidth: 345, margin:5}}>
      <CardHeader
        
      
        // avatar={
        //   /*<Avatar sx={{ bgcolor: blue[500] }} aria-label="user">
        //     R
        //   </Avatar>*/
        // }
        action={
          <LongMenu/>
        }
        subheader={props.post.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.post.media}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}