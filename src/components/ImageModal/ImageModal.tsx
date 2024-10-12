
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
type ImageModalProps = {
  closeModal: () => void;
  modalIsOpen: boolean;
  imgModal: string;
};
const ImageModal = ({   closeModal, modalIsOpen,imgModal}:ImageModalProps) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
          >
                  <img src={imgModal} alt='photo' />
      </Modal>
    </div>
  );
};


export default ImageModal


