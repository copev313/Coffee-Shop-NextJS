import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import cls from "classnames"
import styles from "../../styles/coffee-store.module.css"
import coffeeStoresData from "../../data/coffee-stores.json"

export async function getStaticProps(staticProps) {
  const params = staticProps.params

  return {
    props: {
      coffeeStores: coffeeStoresData.find((store) => {
        return store.id.toString() === params.id
      }),
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const paths = coffeeStoresData.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

const CoffeeStore = (props) => {
  const router = useRouter()
  const { id } = router.query

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { address, name, neighborhood, imgUrl } = props.coffeeStores

  const handleUpvoteButton = () => {
    console.log("Upvote button clicked!")
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>

          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/places.svg"
              width={24}
              height={24}
              alt="Location Icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/nearMe.svg"
              width={24}
              height={24}
              alt="Neighvorhood Icon"
            />
            <p className={styles.text}>{neighborhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/star.svg"
              width={24}
              height={24}
              alt="Rating Icon"
            />
            <p className={styles.text}>{1}</p>
          </div>

          <button
            className={styles.upvoteButton}
            onclick={handleUpvoteButton}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore
