// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import cheerio from 'cheerio';

const VideoUpload = () => {
//   const [videoDetails, setVideoDetails] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const extractVideoId = (url) => {
//     const regex = /(?<=v=|\/)[^&#?]+/;
//     return url.match(regex)[0];
//   };

//   const getVideoDetails = async (videoId) => {
//     try {
//       const response = await axios.get(`https://www.youtube.com/watch?v=${videoId}`);
//       console.log("wwdwddw",videoId)
//       const html = response.data;
//       const $ = cheerio.load(html);
//       const title = $('meta[name="title"]').attr('content');
//       const thumbnailUrl = $('link[rel="image_src"]').attr('href');
//       const duration = $('meta[itemprop="duration"]').attr('content');

//       setVideoDetails({ title, duration, thumbnailUrl });
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error(error);
//       setError('Error fetching video details'); // Set error state
//       setLoading(false); // Set loading to false even in case of an error
//     }
//   };

//   useEffect(() => {
//     const videoId = extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // replace with your video URL
//     getVideoDetails(videoId);
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <h1>{videoDetails.title}</h1>
//           <img src={videoDetails.thumbnailUrl} alt={videoDetails.title} />
//           <p>{videoDetails.duration}</p>
//         </div>
//       )}
//     </div>
//   );
};

export default VideoUpload;
