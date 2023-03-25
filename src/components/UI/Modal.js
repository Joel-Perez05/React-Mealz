import React from 'react'
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css"

const Backdrop = props => {
  const {hideCartHandler} = props

  return <div className={classes.backdrop} onClick={hideCartHandler} />
};

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
};

const portalElement = document.getElementById("overlays")

const Modal = (props) => {
  const {hideCartHandler} = props

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop hideCartHandler={hideCartHandler} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>, portalElement
      )}
    </React.Fragment>
  )   
}

export default Modal