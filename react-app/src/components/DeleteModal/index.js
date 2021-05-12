import React from 'react';

const DeleteModal = ({ setShowDeleteModal, setOpenMenu, handleDelete, item }) => {

  return (
    <div className="delete-pl-modal-container">
      <h2 className="delete-pl-modal-header">
        {item.name ? `Are you sure you would like to delete ${item.name}?` :
        `Are you sure you want to remove "${item.title}" from this playlist?`}
      </h2>
      {item.name ? (
        <p className="delete-pl-modal-warning">This action cannot be undone.</p>
      ) : null}
      <div className="">
        <button onClick={() => {
          setShowDeleteModal(false)
          setOpenMenu(false)}}
          className="delete-pl-modal-button-cancel">Cancel</button>
        <button
          onClick={handleDelete}
          className="delete-pl-modal-button-confirm">Confirm</button>
      </div>
    </div>
  )
}

export default DeleteModal;
