import "./navbar.css";
import uni_logo from "../../assets/uni_logo.png";
import coll_logo from "../../assets/coll_logo.png";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="uni_logo">
        <img src={uni_logo} alt="logo of university" />
      </div>
      <div className="header-text">
        <h2>
          منصة خطة طالب الدراسات العليا في كلية علوم الحاسوب والرياضيات / جامعة
          تكريت
        </h2>
      </div>
      <div className="coll_logo"></div>{" "}
      <img src={coll_logo} alt="logo of collage" />
    </div>
  );
};

export default Navbar;
