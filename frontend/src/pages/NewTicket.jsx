import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import TimeDatePicker from "../components/TimeDatePicker";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPad");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/Profile");
    }
  }, [dispatch, isError, isLoading, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("selen");
    console.log(date);
    dispatch(createTicket({ product, description, date }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton />
      <section className="flex flex-col items-center justify-center">
        <h1>Create New Appointment</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Service</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Select service">Select service</option>
              <option value="Gel nail extensions full set">
                Gel nail extensions full set
              </option>
              <option value="Gel Infills">Gel Infill</option>
              <option value="Gel overlay on natural nails">
                Gel overlay on natural nails
              </option>
              <option value="Manicure with gel polish">
                Manicure with gel polish
              </option>
              <option value="Spa pedicure with gel polish">
                Spa pedicure with gel polish
              </option>
              <option value="Pedicure with gel polish">
                Pedicure with gel polish
              </option>
              <option value="Nail Extension Repair">
                Nail Extension Repair
              </option>
              <option value="Removal of gel polish/builder gel">
                Removal of gel polish/builder gel
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <TimeDatePicker date={date} setDate={setDate} />
          {/* <div className="form-group">
            <label for="image">Upload Image</label>
            <input type="file" id="image" name="image" value="" required />
          </div> */}
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
