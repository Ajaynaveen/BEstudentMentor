const express = require('express');
const router = express.Router();
const { createStudent, assignStudentToMentor,getAvailableStudents, changementor,getStudentsForMentor,getPreviousMentor } = require('../controllers/studentcontroller');

// Create a new Student
router.post('/students', createStudent);


router.post('/assign-mentor/:studentId/:mentorId', assignStudentToMentor);
router.put('/assign-mentor/:studentId/', changementor);

router.get('/availablestudents',getAvailableStudents)
router.get('/getstudents/:mentorId',getStudentsForMentor)
router.get('/previousmentor/:id', getPreviousMentor);


module.exports = router;

