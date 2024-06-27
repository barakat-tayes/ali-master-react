import React, { useState, useMemo } from "react";
import Navbar from "../components/navbar/Navbar";
import "./professorPage.css";
import { useStudentContext } from "../components/Context";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { professors, subjects } from "../data";

const ProfessorPage = () => {
  const { updateStudentData } = useStudentContext();
  const navigate = useNavigate();
  const location = useLocation();
  const storedSelectedSubjects = location.state?.selectedSubjects || [];
  const studentName = location.state?.studentName;
  const studentPhoto = location.state?.studentPhoto;
  const department =
    location.state?.department || localStorage.getItem("selectedDepartment");
  const initialSelectedProfessors = location.state?.selectedProfessors || {};

  const [selectedProfessors, setSelectedProfessors] = useState(
    initialSelectedProfessors
  );
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [conflictExists, setConflictExists] = useState(false);

  const filteredProfessors = useMemo(() => {
    return professors.reduce((acc, professor) => {
      if (!acc[professor.subject]) {
        acc[professor.subject] = [];
      }
      acc[professor.subject].push(professor);
      return acc;
    }, {});
  }, []);

  const formatTime = (time) => {
    if (!time) return null;
    const match = time.match(/(\d+):(\d+)\s*(ص|م)/);
    if (!match) return null;
    const [_, hours, minutes, period] = match;
    return `${hours}:${minutes} ${period}`;
  };

  const checkConflict = (subjectName, professorName, timeAvailable, theDay) => {
    const formattedTimeAvailable = formatTime(timeAvailable);

    if (
      selectedChoices.some(
        (choice) =>
          choice.theDay === theDay &&
          formatTime(choice.timeAvailable) === formattedTimeAvailable
      )
    ) {
      return true;
    }

    const sameDayChoices = selectedChoices.filter(
      (choice) => choice.theDay === theDay
    );

    const unitsForTheDay = sameDayChoices.reduce((acc, choice) => {
      const subject = subjects.find((sub) => sub.name === choice.subjectName);
      return acc + (subject ? subject.units : 0);
    }, 0);

    const currentSubject = subjects.find(
      (subject) => subject.name === subjectName
    );

    if (currentSubject && currentSubject.units === 3 && unitsForTheDay >= 3) {
      return true;
    }

    if (
      sameDayChoices.some(
        (choice) =>
          (formatTime(choice.timeAvailable) === "11:30 ص" &&
            formattedTimeAvailable === "12:30 م") ||
          (formatTime(choice.timeAvailable) === "12:30 م" &&
            formattedTimeAvailable === "11:30 ص")
      )
    ) {
      return true;
    }

    if (
      formattedTimeAvailable === "11:30 ص" &&
      sameDayChoices.some((choice) => {
        const subject = subjects.find((sub) => sub.name === choice.subjectName);
        return (
          formatTime(choice.timeAvailable) === "9:00 ص" &&
          subject &&
          subject.units === 3
        );
      })
    ) {
      return true;
    }

    return false;
  };

  const handleRadioChange = (
    subjectName,
    professorName,
    timeAvailable,
    theDay
  ) => {
    const selectedChoice = {
      subjectName,
      professorName,
      timeAvailable,
      theDay,
    };

    if (checkConflict(subjectName, professorName, timeAvailable, theDay)) {
      setConflictExists(true);

      Swal.fire({
        icon: "error",
        title: "تعارض في الاختيار",
        text: "لا يمكنك اختيار هذا الأستاذ لأن هناك تعارض في الجدول.",
      });
      return;
    }

    setConflictExists(false);

    const alreadySelectedProfessor = selectedProfessors[subjectName];

    if (alreadySelectedProfessor) {
      setSelectedChoices((prevChoices) =>
        prevChoices.filter((choice) => choice.subjectName !== subjectName)
      );
    }

    setSelectedChoices((prevChoices) => [...prevChoices, selectedChoice]);

    const selectedProfessor = {
      professorName,
      timeAvailable,
      theDay,
    };

    setSelectedProfessors((prevSelectedProfessors) => {
      const newProfessors = {
        ...prevSelectedProfessors,
        [subjectName]: selectedProfessor,
      };
      localStorage.setItem("selectedProfessors", JSON.stringify(newProfessors));
      localStorage.setItem("selectedDepartment", department);
      return newProfessors;
    });
  };

  const handleNext = () => {
    const allProfessorsSelected = storedSelectedSubjects.every((subjectId) => {
      const subject = subjects.find((sub) => sub.id === subjectId);
      return subject && selectedProfessors[subject.name];
    });

    /*
    const hasConflict = storedSelectedSubjects.some((subjectId) => {
      const subject = subjects.find((sub) => sub.id === subjectId);
      const professorData = selectedProfessors[subject.name];
      return (
        professorData &&
        checkConflict(
          subject.name,
          professorData.professorName,
          professorData.timeAvailable,
          professorData.theDay
        )
      );
    });
    */

    if (!allProfessorsSelected) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يجب اختيار أستاذ لكل مادة بدون تعارض قبل الانتقال إلى الصفحة التالية.",
      });
      return;
    }

    updateStudentData({
      studentName,
      studentPhoto,
      selectedSubjects: storedSelectedSubjects,
      selectedProfessors,
      department,
    });

    navigate("/printPage", {
      state: {
        studentData: {
          studentName,
          studentPhoto,
          selectedSubjects: storedSelectedSubjects,
          selectedProfessors,
          department,
        },
      },
    });
  };

  const handleClearAll = () => {
    setSelectedProfessors({});
    setSelectedChoices([]);
    localStorage.removeItem("selectedProfessors");
  };

  return (
    <div className="professorPage">
      <Navbar />
      <div className="containerPro">
        <div className="information">
          <img src={studentPhoto} alt={studentName} />
          <h2>{studentName}</h2>
          <p>{location.state?.department}</p>
        </div>
        <section className="selectionOfProfs">
          {storedSelectedSubjects.map((subjectId) => {
            const subject = subjects.find((sub) => sub.id === subjectId);
            if (!subject) return null;

            return (
              <div key={subjectId} className="subjectContainer">
                <h2 className="subjectTitle">{subject.name}</h2>
                <div className="professorRows">
                  {filteredProfessors[subject.name]?.map(
                    (professor, profIndex) => (
                      <div key={profIndex} className="professorRow">
                        <input
                          type="radio"
                          name={subject.name}
                          value={professor.name}
                          checked={
                            selectedProfessors[subject.name]?.professorName ===
                            professor.name
                          }
                          onChange={() =>
                            handleRadioChange(
                              subject.name,
                              professor.name,
                              professor.timeAvailable,
                              professor.theDay
                            )
                          }
                        />
                        <div className="professorInfo">
                          <h3>{professor.name}</h3>
                          <span>
                            {professor.timeAvailable} - {professor.theDay}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                  {!filteredProfessors[subject.name]?.length && (
                    <div>لا يوجد مدرّسين متاحين لهذه المقررات.</div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
        <div className="nextOrPrev">
          <button onClick={handleNext}>التالي</button>
          <button onClick={() => navigate("/subjects")}>السابق</button>
          <button onClick={handleClearAll}>مسح الإختيارات</button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;
