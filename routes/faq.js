const express = require('express');
const router = express.Router();
const faqData = require("../models/faq");

// Route to render the fees page
router.get('/', (req, res) => {
  const selectedCategory = req.query.category || faqData[0].category; // Default to the first category
  const selectedQuestion = req.query.question || null;

  // Find the selected category data
  const categoryData = faqData.find(cat => cat.category === selectedCategory);

  // Prepare questions for the selected category
  let questions = categoryData ? categoryData.questions : [];

  // Find the answer to the selected question if applicable
  let answer = null;
  if (selectedQuestion) {
      const questionData = questions.find(q => q.question === selectedQuestion);
      answer = questionData ? questionData.answer : null;
  }

  res.render('faq', {
      title: 'FAQs',
      categories: faqData,
      selectedCategory,
      questions,
      selectedQuestion,
      answer
  });
});

module.exports = router;
