import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Modal.module.css";

import { RootState } from "../../store/store";
import { appActions } from "../../store/app-slice";

const Modal = () => {
  const dispatch = useDispatch();

  const notification = useSelector(
    (state: RootState) => state.app.notification
  );

  const clickHandler = () => {
    dispatch(appActions.closeModal());
  };

  return (
    <>
      {notification !== null &&
        ReactDOM.createPortal(
          <div className={classes.backdrop} onClick={clickHandler} />,
          document.getElementById("backdrop-root")!
        )}

      {notification !== null &&
        ReactDOM.createPortal(
          <div>
            <div className={classes.modal}>
              <header className={classes.header}>
                <h2>{notification.title}</h2>
              </header>
              <div className={classes.content}>
                <p>{notification.message}</p>
              </div>
              <footer className={classes.actions}>
                <button onClick={clickHandler}>Okay</button>
              </footer>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export default Modal;
