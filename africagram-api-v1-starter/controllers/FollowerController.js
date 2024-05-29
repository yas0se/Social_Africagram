const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {v4:uuidv4} = require("uuid")

const followUser = async (req, res) => {
  try {
    // Get the current user's ID from the request
    const userId = req.user.userId;

    // Get the ID of the user to be followed from the request parameters
    const { id } = req.params;
    if(id === userId) {
      return res.status(400).json({ error: 'You cant follow yourself' });

    }
    // Check if the current user is already following the specified user
    const existingFollow = await prisma.follower.findFirst({
      where: {
        follower_id: id,
        following_id: userId,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Create a new follower record
    const newFollower = await prisma.follower.create({
      data: {
        id: uuidv4(),
        follower_id: id,
        following_id: userId,
  
        date_creation: new Date(), // Set current date and time
      },
    });
    const user =  await prisma.utilisateur.findUnique({
      where: {
        id: userId
      }
    })
    const followedUser = await prisma.utilisateur.findUnique({
      where: {
        id : id
      }
    })
    const followers = await prisma.follower.count({
      where: {
        follower_id : id
      }
    });
    const following = await prisma.follower.count({
      where: {
        following_id: userId
      }
    })
      const updatedUser = await prisma.utilisateur.update({
        where: {
          id: userId
        },
        data: {
          totalFollowing: following
        }
      });
      const updatedFollowedUser = await prisma.utilisateur.update({
        where : {
          id: id
        },
        data : {
          totalFollower: followers,

        }
      })
    res.status(201).json({ message: 'User followed successfully', follower: newFollower });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const unfollowUser =  async (req,res) => {

}
module.exports = {
  followUser
};