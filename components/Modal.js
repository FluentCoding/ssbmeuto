import styles from './Modal.module.css'

const Modal = (props) => {
    if(!props.show) {
        return null;
    }
    return (
        <div className={styles.modal}>
            <div>{props.children}</div>
            <div className={styles.actions}>
            <button className={styles.imgButton} onClick={props.submit}>
                Image
                </button>
                <button className={styles.submitButton} onClick={props.submit}>
                Submit
                </button>
                <button className={styles.closeButton} onClick={props.close}>
                close
                </button>
            </div>
        </div>
    );
}

export default Modal;