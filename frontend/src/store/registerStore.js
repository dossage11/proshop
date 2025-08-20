import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import zustyMiddleware from "zustymiddleware";

const useRegisterStore = create(
  (set) => ({
    newUserInfo: null,
    addNewUser: (userData) => set((state) => {
        
      console.log(userData);
     return{ newUserInfo: userData };
    }),
  })
);

export default useRegisterStore;
    
