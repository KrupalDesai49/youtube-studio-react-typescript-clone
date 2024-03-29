// import React from 'react'

// const Content = () => {
//   return (
//     <div className="">
      
//     </div>
//   )
// }

// export default Content



import axios from 'axios';
import { useEffect, useState } from 'react';

interface VideoDetails {
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
    standard: { url: string };
  };
  duration: string;
}

const Content = () => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  // const videoId = 'lCx9hBR5kTs'; // Replace with the actual video ID
  const videoId = 'oKIThIihv60'; // Replace with the actual video ID
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY; // Replace with your actual API key

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`);
        const videoInfo = response.data.items[0];
        const snippet = videoInfo.snippet;
        const contentDetails = videoInfo.contentDetails;
        
        const title = snippet.title;
        const description = snippet.description;
        const thumbnails = snippet.thumbnails;
        const duration = contentDetails.duration; // You will need to convert this ISO  8601 duration to a human-readable format

        console.log(snippet )
        // console.log(snippet,response.data,videoInfo,contentDetails)
        setVideoDetails({
          title,
          description,
          thumbnails,
          duration,
        });
      } catch (error) {
        console.error('Failed to fetch video details:', error);
      }
    };

    fetchVideoDetails();
  }, []);

  return (
    <div className='overflow-y-scroll'>
      {videoDetails ? (
        <div >
        thumbnails
        <div className=' '>
          <img src={videoDetails.thumbnails.standard.url}  className="= " alt={videoDetails.title} />cover
          </div>
          title
          <h2>{videoDetails.title}</h2>
          description
          <pre className=' whitespace-pre-wrap shrink'>{videoDetails.description}</pre>
          duration
          <p>Duration: {videoDetails.duration}</p>
        </div>
      ) : (
        <p>Loading video details...</p>
      )}
    </div>
  );
};

export default Content;

