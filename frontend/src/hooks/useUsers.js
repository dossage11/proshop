

import toast from 'react-hot-toast'
import { User } from '../services/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '../store/authStore'

  export const   useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: User.getUsers,

    onSuccess: (data) => {
      console.log('Query successful:', data)
    },
    onError: (error) => {
      console.error('Query error:', error)
    },
    retry: (failureCount, error) => {
      // Don't retry on 304 or other "success" statuses
      return failureCount < 3
    }
  })
}

export const useUpdateProfile = ()=>{

  const {setAuth,token} = useAuthStore()
   const queryClient = useQueryClient();
   const {mutate:updateUser,isLoading:isUpdating}= useMutation({
    mutationFn: async(data)=>{
 
      const response = await User.updateUserProfile(data)
   
     return response
    },
    onSuccess:(response)=>{

      console.log(response);
      const {password,...userData}= response
    
      setAuth(userData,token)
      toast.success('Your profile is successfully updated');
      queryClient.invalidateQueries({
        queryKey:['user']
      })
    },onError:(err)=>{
      toast.error(err.message)
    }
   })

   return {updateUser,isUpdating}
}