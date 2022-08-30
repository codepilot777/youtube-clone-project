import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography } from '@mui/material';
import { Videos } from '../components'

import { fetchFromApi } from '../utils/fetchFromApi';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const data = await fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      setVideos(data.items)
    }
    fetchSearch();
  }, [searchTerm])

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2}}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white"}}>
        Search Results for: <span style={{ color: "#f31503"}}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed