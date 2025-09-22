const jwt = require('jsonwebtoken');

function createContext({ req }) {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production');
    } catch (error) {
      console.log('Invalid token:', error.message);
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    requireAuth: () => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return user;
    }
  };
}

function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    },
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    { expiresIn: '7d' }
  );
}

module.exports = {
  createContext,
  generateToken
};