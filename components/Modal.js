import styles from './Modal.module.css'

const Modal = (props) => {
    if(!props.show) {
        return null;
    }
    return (
        <div className={styles.modal}>
            <div>{props.children}</div>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.submit}>
                submit
                </button>
                <button className={styles.button} onClick={props.close}>
                close
                </button>
            </div>
        </div>
    );
}

export default Modal;