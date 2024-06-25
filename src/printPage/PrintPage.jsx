import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { subjects } from "../data";
import "./printPage.css";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import amiriFont from "../js-pdf/arabicFont.js";
import collLogo from "../assets/coll_logo.png";
import uniLogo from "../assets/uni_logo.png";

const PrintPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState(
    location.state?.studentData || {}
  );

  useEffect(() => {
    if (!studentDetails.course) {
      const course = localStorage.getItem("selectedCourse");
      const totalUnits = localStorage.getItem("totalUnits");
      const department = localStorage.getItem("selectedDepartment");
      if (course) {
        setStudentDetails((prevDetails) => ({
          ...prevDetails,
          course,
          totalUnits,
          department,
        }));
      }
    }
  }, [studentDetails]);

  if (!studentDetails) {
    return (
      <div className="noDataMessage">
        البيانات غير مكتملة للعرض. يرجى التأكد من إعادة المحاولة.
      </div>
    );
  }

  const selectedSubjects =
    studentDetails.selectedSubjects?.map((subjectId) =>
      subjects.find((sub) => sub.id === subjectId)
    ) || [];

  const getProfessorAndSchedule = (subjectName) => {
    const professorData =
      studentDetails.selectedProfessors?.[subjectName] || {};
    const professorName = professorData.professorName || "لا يوجد تدريسي";
    const timeAvailable = professorData.timeAvailable || "لا يوجد وقت";
    const theDay = professorData.theDay || "لا يوجد يوم";
    return { professorName, timeAvailable, theDay };
  };

  const getCourseName = (course) => {
    switch (course) {
      case "first":
        return "الأول";
      case "second":
        return "الثاني";
      default:
        return course;
    }
  };

  const handleSendPrint = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("arabicFont.ttf", amiriFont);
    doc.addFont("arabicFont.ttf", "Amiri", "normal");
    doc.setFont("Amiri", "normal");

    doc.addImage(uniLogo, "PNG", 150, 10, 40, 40);
    doc.addImage(collLogo, "PNG", 10, 10, 40, 40);

    doc.text("اسم الطالب: " + studentDetails.studentName, 100, 30, {
      align: "center",
    });
    doc.text("الكلية: علوم الحاسوب والرياضيات", 100, 40, { align: "center" });
    doc.text("القسم: " + studentDetails.department, 100, 50, {
      align: "center",
    });
    doc.text("الكورس: " + getCourseName(studentDetails.course), 100, 60, {
      align: "center",
    });
    doc.text("الوحدات الكلية: " + studentDetails.totalUnits, 100, 70, {
      align: "center",
    });

    const subjectsData = selectedSubjects.map((subject) => {
      const { professorName, timeAvailable, theDay } = getProfessorAndSchedule(
        subject.name
      );
      return [
        timeAvailable,
        theDay,
        professorName,
        subject.units,
        subject.name,
      ];
    });

    doc.autoTable({
      head: [["الوقت", "اليوم", "التدريسي", "الوحدات", "اسم المادة"]],
      body: subjectsData,
      startY: 80,
      theme: "grid",
      styles: {
        font: "Amiri",
        fontStyle: "normal",
        halign: "center",
        cellPadding: 0.5,
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
      },
    });

    doc.save("studentDetails.pdf");

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "تم ارسال البيانات و حفظ ملف PDF",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="printPage">
      <Navbar />
      <section className="printDetails">
        <header className="headerSection">
          <div className="studentInfo" style={{ textAlign: "center" }}>
            <h2>اسم الطالب: {studentDetails.studentName}</h2>
            <h3>الكلية: علوم الحاسوب والرياضيات</h3>
            <h3>القسم: {studentDetails.department}</h3>
            <h3>الكورس: {getCourseName(studentDetails.course)}</h3>
            <h3>الوحدات الكلية: {studentDetails.totalUnits}</h3>
          </div>
        </header>
        <div className="tableContainer">
          <h2>المواد المختارة و التدريسيين وجدول المواعيد:</h2>
          <table className="scheduleTable">
            <thead>
              <tr>
                <th>اسم المادة</th>
                <th>الوحدات</th>
                <th>التدريسي</th>
                <th>اليوم</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {selectedSubjects.map((subject, index) => {
                const { professorName, timeAvailable, theDay } =
                  getProfessorAndSchedule(subject.name);
                return (
                  <tr key={index}>
                    <td>{subject.name ? subject.name : "لا توجد مادة"}</td>
                    <td>{subject.units ? subject.units : "غير موجود"}</td>
                    <td>{professorName ? professorName : "لا يوجد تدريسي"}</td>
                    <td>{theDay ? theDay : "لا يوجد"}</td>
                    <td>{timeAvailable ? timeAvailable : "لا يوجد"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="btns">
          <button className="printAndSend" onClick={handleSendPrint}>
            ارسال و طباعة
          </button>
          <button className="printAndSend" onClick={() => navigate(-1)}>
            السابق
          </button>
        </div>
      </section>
    </div>
  );
};

export default PrintPage;
