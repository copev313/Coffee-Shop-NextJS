import styles from "../styles/Banner.module.css"

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>{" "}
        <span className={styles.title2}>Shoppe</span>
      </h1>
      <p className={styles.subtitle}>Discover local coffee shops near you!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}

export default Banner
