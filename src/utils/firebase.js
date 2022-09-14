import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  writeBatch,
  query,
  Timestamp,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_apiKey}`,
  authDomain: `${import.meta.env.VITE_authDomain}`,
  projectId: `${import.meta.env.VITE_projectId}`,
  storageBucket: `${import.meta.env.VITE_storageBucket}`,
  messagingSenderId: `${import.meta.env.VITE_messagingSenderId}`,
  appId: `${import.meta.env.VITE_appId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addNotes = async (note) => {
  const batch = writeBatch(db);

  const docRef = doc(db, "notes", uuidv4());
  // add timestamp to note
  note.timestamp = Timestamp.now();

  // add pinned to note
  note.pinned = false;

  batch.set(docRef, note);

  await batch.commit();
};

// get notes realtime using onSnapshot
export const getRealTimeNotes = (callback) => {
  const q = query(
    collection(db, "notes"),
    orderBy("timestamp", "desc"),
    limit(6)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc) => {
      const note = doc.data();
      note.id = doc.id;
      notes.push(note);
    });
    callback(notes);
  });
  return unsubscribe;
};

// edit notes using batch write
export const editNotes = async (note) => {
  const batch = writeBatch(db);

  const docRef = doc(db, "notes", note.id);
  // add timestamp to note
  note.timestamp = Timestamp.now();

  batch.update(docRef, note);

  await batch.commit();
};

// delete notes using batch write
export const deleteNotes = async (note) => {
  const batch = writeBatch(db);

  const docRef = doc(db, "notes", note.id);

  batch.delete(docRef);

  await batch.commit();
};

// pin notes using batch write
export const pinNotes = async (note) => {
  const batch = writeBatch(db);

  const docRef = doc(db, "notes", note.id);

  batch.update(docRef, { pinned: !note.pinned });

  await batch.commit();
};
