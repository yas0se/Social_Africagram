const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");


const createPostLike = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    // Check if the user has already liked the post
    const existingLike = await prisma.aime.findFirst({
      where: {
        utilisateur_id: userId,
        post_id: postId
      }
    });

    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this post' });
    }

    // Create the post like
    const like = await prisma.aime.create({
      data: {
        utilisateur_id: userId,
        post_id: postId,
        id: uuidv4()
      }
    });

    res.status(201).json(like);
  } catch (error) {
    console.error('Error creating post like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletePostLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Delete the post like if the userId matches the like's userId
    const deletedLike = await prisma.aime.deleteMany({
      where: {
        id: id,
        utilisateur_id: userId
      }
    });

    if (deletedLike.count === 0) {
      return res.status(404).json({ error: 'Post like not found' });
    }

    res.status(200).json({ message: 'Post like deleted' });
  } catch (error) {
    console.error('Error deleting post like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPostLike = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the post likes for the user
    const likes = await prisma.aime.findMany({
      where: {
        utilisateur_id: userId
      },
      include: {
        Post: true
      }
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error('Error fetching post likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPostLike,
  deletePostLike,
  getPostLike
};
