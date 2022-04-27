import useDiscardModal from 'context/DiscardModalContext'
import React from 'react'
import Modal from './Modal'

export default function DiscardModal({ onConfirm }) {
  const { isDiscardOpen, closeDiscardModal } = useDiscardModal()

  return (
    <Modal open={isDiscardOpen} onClose={closeDiscardModal} >
      <div className="discard-modal-container">
        <div className="discard-modal-title-container">
          <div className="discard-modal-title">Discard this post?</div>
          <div className="discard-modal-subtitle">The video and all the edits will be discarded.</div>
        </div>

        <button className="discard-modal-confirm" onClick={onConfirm}>Discard</button>
        <button className="discard-modal-discard" onClick={closeDiscardModal}>Continue editing</button>
      </div>
    </Modal>
  )
}
