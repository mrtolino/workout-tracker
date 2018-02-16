import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const DeleteConfirmationModal = props => (
  <Modal
    className="Modal__Bootstrap modal-dialog"
    closeTimeoutMS={0}
    isOpen={props.renderConfirmationModal}
    onRequestClose={props.onCloseConfirmationModal}
  >
    <div className="modal-content grid-container">
      <div className="modal-header grid-x grid-margin-x">
        <div className="cell">
          <h4 className="modal-title float-left">Confirm Delete</h4>
          <button type="button" className="close solid button secondary float-right" onClick={props.onCloseConfirmationModal}>
            <span aria-hidden="true">&times;</span>
            {/* <span className="sr-only">Close</span> */}
          </button>
        </div>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="modal-body cell">
          <p>Are you sure you want to delete?</p>
        </div>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="modal-footer cell">
          <button type="button" className="solid button secondary btn-margin-right" onClick={props.onCloseConfirmationModal}>Cancel</button>
          <button type="button" className="solid button alert" onClick={props.onConfirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmationModal;
