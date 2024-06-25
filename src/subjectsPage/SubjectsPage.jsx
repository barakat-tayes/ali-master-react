import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Swal from "sweetalert2";
import "./subjectsPage.css";
import { subjects } from "../data";
import { students } from "../data";
import { useStudentContext } from "../components/Context";

const SubjectsPage = () => {
  const { loggedInStudent, setLoggedInStudent } = useStudentContext();
  const [selectedSubjectsFirst, setSelectedSubjectsFirst] = useState(new Set());
  const [selectedSubjectsSecond, setSelectedSubjectsSecond] = useState(
    new Set()
  );
  const [selectedCourse, setSelectedCourse] = useState("first");
  const [totalUnitsFirst, setTotalUnitsFirst] = useState(0);
  const [totalUnitsSecond, setTotalUnitsSecond] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    if (username && password) {
      const student = students.find(
        (s) => s.userName === username && s.password === password
      );
      if (student) {
        setLoggedInStudent(student);
        loadData(student.userName);
      } else {
        navigate("/register");
      }
    } else {
      navigate("/register");
    }
  }, [setLoggedInStudent, navigate]);

  const isChecked = (subjectId) => {
    if (loggedInStudent && selectedCourse) {
      if (selectedCourse === "first") {
        return selectedSubjectsFirst.has(subjectId);
      } else if (selectedCourse === "second") {
        return selectedSubjectsSecond.has(subjectId);
      }
    }
    return false;
  };

  const loadData = (username) => {
    const accountKeyFirst = `selectedSubjectsFirst_${username}`;
    const accountKeySecond = `selectedSubjectsSecond_${username}`;
    const accountKeyUnitsFirst = `totalUnitsFirst_${username}`;
    const accountKeyUnitsSecond = `totalUnitsSecond_${username}`;

    const savedSubjectsFirst = localStorage.getItem(accountKeyFirst);
    const savedSubjectsSecond = localStorage.getItem(accountKeySecond);
    const savedTotalUnitsFirst = localStorage.getItem(accountKeyUnitsFirst);
    const savedTotalUnitsSecond = localStorage.getItem(accountKeyUnitsSecond);

    if (savedSubjectsFirst) {
      const subjectsFirstSet = new Set(JSON.parse(savedSubjectsFirst));
      setSelectedSubjectsFirst(subjectsFirstSet);
      setTotalUnitsFirst(
        savedTotalUnitsFirst
          ? parseInt(savedTotalUnitsFirst)
          : calculateTotalUnits(subjectsFirstSet)
      );
    }

    if (savedSubjectsSecond) {
      const subjectsSecondSet = new Set(JSON.parse(savedSubjectsSecond));
      setSelectedSubjectsSecond(subjectsSecondSet);
      setTotalUnitsSecond(
        savedTotalUnitsSecond
          ? parseInt(savedTotalUnitsSecond)
          : calculateTotalUnits(subjectsSecondSet)
      );
    }
  };

  useEffect(() => {
    if (loggedInStudent) {
      sessionStorage.setItem("username", loggedInStudent.userName);
      sessionStorage.setItem("password", loggedInStudent.password);
      loadData(loggedInStudent.userName);
    }
  }, [loggedInStudent]);

  useEffect(() => {
    if (loggedInStudent) {
      const accountKeyFirst = `selectedSubjectsFirst_${loggedInStudent.userName}`;
      const accountKeySecond = `selectedSubjectsSecond_${loggedInStudent.userName}`;
      const accountKeyUnitsFirst = `totalUnitsFirst_${loggedInStudent.userName}`;
      const accountKeyUnitsSecond = `totalUnitsSecond_${loggedInStudent.userName}`;

      localStorage.setItem(
        accountKeyFirst,
        JSON.stringify(Array.from(selectedSubjectsFirst))
      );
      localStorage.setItem(
        accountKeySecond,
        JSON.stringify(Array.from(selectedSubjectsSecond))
      );
      localStorage.setItem(accountKeyUnitsFirst, totalUnitsFirst.toString());
      localStorage.setItem(accountKeyUnitsSecond, totalUnitsSecond.toString());
    }
  }, [
    loggedInStudent,
    selectedSubjectsFirst,
    selectedSubjectsSecond,
    totalUnitsFirst,
    totalUnitsSecond,
  ]);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    setLoggedInStudent(null);
    navigate("/register");
  };

  const handleLogoutConfirmation = () => {
    Swal.fire({
      title: "هل تريد تسجيل خروج ؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
        // لا شيء
      }
    });
  };

  const calculateTotalUnits = (selectedSubjects) => {
    return Array.from(selectedSubjects).reduce(
      (total, subjectId) =>
        total +
        (subjects.find((subject) => subject.id === subjectId)?.units || 0),
      0
    );
  };

  const calculateUnselectedUnits = () => {
    const allSubjects = subjects
      .filter(
        (subject) =>
          loggedInStudent && subject.department === loggedInStudent.department
      )
      .map((subject) => subject.id);
    const selectedSubjectsSet = new Set(
      selectedCourse === "first"
        ? selectedSubjectsFirst
        : selectedSubjectsSecond
    );
    const unselectedSubjects = allSubjects.filter(
      (id) => !selectedSubjectsSet.has(id)
    );
    return unselectedSubjects.reduce(
      (total, subjectId) =>
        total +
        (subjects.find((subject) => subject.id === subjectId)?.units || 0),
      0
    );
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
  };

  const handleSubjectChange = (event) => {
    const subjectId = parseInt(event.target.id, 10);
    const course = selectedCourse;
    const subject = subjects.find((subject) => subject.id === subjectId);
    const isMandatory = subject.type === "mandatory";

    if (isMandatory) {
      Swal.fire("هذه المادة إلزامية ولا يمكن إلغاؤها");
      return;
    }

    if (course === "first") {
      setSelectedSubjectsFirst((prevSelectedSubjects) => {
        const updatedSubjects = new Set(prevSelectedSubjects);

        if (updatedSubjects.has(subjectId)) {
          updatedSubjects.delete(subjectId);
        } else if (updatedSubjects.size < 6) {
          updatedSubjects.add(subjectId);
        }

        const newTotalUnits = calculateTotalUnits(updatedSubjects);
        setTotalUnitsFirst(newTotalUnits);

        return updatedSubjects;
      });
    } else {
      setSelectedSubjectsSecond((prevSelectedSubjects) => {
        const updatedSubjects = new Set(prevSelectedSubjects);

        if (updatedSubjects.has(subjectId)) {
          updatedSubjects.delete(subjectId);
        } else if (updatedSubjects.size < 6) {
          updatedSubjects.add(subjectId);
        }

        const newTotalUnits = calculateTotalUnits(updatedSubjects);
        setTotalUnitsSecond(newTotalUnits);

        return updatedSubjects;
      });
    }
  };

  useEffect(() => {
    if (loggedInStudent) {
      const updatedSubjectsFirst = new Set();
      const updatedSubjectsSecond = new Set();

      subjects.forEach((subject) => {
        if (subject.type === "mandatory") {
          if (subject.department === loggedInStudent.department) {
            updatedSubjectsFirst.add(subject.id);
            updatedSubjectsSecond.add(subject.id);
          }
        }
      });

      setSelectedSubjectsFirst(updatedSubjectsFirst);
      setSelectedSubjectsSecond(updatedSubjectsSecond);

      setTotalUnitsFirst(calculateTotalUnits(updatedSubjectsFirst));
      setTotalUnitsSecond(calculateTotalUnits(updatedSubjectsSecond));
    }
  }, [loggedInStudent]);

  const totalUnits = subjects
    .filter(
      (subject) =>
        loggedInStudent && subject.department === loggedInStudent.department
    )
    .reduce((total, subject) => total + subject.units, 0);

  const handleNext = () => {
    if (
      (selectedCourse === "first" && selectedSubjectsFirst.size === 6) ||
      (selectedCourse === "second" && selectedSubjectsSecond.size === 6)
    ) {
      if (
        (selectedCourse === "first" && totalUnitsFirst === totalUnits / 2) ||
        (selectedCourse === "second" && totalUnitsSecond === totalUnits / 2)
      ) {
        const selectedSubjects =
          selectedCourse === "first"
            ? Array.from(selectedSubjectsFirst)
            : Array.from(selectedSubjectsSecond);

        // Store the selected data in localStorage
        localStorage.setItem("selectedCourse", selectedCourse);
        localStorage.setItem(
          "selectedSubjects",
          JSON.stringify(selectedSubjects)
        );
        localStorage.setItem(
          "totalUnits",
          selectedCourse === "first" ? totalUnitsFirst : totalUnitsSecond
        );

        // Navigate to professors page with all necessary state data
        navigate("/professors", {
          state: {
            selectedSubjects,
            studentName: loggedInStudent.theName,
            studentPhoto: loggedInStudent.photo,
            department: loggedInStudent.department,
            course: selectedCourse,
            totalUnits:
              selectedCourse === "first" ? totalUnitsFirst : totalUnitsSecond,
          },
        });
      } else {
        Swal.fire(`يجب ان يكون مجموع الوحدات " ${totalUnits / 2} "`);
      }
    } else {
      Swal.fire("يجب اختيار 6 مواد !");
    }
  };

  return (
    <section className="subjects">
      <Navbar />
      <div className="parts">
        <div className="information">
          {loggedInStudent && (
            <Fragment>
              <div className="photo">
                <img
                  src={loggedInStudent.photo}
                  alt={loggedInStudent.theName}
                />
              </div>
              <div className="theName">{loggedInStudent.theName}</div>
              <div className="department">{loggedInStudent.department}</div>
            </Fragment>
          )}
        </div>
        <div className="levelAndUnits">
          <div className="units">
            <div className="unitsDistribution">توزيع الوحدات</div>
            <div className="allUnits">
              <div>
                <h3>الوحدات الكلية</h3>
                <span>
                  {subjects
                    .filter(
                      (subject) =>
                        loggedInStudent &&
                        subject.department === loggedInStudent.department
                    )
                    .reduce((total, subject) => total + subject.units, 0)}
                </span>
              </div>
              <div>
                <h3>
                  {selectedCourse === "first"
                    ? "الكورس الاول"
                    : "الكورس الثاني"}
                </h3>
                <span>
                  {selectedCourse === "first"
                    ? totalUnitsFirst
                    : totalUnitsSecond}
                </span>
              </div>
              <div>
                <h3>
                  {selectedCourse === "first"
                    ? "الكورس الثاني"
                    : "الكورس الاول"}
                </h3>
                <span>{loggedInStudent && calculateUnselectedUnits()}</span>
              </div>
            </div>
          </div>
          <div className="theCourse">
            <div>
              <input
                type="radio"
                name="course"
                id="firstCourse"
                value="first"
                checked={selectedCourse === "first"}
                onChange={() => handleCourseChange("first")}
              />
              <label htmlFor="firstCourse">الكورس الاول</label>
            </div>
            <div>
              <input
                type="radio"
                name="course"
                id="secondCourse"
                value="second"
                checked={selectedCourse === "second"}
                onChange={() => handleCourseChange("second")}
              />
              <label htmlFor="secondCourse">الكورس الثاني</label>
            </div>
          </div>
        </div>
        <div className="choosingSubjects">
          <div className="theTitleBar">
            <div className="titles firstTitle">
              <span>عدد الوحدات</span>
              <span>اسم المادة</span>
              <span>اختر المادة</span>
            </div>
            <div className="titles secondTitle">
              <span>عدد الوحدات</span>
              <span>اسم المادة</span>
              <span>اختر المادة</span>
            </div>
            <div className="titles thirdTitle">
              <span>عدد الوحدات</span>
              <span>اسم المادة</span>
              <span>اختر المادة</span>
            </div>
          </div>
          <div className="subjects">
            {subjects
              .filter(
                (subject) =>
                  loggedInStudent &&
                  subject.department === loggedInStudent.department
              )
              .map((subject, index) => (
                <div key={index} className="theSubject">
                  <div className="units">
                    <span>{subject.units}</span>
                  </div>
                  <div className="theNameOfSubject">
                    <label htmlFor={subject.id.toString()}>
                      {subject.name}
                    </label>
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="subject"
                      id={subject.id.toString()}
                      value={subject.name}
                      onChange={handleSubjectChange}
                      data-course={subject.course}
                      checked={isChecked(subject.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="nextOrPrev">
          <button onClick={handleNext}>التالي</button>
          <button onClick={handleLogoutConfirmation}>تسجيل الخروج</button>
        </div>
      </div>
    </section>
  );
};

export default SubjectsPage;
