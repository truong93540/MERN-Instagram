import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../App'
import { setLoopData } from '../redux/loopSlice'

function GetAllLoops() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchLoops = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/loop/getAll`, {
                    withCredentials: true,
                })
                dispatch(setLoopData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchLoops()
    }, [dispatch, userData])
}

export default GetAllLoops
