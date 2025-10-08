import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "sizeGuide" | "shipping" | "returns" | "care" | null;

interface ModalContextType {
  activeModal: ModalType;
<<<<<<< HEAD
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    action?: { label: string; onClick: () => void };
  } | null;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  setNotification: (notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    action?: { label: string; onClick: () => void };
  }) => void;
=======
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
<<<<<<< HEAD
  const [notification, setNotification] = useState<ModalContextType['notification']>(null);

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => {
    setActiveModal(null);
    setNotification(null);
  };

  return (
    <ModalContext.Provider value={{ activeModal, notification, openModal, closeModal, setNotification }}>
      {children}
    </ModalContext.Provider>
  );
};
=======

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
