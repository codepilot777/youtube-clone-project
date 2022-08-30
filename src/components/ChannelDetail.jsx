import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material';

import { Videos, ChannelCard } from '../components'
import { fetchFromApi } from '../utils/fetchFromApi';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromApi(`channels?part=snippet&id=${id}`)
      setChannelDetail(data?.items[0])

      const videosData = await fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      setVideos(videosData?.items)
      
    }
    fetchResults();
  }, [id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={ { background: 'rgb(2,0,36)',
background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', zIndex:10, height:'300px' }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{
          mr: {
            sm: "100px"
          }
        }}> 
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  )
}

export default ChannelDetail