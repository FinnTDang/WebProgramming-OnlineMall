const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// Render the contact page
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Handle form submissions
router.post('/', async (req, res) => {
  const { contact_purpose, contact_name, contact_email, contact_phone, contact_preference, contact_day, message } = req.body;

  // Create a new contact document
  const newContact = new Contact({
    contact_purpose,
    contact_name,
    contact_email,
    contact_phone,
    contact_preference,
    contact_day,
    message
  });

  try {
    // Save the contact document to the database
    await newContact.save();
    res.redirect('/contact'); // Redirect back to the contact page
  } catch (error) {
    console.error('Error saving contact information:', error);
    res.status(500).send('Error saving contact information.');
  }
});

module.exports = router;
