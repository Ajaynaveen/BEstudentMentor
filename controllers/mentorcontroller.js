const Mentor=require('../models/mentor')
const Student=require('../models/student')

// Create a new Mentor
const createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json({ message: 'Mentor created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addStudentsToMentor = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const { studentIds } = req.body; // Expect an array of student IDs in the request body
    console.log('student ids', studentIds );

    // Find the mentor by ID
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Find the students by their IDs
    const students = await Student.find({ _id: { $in: studentIds } });

    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found with the provided IDs' });
    }

    // Assign the mentor to each student
    students.forEach(async (student) => {
      student.mentor = mentorId;
      await student.save();
    });

    res.status(200).json({ message: 'Students assigned to Mentor successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createMentor,addStudentsToMentor };
