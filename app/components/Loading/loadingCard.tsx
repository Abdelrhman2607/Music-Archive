import styles from './loadingCard.module.css'

export default function loadingCard(){
    return(
        <p className={`${styles.loadingCard} radialShine`}>
            LOADING...
        </p>
);
}