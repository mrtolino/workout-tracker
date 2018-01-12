import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const DeleteConfirmationModal = (props) => {
  return (
    <Modal
      className="Modal__Bootstrap modal-dialog"
      closeTimeoutMS={0}
      isOpen={props.renderConfirmationModal}
      onRequestClose={props.onCloseConfirmationModal}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Confirm Delete</h4>
          <button type="button" className="close" onClick={props.onCloseConfirmationModal}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={props.onCloseConfirmationModal}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={props.onConfirmDelete}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
