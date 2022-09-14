import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../context/modal.context";
import { db, getRealTimeNotes, pinNotes } from "../../utils/firebase";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  startAfter,
  limit,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import PinIcon from "../../assets/pin.png";
import Modal from "../modal/Modal";
import NoteCard from "./NoteCard";
import "./notes.css";
const ViewNotes = () => {
  const [notes1, setNotes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRealTimeNotes((notes) => {
      setNotes(notes);
    });
  }, []);

  const showNext = ({ item }) => {
    if (notes1.length === 0) {
      toast("Notes are empty, Please create one", {
        icon: "📝",
      });
    } else {
      const fetchNextData = () => {
        const q = query(
          collection(db, "notes"),
          orderBy("timestamp", "desc"),
          startAfter(item.timestamp),
          limit(6)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const notes = [];
          querySnapshot.forEach((doc) => {
            const note = doc.data();
            note.id = doc.id;
            notes.push(note);
          });
          setNotes(notes);
          setPage(page + 1);
        });
        return unsubscribe;
      };
      fetchNextData();
    }
  };

  const showPrevious = ({ item }) => {
    const fetchPreviousData = () => {
      const q = query(
        collection(db, "notes"),
        orderBy("timestamp", "desc"),
        endBefore(item.timestamp),
        limitToLast(6)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          const note = doc.data();
          note.id = doc.id;
          notes.push(note);
        });
        setNotes(notes);
        setPage(page - 1);
      });
      return unsubscribe;
    };
    fetchPreviousData();
  };

  const { isModalOpen, openModal } = useContext(ModalContext);
  const handleModal = (note) => {
    openModal(note);
  };

  // sort notes by descending order with respect to pinned
  const sortedNotes = notes1.sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="view-notes">
      <div className="view-notes-top">
        {sortedNotes.map((note) => (
          <motion.div
            key={note.id}
            className="note-wrapper"
            animate={{ x: 0 }}
            initial={{ x: 50 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={PinIcon}
              style={{ rotate: `${note.pinned ? "0deg" : "-45deg"}` }}
              className="icons"
              onClick={() => pinNotes(note)}
            />
            <div onClick={() => handleModal(note)}>
              <NoteCard note={note} />
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && <Modal />}
      <div className="view-notes-bottom">
        {page === 1 ? (
          ""
        ) : (
          <button
            className="page-btn"
            onClick={() => showPrevious({ item: notes1[0] })}
          >
            <BiChevronLeft />
            Previous
          </button>
        )}
        {notes1.length < 5 ? (
          ""
        ) : (
          <button
            onClick={() => showNext({ item: notes1[notes1.length - 1] })}
            className="page-btn"
          >
            Next <BiChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
