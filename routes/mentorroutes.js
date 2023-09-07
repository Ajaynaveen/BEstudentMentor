const express = require('express');
const router = express.Router();
const { createMentor } = require('../controllers/mentorcontroller');
const { addStudentsToMentor } = require('../controllers/mentorcontroller');

// Add multiple students to a mentor
router.post('/add-students/:mentorId', addStudentsToMentor);


// Create a new Mentor
router.post('/mentors', createMentor);

module.exports = router;
