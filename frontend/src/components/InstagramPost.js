/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LongMenu from './MoreVerticalMenu';
import ImageAvatars from './avatar';


export default function InstagramPost() {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345, margin: 5,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <ImageAvatars/>
          {/* <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          /> */}
        </Box>
        <Typography fontWeight="lg">User</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
         <LongMenu/>
        </IconButton>
      </Box>
      <CardOverflow>
        <AspectRatio>
          <img src="/static/images/cards/yosemite.jpeg" alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
        <Box sx={{ width: 500, display: 'flex', justifyContent:'right', gap: 0.5 }}>
        <IconButton aria-label="Like">
          <ThumbUpIcon/>
        </IconButton>
        <IconButton aria-label="Dislike">
          <ThumbDownAltIcon />
        </IconButton>
        </Box>
      </Box>
      <Typography fontSize="sm">
        The React component library you always wanted
      </Typography>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        startDecorator="…"
        sx={{ color: 'text.tertiary' }}
      >
        more
      </Link>
      <Link
        component="button"
        underline="none"
        fontSize="10px"
        sx={{ color: 'text.tertiary', my: 0.5 }}
      >
        2 DAYS AGO
      </Link>
    </Card>
  );
}