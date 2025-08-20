import { useQueryClient } from "@tanstack/react-query"

export const useTokenValidation = () =>{
    const queryClient = useQueryClient()
    
    return useQuery({
        queryKey: ['validate-token'],
        queryFn: async () => {
        const token = localStorage.getItem('token') // or wherever you store it
        if (!token) throw new Error('No token found')
        
        return User.validateToken(token)
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: () => {
        // Clear user data if token is invalid
        queryClient.setQueryData(['user'], null)
        localStorage.removeItem('token')

           // Redirect to login
      navigate('/login')
      
      // Show notification
      toast.error('Session expired. Please log in again.')
        }
    })
}