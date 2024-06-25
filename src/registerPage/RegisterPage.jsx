import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../components/Context";
import Swal from "sweetalert2";
import { students } from "../data";
import Navbar from "../components/navbar/Navbar";
import "./registerPage.css";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setLoggedInStudent, loggedInStudent } = useStudentContext();

  useEffect(() => {
    if (loggedInStudent) {
      navigate("/subjects");
    }
  }, [loggedInStudent, navigate]);

  const handleLogin = () => {
    const foundStudent = students.find(
      (student) =>
        student.userName.toLowerCase() === userName.toLowerCase() &&
        student.password.toLowerCase() === password.toLowerCase()
    );
    if (foundStudent) {
      setLoggedInStudent(foundStudent);
    } else {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يرجى التأكد من البيانات المدخلة",
      });
    }
  };

  return (
    <section className="registerPage">
      <Navbar />
      <div className="loginPage">
        <div className="notes">
          <h3>يرجى إدخال اسم المستخدم و كلمة السر المعطاة من قبل الكلية </h3>
        </div>
        <div className="inputs">
          <form>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="btn"
              type="button"
              value="الدخول"
              onClick={handleLogin}
            />
            <input
              className="btn"
              type="button"
              value="العودة للرئيسية"
              onClick={() => navigate("/")}
            />
          </form>
          {/*error && <p className="error">{error}</p>*/}
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
