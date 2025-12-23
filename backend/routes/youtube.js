const express = require('express');
const router = express.Router();

const { getPlaylists, getPlaylistItems, getVideoDetails } = require('../lib/youtube');

router.get('/playlists', async (req, res) => {
  const channelId = req.query.channelId;
  const pageToken = req.query.pageToken || '';
  if (!channelId) {
    return res.status(400).json({ error: 'Missing channelId parameter' });
  }
  try {
    const data = await getPlaylists(channelId, pageToken);
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch playlists via server!', error);
    res.status(500).json({ error: 'Failed to fetch playlists data' });
  }
});

router.get('/playlistItems', async (req, res) => {
  const playlistId = req.query.playlistId;
  const pageToken = req.query.pageToken || '';
  if (!playlistId) {
    return res.status(400).json({ error: 'Missing playlistId parameter' });
  }
  try {
    const data = await getPlaylistItems(playlistId, pageToken);
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch playlist items via server!', error);
    res.status(500).json({ error: 'Failed to fetch playlist items data' });
  }
});

router.get('/videoDetails', async (req, res) => {
  const videoIds = req.query.videoIds;
  if (!videoIds) {
    return res.status(400).json({ error: 'Missing videoIds parameter' });
  }
  try {
    const data = await getVideoDetails(videoIds);
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch video details via server!', error);
    res.status(500).json({ error: 'Failed to fetch video details data' });
  }
});

module.exports = router;
