import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BACKEND } from '../global';
import axios from 'axios';

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const token = sessionStorage.getItem('token');

    axios.delete(`${BACKEND}/post/${props.post.id}/`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Post deleted successfully');
        } else {
          window.location = '/main';
          console.log('Error deleting post:', response.statusText);
        }
      })
      .catch((error) => {
        console.log('Error deleting:', error.message);
      });
  };

  const handleMarkAsRead = () => {
    const token = sessionStorage.getItem('token');
    console.log('markasread token eh ' + token);
    const userId = sessionStorage.getItem('userId');
  
    axios.patch(`${BACKEND}/post/${props.post.id}/read`, {
      userId: userId
    }, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Post marked as read successfully');
      })
      .catch((error) => {
        console.log('Error marking post as read:', error.message);
      });
  };
  
  

  const handleMarkAsUnread = () => {
    const userId = sessionStorage.getItem('userId');

    if (Array.isArray(props.post.readby) && props.post.readby.includes(parseInt(userId))) {
      axios.patch(`${BACKEND}/post/${props.post.id}/unread `, {
        readby: [],
        userId: userId,
      }, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Post marked as unread');
          } else {
            console.log('Error marking post as unread:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error marking post as unread:', error);
        });
    }
  };

  return (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
{props.post.readby && props.post.readby.includes(parseInt(sessionStorage.getItem('userId'))) ? (
  console.log('Post already marked as read by user'),
  <MenuItem onClick={handleMarkAsUnread}>Mark as Unread</MenuItem>
) : (
  <MenuItem onClick={handleMarkAsRead}>Mark as Read</MenuItem>
)}

    
            {props.post.userId == sessionStorage.getItem('userId') && (
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            )}
          </Menu>
        </div>
      );
    }