require('dotenv').config();
const express = require('express');
const authenticateToken = require('./errors/unauthenticated');
const cors = require('cors');
const port = process.env.APP_PORT || 8000;
// Import route files
const authRoutes = require('./routes/AuthRoutes')
const commentRoutes = require('./routes/CommentRoutes');
const postRoutes = require('./routes/PostRoutes');
const likesRoutes = require('./routes/LikesRoutes');
const followerRoutes = require('./routes/FollowerRoutes');
const newsfeedRoutes = require('./routes/NewsFeedRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const statisticsRoutes = require('./routes/StatisticsRoutes');
const userRoutes = require('./routes/UserRoutes');
const { notFound } = require('./errors/not-found');
const { serverError } = require('./errors/index');
const adminAuth = require('./errors/unauthorized');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Define routes
app.use('/',authRoutes)
app.use('/api/comments', authenticateToken, commentRoutes);
app.use('/api/posts', authenticateToken, postRoutes);
app.use('/api/likes', authenticateToken, likesRoutes);
app.use('/api/followers', authenticateToken, followerRoutes);
app.use('/api/newsfeed', authenticateToken, newsfeedRoutes);
app.use('/api/profiles', authenticateToken, profileRoutes);
app.use('/api/statistics', authenticateToken, statisticsRoutes);
app.use('/api/users', authenticateToken,adminAuth, userRoutes);
app.use(notFound);
app.use(serverError);
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}....`);
});
