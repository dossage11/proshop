import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

    setAuth: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        })
      },
      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        // Also clear localStorage
       localStorage.removeItem("auth-storage");
      },

    logout: () => {
      set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      });
      localStorage.removeItem("auth-storage");
    
    },
  }),
  {
    name: 'auth-storage', // localStorage key
    // Only persist certain fields
    partialize: (state) => ({
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
    }),
  }
));

export default useAuthStore;