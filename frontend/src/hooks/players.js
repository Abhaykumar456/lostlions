import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const Allusers = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: players, error } = useSWR('/api/user', () =>
        axios
            .get('api/v1/getRandomResult')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        players
    }
}
