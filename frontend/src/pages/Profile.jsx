import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import Tickets from "./Tickets";
import { update } from "../features/auth/authSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const onChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      // setNoteText("reader.result");
    }
  };
  const [changeDetails, setChangeDetails] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
  });

  const { name, email, address } = formData;
  const onSubmit = async () => {
    try {
      const userData = {
        name,
        address,
      };
      dispatch(update(userData));
      setformData(userData);
    } catch (error) {
      toast("Could not update profile details");
    }
  };
  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="mb-5">
        <header className="flex items-center space-x-8">
          <p className="pl-2 text-xl">My Account • </p>
          <Link
            to="/Feedback"
            className="text-xl text-greens flex items-center space-x-2"
          >
            <GoCommentDiscussion />
            <p>Help us improve •</p>
          </Link>
          <Link
            to="/Contact"
            className="text-xl text-greens flex items-center space-x-2"
          >
            <BiEditAlt />
            <p> Contact •</p>
          </Link>
          <p
            className="cursor-pointer text-greens text-xl"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done • " : "Change Details • "}
          </p>
        </header>
        <main>
          <div className="flex flex-col mt-6">
            <h1 className="text-2xl text-center mb-6">My details</h1>
            <div className="bg-indigo-200 md:w-3/4 mx-auto">
              <form className="flex flex-col justify-center items-center my-4 space-y-4 p-6">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={!changeDetails ? "profile" : "profileActive"}
                    disabled={!changeDetails}
                    onChange={onChange}
                    value={name}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={!changeDetails ? "profile" : "profileActive"}
                    disabled={!changeDetails}
                    onChange={onChange}
                    value={email}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={!changeDetails ? "profile" : "profileActive"}
                    disabled={!changeDetails}
                    onChange={onChange}
                    value={address}
                  />
                </div>
                <h1>image</h1>
                <img alt="not found" width={"250px"} src={image} />
                <label htmlFor="avatar">Choose a profile picture:</label>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={onChange2}
                />
              </form>
            </div>
          </div>
        </main>
      </div>
      <Tickets />
    </>
  );
}

export default Profile;
