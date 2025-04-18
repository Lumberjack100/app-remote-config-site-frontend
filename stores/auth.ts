import { defineStore } from 'pinia';
import type { User, UserInfo } from '../types';

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
        console.log('Attempting login for account:', account);
        const response = await api.auth.login({ account, password });
        console.log('Login response:', { code: response.code, hasData: !!response.data });
        
        if (response.code === 0) {
          const token = useCookie('token');
          token.value = response.data;
          console.log('Login successful, token saved');
          
          await this.fetchUserInfo(); // Get user info after successful login
          console.log('After fetchUserInfo - isAuthenticated:', this.isAuthenticated);
          return true;
        } else {
          this.error = response.msg || '登录失败';
          console.log('Login failed:', this.error);
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '登录失败';
        console.error('Login error:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUserInfo() {
      const api = useApi();
      const token = useCookie('token');
      
      console.log('fetchUserInfo called, hasToken:', !!token.value);
      
      if (!token.value) {
        this.isAuthenticated = false;
        console.log('No token available');
        return false;
      }
      
      this.loading = true;
      
      try {
        console.log('Fetching user info with token');
        const response = await api.auth.getUserInfo();
        console.log('User info response:', { code: response.code, data: response.data });
        
        if (response.code === 0) {
          // Map the UserInfo fields to the User interface
          this.user = {
            id: response.data.subjectID,
            name: response.data.subjectName,
            account: '', // We don't have this info from the API
            companyId: response.data.companyID,
            companyName: response.data.companyName
          };
          this.isAuthenticated = true;
          console.log('User info fetched successfully:', this.user);
          return true;
        } else {
          token.value = null;
          this.isAuthenticated = false;
          console.log('Failed to fetch user info:', response.msg);
          return false;
        }
      } catch (error) {
        token.value = null;
        this.isAuthenticated = false;
        console.error('Error fetching user info:', error);
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