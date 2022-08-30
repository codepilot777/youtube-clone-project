import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material';

import { demoChannelTitle, demoChannelUrl } from '../utils/constants';

const ChannelCard = ({channelDetail, marginTop}) => {
  return (
    <Box 
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        width: {
          md: '320px',
          xs: '356px'
        },
        justifyContent: 'center',
        alignItems: 'center',
        height: '326px',
        margin: 'auto',
        marginTop
      }}
      >
      <Link to={`/channel/${channelDetail?.snippet?.channelId}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textAlign: 'center', color: '#fff'}}>
          <CardMedia 
            image={channelDetail?.snippet?.thumbnails?.high?.url || demoChannelUrl}
            alt={channelDetail?.snippet?.title}
            sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
            >
          </CardMedia>
          <Typography variant="h6">
            { channelDetail?.snippet?.title || demoChannelTitle }
            <CheckCircle sx={{ fontSize:14, color: 'gray', ml:'5px'}}/>
          </Typography>
          <Typography>
            {
              channelDetail?.statistics?.subscriberCount && (
                <Typography>
                  {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
                </Typography>
              )
            }
          </Typography>
        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard