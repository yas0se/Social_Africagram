const express = require('express');
require('dotenv').config();
const app = express();

// Import route files
const authRoutes = require('./controllers/AuthController')
const commentRoutes = require('./routes/CommentRoutes');
const postRoutes = require('./routes/PostRoutes');
const followerRoutes = require('./routes/FollowerRoutes');
const newsfeedRoutes = require('./routes/NewsFeedRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const statisticsRoutes = require('./routes/StatisticsRoutes');
const userRoutes = require('./routes/UserRoutes');

// Define routes
app.use('/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/followers', followerRoutes);
app.use('/api/newsfeed', newsfeedRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/users', userRoutes);

const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});