import React, { useState } from "react";

import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";
import StudentRow from "./components/StudentRow";


import report from "./data";

import "./App.css";

const App = () => {

  const [students, setStudents] =
    useState(report);

  // Update Score
  function updateScore(id, newScore) {

    const updatedStudents =
      students.map((student) =>

        student.id === id
          ? { ...student, score: newScore }
          : student

      );

    setStudents(updatedStudents);

  }

  // Add Student
  function addStudent(name, score) {

    const newStudent = {

      id: students.length + 1,
      name: name,
      score: score

    };

    setStudents([
      ...students,
      newStudent
    ]);

  }

  return (

    <div className="container">
      
      {/* J.A.R.V.I.S. HUD Element */}
      <div className="jarvis-hud">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
        <div className="ring ring-4"></div>
        <div className="core"></div>
      </div>

      <Header />

      <AddStudentForm
        addStudent={addStudent}
      />

      <StudentTable
        students={students}
        updateScore={updateScore}
      />

    </div>

  );

};

export default App;