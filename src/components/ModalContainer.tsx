import { useModal } from "../contexts/ModalContext";
import { Modal } from "./Modal";
import { SizeGuideModal } from "./modals/SizeGuideModal";
import { ShippingInfoModal } from "./modals/ShippingInfoModal";
import { ReturnsModal } from "./modals/ReturnsModal";
import { CareInstructionsModal } from "./modals/CareInstructionsModal";

const modalConfigs = {
  sizeGuide: {
    title: "Size Guide",
    component: SizeGuideModal,
  },
  shipping: {
    title: "Shipping Information",
    component: ShippingInfoModal,
  },
  returns: {
    title: "Returns & Exchange",
    component: ReturnsModal,
  },
  care: {
    title: "Care Instructions",
    component: CareInstructionsModal,
  },
} as const;

export const ModalContainer = () => {
  const { activeModal, closeModal, notification } = useModal();

  // Handle standard modals
  if (activeModal && modalConfigs[activeModal]) {
    const { title, component: ModalComponent } = modalConfigs[activeModal];
    return (
      <Modal isOpen={true} onClose={closeModal} title={title}>
        <ModalComponent />
      </Modal>
    );
  }

  // Handle notification toast
  if (notification && notification.show) {
    const { message, type, action } = notification;
    return (
      <div
        className={`fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg transition-all duration-300 z-50 ${
          type === 'success' ? 'bg-green-100 text-green-800' : type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={closeModal}
            className="ml-4 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            ✕
          </button>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 w-full bg-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    );
  }

  return null;
};