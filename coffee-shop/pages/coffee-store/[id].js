import { useRouter } from 'next/router'
import Link from 'next/link'


const CoffeeStore = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Link href="/">
                <a>Back to home</a>
            </Link>

            <h1>Coffee Store</h1>
        </div>
    )
}


export default CoffeeStore
