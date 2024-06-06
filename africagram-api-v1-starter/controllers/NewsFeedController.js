const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNewsfeed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const page = req.params.step || 0;
        const user = await prisma.utilisateur.findUnique({
            where: { id: userId },
            select: {
                Follower_Follower_following_idToUtilisateur: {
                    select: { follower_id: true }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const followingIds = user.Follower_Follower_following_idToUtilisateur.map(follower => follower.follower_id);
        const newsfeed = await prisma.post.findMany({
            where: {
                utilisateur_id: { in: [userId, ...followingIds] }
            },
            orderBy: {
                date_creation: 'desc'
            },
            take: 5,
            skip: 5 * page

        });

        res.json({ newsfeed });
    } catch (error) {
        console.error('Error fetching newsfeed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getNewsfeed
}