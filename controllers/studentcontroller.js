const Student = require('../models/student');
const Mentor=require('../models/mentor')

// Create a new Student
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Assign a Student to a Mentor
const assignStudentToMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const mentorId = req.params.mentorId;

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the student already has a mentor
    if (student.mentor) {
      return res.status(400).json({ error: 'Student already has a mentor' });
      // or optionally, reassign the student to the new mentor
      // student.mentor = mentorId;
    }

    // Find the mentor by ID
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Assign the mentor to the student
    student.mentor = mentorId;

    // Save the updated student document
    await student.save();

    res.status(200).json({ message: 'Student assigned to Mentor successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const changementor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const {mentorId} = req.body;
    console.log(mentorId)

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the student already has a mentor
    if (!student.mentor) {
      return res.status(400).json({ error: 'Student does not  have a mentor' });
      // or optionally, reassign the student to the new mentor
      // student.mentor = mentorId;
    }
    student.previousMentors.push(student.mentor);
    // Find the mentor by ID
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Assign the mentor to the student
    student.mentor = mentorId;

    // Save the updated student document
    await student.save();

    res.status(200).json({ message: 'Student assigned to Mentor changed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAvailableStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });

    res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getStudentsForMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    // Find all students with the given mentorId
    const students = await Student.find({ mentor: mentorId });

    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getPreviousMentor = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get the last previous mentor from the array
    const previousMentors = student.previousMentors;
    const lastPreviousMentor = previousMentors[previousMentors.length - 1];

    res.status(200).json(previousMentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { createStudent, assignStudentToMentor,getAvailableStudents,changementor,getStudentsForMentor,getPreviousMentor
 };
