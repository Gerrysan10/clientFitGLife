import '../css/modalRegister.css'
interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
}

const ModalRegister: React.FC<ModalProps> = ({ showModal, setShowModal, message }) => {
    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='cont-title-modal'>
                            <p className='title-modal'>Mensaje</p>
                            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        </div>
                        <p className='message-modal'>{message}.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalRegister;
