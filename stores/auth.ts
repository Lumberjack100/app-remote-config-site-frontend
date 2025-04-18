import { defineStore } from 'pinia';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async login(account: string, password: string) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.auth.login({ account, password });
        if (response.code === 200) {
          const token = useCookie('token');
          token.value = response.data.token;
          this.user = response.data.user;
          this.isAuthenticated = true;
          return true;
        } else {
          this.error = response.message || '登录失败';
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '登录失败';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUserInfo() {
      const api = useApi();
      const token = useCookie('token');
      
      if (!token.value) {
        this.isAuthenticated = false;
        return false;
      }
      
      this.loading = true;
      
      try {
        const response = await api.auth.getUserInfo();
        if (response.code === 200) {
          this.user = response.data;
          this.isAuthenticated = true;
          return true;
        } else {
          token.value = null;
          this.isAuthenticated = false;
          return false;
        }
      } catch (error) {
        token.value = null;
        this.isAuthenticated = false;
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      const token = useCookie('token');
      token.value = null;
      this.user = null;
      this.isAuthenticated = false;
      navigateTo('/login');
    },
  },
}); 