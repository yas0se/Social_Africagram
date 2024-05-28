const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { caption } = req.body;

    // Create the post using the userId and caption
    const post = await prisma.post.create({
      data: {
        utilisateur_id: userId,
        caption: caption,
        id:uuidv4(),
        date_modification: new Date()
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { caption } = req.body;

    // Update the post if the userId matches the post's userId
    const updatedPost = await prisma.post.updateMany({
      where: {
        id: id,
        utilisateur_id: userId
      },
      data: {
        caption: caption
      }
    });

    if (updatedPost.count === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Delete the post if the userId matches the post's userId
    const deletedPost = await prisma.post.deleteMany({
      where: {
        id: id,
        utilisateur_id: userId
      }
    });

    if (deletedPost.count === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getPost = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Fetch the post if the userId matches the post's userId
      const post = await prisma.post.findMany({
        where: {
          utilisateur_id: userId
        }
      });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Fetch the post if the userId matches the post's userId
    const post = await prisma.post.findFirst({
      where: {
        id: id,
        utilisateur_id: userId
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPostById
};