import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        toast.success(
          `Hello ${
            user.name.split(" ")[0].charAt(0).toUpperCase() +
            user.name.split(" ")[0].slice(1).toLowerCase()
          }`
        );
        navigate("/");
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="flex flex-col items-center">
        <h1>Register</h1>
        <p>Please log in and book</p>
      </section>
      <section className="form" onSubmit={onSubmit}>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group text-center">
            <button className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
