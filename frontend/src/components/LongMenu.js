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
    const token = sessionStorage.getItem('token');
  
    axios.patch(
      `${BACKEND}/post/${props.post.id}/unread`,
      {
        userId: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Post marked as unread');
        } else {
          console.error('Error marking post as unread:', response);
        }
      })
      .catch((error) => {
        console.error('Error marking post as unread:', error);
      });
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


  <MenuItem onClick={handleMarkAsRead}>Mark as read</MenuItem>
  <MenuItem onClick={handleMarkAsUnread}>Mark as unread</MenuItem>

            {props.post.userId == sessionStorage.getItem('userId') && (
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            )}
          </Menu>
        </div>
      );
    }