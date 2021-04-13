const db = require('../services/db');

async function getMultiple(){
  const data = await db.query('SELECT * FROM student');

  return {
    data
  }
}

function validateCreate(student) {
  let messages = [];

  console.log(student);

  if (!student) {
    messages.push('No object is provided');
  }

  if (!student.name || !student.class || !student.marks) {
    messages.push('Incomplete data provided');
    console.log(student);
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

async function create(student){
  validateCreate(student);

  const result = await db.query(
    'INSERT INTO student (name,class,marks) VALUES  (?, ?, ?)', 
    [student.name, student.class, student.marks]
  );

  let message = `Error in creating student ${student.name}`;

  if (result.affectedRows) {
    message = `Student ${student.name} created successfully`;
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}