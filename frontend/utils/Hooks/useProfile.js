import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import authApi from "../Api/auth.api"
import { useAuthToken } from '../../contexts/authContext'


const useProfile = () => {
    const [profile, setProfile] = useState(undefined)
    const [error, setError] = useState(undefined)
    const token = useAuthToken()
    const queryClinent = useQueryClient()
    const { isLoading } = useQuery({
        queryFn: () => authApi.getUserDetail(localStorage.getItem("token")),
        queryKey: "profile",
        onSuccess: (data) => {
            setProfile(data)
            localStorage.setItem("token", data.token);
        }
    })
    const { isLoading: isLoading2, mutate: chnageProfileImage } = useMutation({
        mutationFn: (data) => authApi.updateProfilePic(token, data), onSuccess: () => {
            queryClinent.invalidateQueries("profile")
        }
    })
    return {
        isLoading: isLoading || isLoading2,
        profile,
        chnageProfileImage
    }
}


export default useProfile
