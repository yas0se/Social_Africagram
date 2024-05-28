const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const followUser = async (req,res) => {
  const id = req.user.userId;
  const { userId } = req.params
  const follow = await prisma.follower.create({
    data : {
      follower_id:id,
      following_id:userId,
    }
  })
}

module.exports = {
  followUser
};