import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import cls from "classnames"
import styles from "../../styles/coffee-store.module.css"
// import coffeeStoresData from "../../data/coffee-stores.json"
import { fetchCoffeeStores } from "../../lib/coffee-stores"

export async function getStaticProps(staticProps) {
  const params = staticProps.params
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores: coffeeStores.find((store) => {
        return store.fsq_id.toString() === params.id
      }),
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()
  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: store.fsq_id.toString(),
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

  const { location, name, imgUrl } = props.coffeeStores

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
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
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
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/nearMe.svg"
              width={24}
              height={24}
              alt="Neighvorhood Icon"
            />
            <p className={styles.text}>{location.neighborhood[0]}</p>
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
            onClick={handleUpvoteButton}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore
