
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await prisma.utilisateur.count();
    const totalPosts = await prisma.post.count();
    const avgPostsPerUser = totalPosts / totalUsers;


    res.status(200).json({
      totalUsers,
      totalPosts,
      avgPostsPerUser
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getStatistics
};
