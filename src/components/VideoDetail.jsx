import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { Typography, Box, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { Videos } from '../components'
import { fetchFromApi } from '../utils/fetchFromApi'

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideo = async () => {
      const data = await fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
      setVideoDetail(data.items[0])

      const videosData = await fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      setVideos(videosData.items)
    }
    fetchVideo();
  }, [id])
  
  if (!videoDetail?.snippet) return 'Loading...';
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount} } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row"}}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top:"86px"}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" />
          </Box>
          <Typography color="#FFF" variant="h5" fontWeight="bold" padding={2}> 
            { title }
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff"}} py={1} px={2}>
            <Link to={`/search/${channelId}`}>
              <Typography color="#FFF" variant={{ sm: "subtitle1", md: "h6"}}>
                {channelTitle}
                <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{ opacity: 0.7}}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7}}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box px={2} py={{md: 1, xs:5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail