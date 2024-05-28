const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");


const login = async (req, res) => {
  try {
    // User object is attached to the request by the comparePassword middleware
    const user = req.user; 

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token: token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const register = async (req, res) => {
  console.log("register")
    const { firstname, lastname, email, password } = req.body;

    try {
        const userExists = await prisma.utilisateur.findUnique({
          where : {
            email:email
          }
        })
        if(userExists) return res.status(500).json({ error: "user already exists" });

        const register = await prisma.utilisateur.create({
            data: {
                id:uuidv4(),
                firstname,
                lastname,
                email,
                password,
                isAdmin: false, // Assuming default value for isAdmin
                date_creation: new Date(), // Set current date and time
            }
        });

        res.status(200).json({ message: "User registered successfully", user: register });
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: "Failed to register user" });
    }
}


const logout = (req,res) => {
    
} 

module.exports = {
    login,
    register,
    logout
}