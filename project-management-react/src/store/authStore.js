import { create } from "zustand";

const API_URL = "http://localhost:3005/v1/auth";

export const useAuthStore = create((set) => ({
  user: {},
  tokens: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });
      if (response.status !== 201) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      set({ isLoading: false, isAuthenticated: true, user: response });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (response.status !== 200) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      set({ isLoading: false, isAuthenticated: true, user: data.user, tokens: data.tokens });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
  
    try {
      const tokenData = JSON.parse(localStorage.getItem('tokens'));
      const userData = JSON.parse(localStorage.getItem('user'));
  
      if (!tokenData || !tokenData.access || !userData) {
        // No token or user found
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
        return false;
      }
  
      const now = new Date();
      const expiresAt = new Date(tokenData.access.expires);
  
      if (now >= expiresAt) {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
        return false;
      }
  
      // Token is still valid
      set({ isAuthenticated: true, user: userData, isCheckingAuth: false });
      return true;
      
    } catch (error) {
      console.log(error);
      set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      return false;
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // const tokenData = JSON.parse(localStorage.getItem('tokens'));
  
      // if (!tokenData || !tokenData.refresh) {
      //   throw new Error('No refresh token available.');
      // }
  
      // const response = await fetch(`${API_URL}/logout`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     refreshToken: tokenData.refresh.token,  // 👈 send refresh token here
      //   }),
      // });
  
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to log out');
      // }
  
      // Clear localStorage tokens after successful logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));
