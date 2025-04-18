import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse, PaginatedResponse, LoginRequest, LoginResponse, SensorConfig } from '../types';

export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie('token');
  
  const instance: AxiosInstance = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      if (token.value) {
        config.headers['Authorization'] = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized - redirect to login
      if (error.response && error.response.status === 401) {
        token.value = null;
        navigateTo('/login');
      }
      return Promise.reject(error);
    }
  );
  
  // Auth API
  const auth = {
    login: (data: LoginRequest) => 
      instance.post<ApiResponse<LoginResponse>>('/auth/SignIn', data).then(res => res.data),
    
    getUserInfo: () => 
      instance.get<ApiResponse<any>>('/auth/GetUserByToken').then(res => res.data),
  };
  
  // Sensor Config API
  const sensorConfig = {
    getList: (params: { page: number, pageSize: number, port?: string, sensorName?: string }) => 
      instance.get<PaginatedResponse<SensorConfig>>('/config/QueryMR702SensorConfigList', { params }).then(res => res.data),
    
    addSensor: (data: Omit<SensorConfig, 'id'>) => 
      instance.post<ApiResponse<any>>('/config/AddMR702SensorConfigItem', data).then(res => res.data),
    
    editSensor: (data: SensorConfig) => 
      instance.post<ApiResponse<any>>('/config/EditMR702SensorConfigItem', data).then(res => res.data),
    
    deleteSensor: (ids: string[]) => 
      instance.post<ApiResponse<any>>('/config/BatchDeleteMR702SensorConfigItem', { ids }).then(res => res.data),
  };
  
  return {
    auth,
    sensorConfig,
  };
}; 