const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'newadmin@example.com' });
    if (adminExists) {
      console.log('Admin user already exists:', adminExists);
      await User.deleteOne({ email: 'newadmin@example.com' });
      console.log('Deleted existing admin user for re-seeding');
    }

    const hashedPassword = await bcrypt.hash('newpassword123', 10);
    const adminUser = new User({
      email: 'newadmin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created:', adminUser);
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();