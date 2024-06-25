import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <section className="homePage">
      <Navbar />
      <div className="container">
        <div className="explaining">
          <div className="text">
            <p>
              توفر هذه المنصة المرونة الكاملة لطالب الدراسات العليا لإختيار
              المواد التي سيدرسها خلال الكورس الأول والثاني،
            </p>
            <p>
              بالإضافة إلى إمكانية اختيار الأستاذ الذي يدرّس هذه المادة وحسب
              الوقت المتاح لكل أستاذ.
            </p>
            <p>
              كما ويمكن للطالب أن يوازن وحدات المواد التي يختارها خلال الكورسين.
            </p>
          </div>
          <div className="btn">
            <Link to="register" className="enterToSystem">
              الدخول إلى المنظومة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
