import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confPass: ""
}
const Register = () => {

    const [formData, setFormData] = useState(initialState);
    const {name, email, password, confPass} = formData;

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value})
    }

    const registerUser = () => {}

  return (
    <section className={`container ${styles.auth}`}>
      

      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name={name}
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name={email}
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name={password}
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name={confPass}
              value={confPass}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <p>Already have an account</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>

      <div className={styles.img}>
        <img src={loginImg} alt="login" width={400}></img>
      </div>
    </section>
  );
};

export default Register;
