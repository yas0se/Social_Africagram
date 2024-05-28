const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFollower = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { followingId } = req.body;

    // Check if the user is not trying to follow themselves
    if (userId === followingId) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    // Create the follower relationship
    const follower = await prisma.follower.create({
      data: {
        following_id: followingId,
        follower_id: userId
      }
    });

    res.status(201).json(follower);
  } catch (error) {
    console.error('Error creating follower:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFollower = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Delete the follower if the userId matches the follower's userId
    const deletedFollower = await prisma.follower.deleteMany({
      where: {
        id: id,
        follower_id: userId
      }
    });

    if (deletedFollower.count === 0) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    res.status(200).json({ message: 'Follower deleted' });
  } catch (error) {
    console.error('Error deleting follower:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFollower = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the followers for the user
    const followers = await prisma.follower.findMany({
      where: {
        follower_id: userId
      },
      include: {
        Utilisateur_Follower_following_idToUtilisateur: true
      }
    });

    res.status(200).json(followers);
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFollowerById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Fetch the follower if the userId matches the follower's userId
    const follower = await prisma.follower.findFirst({
      where: {
        id: id,
        follower_id: userId
      },
      include: {
        Utilisateur_Follower_following_idToUtilisateur: true
      }
    });

    if (!follower) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    res.status(200).json(follower);
  } catch (error) {
    console.error('Error fetching follower:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createFollower,
  deleteFollower,
  getFollower,
  getFollowerById
};