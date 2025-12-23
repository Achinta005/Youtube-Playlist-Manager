const API_BASE = 'https://www.googleapis.com/youtube/v3';

// Fetch all playlists for a channel
async function getPlaylists(channelId, pageToken='') {
  const url = `${API_BASE}/playlists?part=snippet&channelId=${channelId}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}&key=${process.env.YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch playlists");
  return res.json();
}

// Fetch videos/items in a playlist
async function getPlaylistItems(playlistId, pageToken = '') {
  const url = `${API_BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${pageToken ? `&pageToken=${pageToken}` : ''}&key=${process.env.YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch playlist items");
  return res.json();
}

// Fetch detailed info for specific video IDs (e.g., duration, statistics)
async function getVideoDetails(videoIds) {
  const ids = Array.isArray(videoIds) ? videoIds.join(',') : videoIds;
  const url = `${API_BASE}/videos?part=snippet,contentDetails,statistics&id=${ids}&key=${process.env.YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch video details");
  return res.json();
}


module.exports = {
  getPlaylists,
  getPlaylistItems,
  getVideoDetails
};