const express = require('express');
require('dotenv').config();
const authenticateToken = require('./utils/jwt');
// Import route files
const authRoutes = require('./routes/AuthRoutes')
const commentRoutes = require('./routes/CommentRoutes');
const postRoutes = require('./routes/PostRoutes');
const followerRoutes = require('./routes/FollowerRoutes');
const newsfeedRoutes = require('./routes/NewsFeedRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const statisticsRoutes = require('./routes/StatisticsRoutes');
const userRoutes = require('./routes/UserRoutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define routes
app.use('/',authRoutes)
app.use('/api/comments', authenticateToken, commentRoutes);
app.use('/api/posts', authenticateToken, postRoutes);
app.use('/api/followers', authenticateToken, followerRoutes);
app.use('/api/newsfeed', authenticateToken, newsfeedRoutes);
app.use('/api/profiles', authenticateToken, profileRoutes);
app.use('/api/statistics', authenticateToken, statisticsRoutes);
app.use('/api/users', authenticateToken, userRoutes);

const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});