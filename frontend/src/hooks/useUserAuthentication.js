
import { useQueryClient,useMutation } from '@tanstack/react-query'
import { User } from '../services/auth'
import toast from 'react-hot-toast'
import {  useNavigate} from 'react-router-dom'
import useAuthStore from '../store/authStore'
export  const useAuthentication=()=> {

   const {setAuth,clearAuth} = useAuthStore()
 const navigate = useNavigate()
 const queryClient = useQueryClient()
 const {mutate:login, isLoading} = useMutation({
 
    mutationFn:({email,password})=>User.authUser({email,password}),
    onSuccess:async(response)=>{
        const {token} = response.data

      setAuth(response.data,token)
        
        queryClient.setQueryData(['user'],response.data)
       
      try {
        // Validate the token first
        await User.validateToken(token)
        
        // Only navigate if validation succeeds
        navigate('/',{replace:true}) // 👈 Navigate AFTER validation
              toast.success('Successfully logged-in')
      } catch (error) {
        // Token validation failed
      console.log("Token validation failed", error)
      clearAuth() // Clear any previous auth state
        queryClient.setQueryData(['user'], null)
        toast.error('Token validation failed')
      }
    },onError:(err)=>{
        console.log("ERROR", err.message);
        toast.error("Provided email or password are incorrect");
    }
 }) 


    return {login,isLoading}
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { clearAuth } = useAuthStore()

  const logout = () => {
    localStorage.removeItem('token')
    clearAuth()
    queryClient.setQueryData(['user'], null)
  }

  return { logout }
}


export  const  useCreateUser  = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn:((newUser)=>User.authRegister(newUser)),
  onSuccess:(response)=>{
    queryClient.invalidateQueries({
      queryKey: ['user']
    })
    navigate('/login', { replace: true })
    toast.success('Successfully registered')
    console.log(response,"response");
    
  },
    onError: (error) => {
 

      if(error.response.data.success === false){
        toast.error(error.response.data.message)
      }


      }
 })}
