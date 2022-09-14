import { createContext, useState } from "react";

const initialState = {
  isModalOpen: false,
  notes: [],
};
export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const openModal = (note) => {
    setState({ isModalOpen: true, notes: note });
  };

  const closeModal = () => {
    setState({ isModalOpen: false, notes: [] });
  };

  const value = {
    isModalOpen: state.isModalOpen,
    notes: state.notes,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
