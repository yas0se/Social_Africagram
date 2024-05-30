const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    
    const { email, password, firstname, lastname } = req.body;
    const user = await prisma.utilisateur.create({
      data: {
        id:uuidv4(),
                firstname,
                lastname,
                email,
                password,
                isAdmin: false, // Assuming default value for isAdmin
                date_creation: new Date(), // Set current date and time
      },
    });
    res.json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password, firstname, lastname } = req.body;
    const user = await prisma.utilisateur.update({
      where: { id: userId },
      data: {
        email,
        password,
        firstname,
        lastname,
      },
    });
    res.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const {userId} = req.user
    console.log(userId)
    const admin =  await prisma.utilisateur.findUnique({
        where: {
            id: userId
        }
    })
    if (!admin.isAdmin) return res.status(400).json({message:"You are not authorized to do this action"})
    const users = await prisma.utilisateur.findMany();
    res.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.utilisateur.findUnique({
      where: { id: userId },
    });
    res.json({ user });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(404).json({ error: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await prisma.utilisateur.delete({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.utilisateur.update({
      where: { id: userId },
      data: {
        isAdmin: true,
      },
    });
    res.json({ user });
  } catch (error) {
    console.error('Error making admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUserById,
  deleteUser,
  makeAdmin,
};
