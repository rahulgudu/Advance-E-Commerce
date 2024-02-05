import React from 'react'
import styles from "./Loader.module.scss";
import  ReactDOM from 'react-dom';
import loaderImage from "../../assets/loader.gif";
const Loader = () => {
  return (
    ReactDOM.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={loaderImage} alt='loader' />
            </div>
        </div>,
        document.getElementById('loader')
    )
  )
};

export const Spinner = () => {
    return (
        <div className='--center-all'>
            <img src={loaderImage} alt='loader' width={40}/>
        </div>
    )
}

export default Loader
