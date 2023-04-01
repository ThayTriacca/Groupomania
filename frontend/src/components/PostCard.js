import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LongMenu from './MoreVerticalMenu'

export default function PostCard() {
  return (
    <Card sx={{ maxWidth: 345, margin:5}}>
      <CardHeader
        
      
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="user">
            R
          </Avatar>
        }
        action={
          <LongMenu/>
        }
        
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like">
          <ThumbUpIcon/>
        </IconButton>
        <IconButton aria-label="Dislike">
          <ThumbDownAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}