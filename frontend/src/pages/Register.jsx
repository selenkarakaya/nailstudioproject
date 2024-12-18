import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Avatar, Badge, Box, IconButton, Tooltip } from "@mui/material";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // const onChange2 = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //   } else {
  //     // setNoteText("reader.result");
  //   }
  // };

  const onChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      const photoURL = URL.createObjectURL(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files,
      }));
      dispatch({
        type: "UPDATE_PROFILE",
        // payload: { ...profile, file, photoURL },
      });
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    password2: "",
    photoURL: "",
  });
  const { name, email, address, password, password2, photoURL } = formData;
  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    console.log(e.target.type);
    if (e.target.type === "file") {
      console.log("pas");
      console.log(e.target.files);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        address,
        password,
        photoURL,
      };
      console.log(photoURL);
      // Connect to redux
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(
            `Welcome to Selene Nail Studio ${
              user.name.split(" ")[0].charAt(0).toUpperCase() +
              user.name.split(" ")[0].slice(1).toLowerCase()
            }`
          );
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="flex flex-col items-center ">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section className="form" onSubmit={onSubmit}>
        <form>
          <img alt="not found" width={"250px"} src={image} />
          <label htmlFor="avatar">Choose a profile picture:</label>
          <input
            accept="image/*"
            id="profilePhoto"
            type="file"
            onChange={onChange}
          />
          <Avatar
            src={image}
            sx={{ width: 75, height: 75, cursor: "pointer" }}
          />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
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
            <textarea
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={onChange}
              rows="3"
              placeholder="Enter your address"
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group text-center">
            <button className="bg-darkBlue hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
