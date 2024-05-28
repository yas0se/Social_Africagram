const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProfile = async (req, res) => {
  try {
    console.log("creating profile")
    const userId = req.user.userId;
    const { sexe, pays, ville } = req.body;

    // Create the profile using the userId and other profile data
    const profile = await prisma.profile.create({
      data: {
        id_utilisateur: userId,
        sexe: sexe,
        pays: pays,
        ville: ville
      }
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sexe, pays, ville } = req.body;
    console.log({userId,sexe,pays,ville})
    // Update the profile if the userId matches the profile's userId
    const updatedProfile = await prisma.profile.updateMany({
      where: {
        id_utilisateur: userId
      },
      data: {
        sexe: sexe,
        pays: pays,
        ville: ville
      }
    });

    if (updatedProfile.count === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the profile for the user
    const profile = await prisma.profile.findUnique({
      where: {
        id_utilisateur: userId
      }
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Fetch the profile if the userId matches the profile's userId
    const profile = await prisma.profile.findFirst({
      where: {
        id: id,
        id_utilisateur: userId
      }
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  getProfileById
};