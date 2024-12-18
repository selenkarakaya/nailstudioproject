import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Ticket({ ticket }) {
  return (
    <>
      <div className="ticket">
        <div>{ticket.product}</div>
        <div>{ticket.date}</div>
        <Link to={`/ticket/${ticket._id}`} className="btn">
          <FaPlus /> view
        </Link>

        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      </div>
    </>
  );
}

export default Ticket;
