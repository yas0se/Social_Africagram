const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminAuth = async (req,res,next) => {
    try {
        const {userId} = req.user
    const admin =  await prisma.utilisateur.findUnique({
        where: {
            id: userId
        }
    })
    if (!admin.isAdmin) return res.status(400).json({message:"You are not authorized to do this action"})
    next()
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

module.exports = adminAuth