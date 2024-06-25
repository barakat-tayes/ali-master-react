import React, { createContext, useState, useContext } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [studentData, setStudentData] = useState({
    selectedSubjects: [],
    professors: {},
    schedule: {},
    studentName: "",
    studentPhoto: "",
    department: "",
    course: "", // سيتم تحديث قيمة الكورس
  });

  const updateStudentData = (newData) => {
    setStudentData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <StudentContext.Provider
      value={{
        loggedInStudent,
        setLoggedInStudent,
        studentData,
        updateStudentData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};
