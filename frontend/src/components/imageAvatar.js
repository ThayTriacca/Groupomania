import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars(props) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                alt={props.username}
                src={`http://localhost:3000/media/${props.profilePicture}`}
                sx={{ width: 56, height: 56 }}
            />
        </Stack>
    );
}