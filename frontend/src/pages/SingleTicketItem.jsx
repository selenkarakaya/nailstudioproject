import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { FaPlus } from "react-icons/fa";
import { getNotes, createNote, updateNote } from "../features/notes/noteSlice";

import NoteItem from "../components/NoteItem";
import Modal from "react-modal";
import { set } from "mongoose";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

function SingleTicketItem() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));

    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  useEffect(() => {
    const time = Date.now() - Date.parse(ticket.date);
    // eslint-disable-next-line
    if (time !== NaN) {
      if (time > 0) {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket Closed");
      }
    }
  });

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>something went wrong</h3>;
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
    setNoteText("");
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-UK")}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
            <p>{ticket.date}</p>
          </div>
        </header>
        {ticket.status !== "closed" && (
          <button onClick={openModal} className="btn">
            <FaPlus /> Add Note
          </button>
        )}
        <h2>Notes</h2>
        {notes
          ? notes.map((note) => (
              <NoteItem key={note._id} note={note} ticketId={ticketId} />
            ))
          : ""}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default SingleTicketItem;
