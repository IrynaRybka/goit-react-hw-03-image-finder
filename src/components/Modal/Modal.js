import {Component} from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown )

    }
    componentWillUnmount() {
window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown =(e)=> {
        if(e.code === 'Escape') {
            this.props.onClose()
        }
    }
    handleBackdropClick =(e) => {
        if(e.currentTarget === e.target) {
            this.props.onClose()
        }
    }
    render() {
        return createPortal(<div className={css.overlay}>
            <div className={css.modal} onClick={this.handleBackdropClick}>
              {this.props.children}
            </div>
          </div>, modalRoot) 
    }
}