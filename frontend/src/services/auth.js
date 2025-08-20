import { get } from "react-hook-form";
import { api } from "../api/client";
import { auth_user, register_user,get_user, get_users, update_user_profile } from "../utils/endpoint";
import useAuthStore from "../store/authStore";


export const User= {

    

    authUser:async ({email,password})=> {
        const data = await api.post(auth_user({email,password}).endpoint, {
            email,password
        })

         return data
        
    },

    validateToken:async(token)=>{

   
        
        const response = await api.get('/user/profile',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    },

    authRegister:async ({name,email,password})=>{
        const data = await api.post(register_user().endpoint, {
            name,email,password
        })

        return data
    },

    getUserProfile:async (id)=>{
  const data = await api.get(get_user(id).endpoint)

     return data
},

    getUsers:async ()=>{

        const response = await api.get(get_users().endpoint)

       if (response.status !== 200) throw new Error(response.statusText);
      
       return response.data;
    },


    updateUserProfile: async ({id,name,email,password})=>{

        const response = await api.patch(update_user_profile(id).endpoint,{
            id,name,email,password
        })
        
        if (response.status !== 200) throw new Error(response.statusText);
        
        return response.data;

    }

}
