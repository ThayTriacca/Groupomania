import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LongMenu from "./LongMenu";
import { Avatar } from "@mui/material";
import { BACKEND } from "../global";
import '../styles/PostCard.css';


export default function PostCard(props) {
  //Initializing user state and formatting post date
  const [user, setUser] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const [isRead, setIsRead] = useState(props.post.readby && props.post.readby.includes(userId));
  const postDate = new Date(props.post.createdAt);
  const onlyDate = `${postDate.getDate()}-${postDate.getMonth() + 1
    }-${postDate.getFullYear()}`;

  //Fetching user data using useEffect hook when component is mounted
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const userResponse = await fetch(
          `${BACKEND}/auth/${props.post.userId}`
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error("Error fetching user data:", userResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPostData();
  }, []);

  //Rendering the PostCard component
  return (
    <div className="post_card">
      <div className="post_header">
      {!isRead && (
  <span className="unread">New</span>
)}
        <div className="post_owner_avatar">
          {
            <Avatar
              alt="User Profile"
              src={user?.profilePicture || ""}
              title={user?.firstName || ""}
            >
              {user?.profilePicture == null || user?.profilePicture == "" ? (
                user?.firstName.charAt(0).toUpperCase()
              ) : (
                <Avatar alt="User Profile" src={user?.profilePicture} />
              )}
            </Avatar>
          }
        </div>
        <div className="post_owner_name">
          <Typography fontWeight="lg">{user && user.firstName}</Typography>
        </div>
        <div className="post_longmenu">
        <LongMenu post={props.post} setIsRead={setIsRead} />
        </div>
      </div>
      <div className="post_body">
        <div className="post_media">
          {props.post && props.post.imageUrl && (
            <CardMedia
              component="img"
              height="194"
              image={props.post.imageUrl}

            />
          )}
        </div>

        <div className="post_content">
          <Typography variant="body2" color="text.secondary">
            {props.post.content}
          </Typography>
        </div>
        <div className="post_date">
          <Typography sx={{ className: "subheader" }}>{onlyDate}</Typography>
        </div>
      </div>
    </div>
  );
}
