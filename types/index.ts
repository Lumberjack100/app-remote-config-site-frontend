// User types
export interface User {
  id: number;
  account: string;
  name: string;
  companyId: number;
  companyName: string;
}

// Sensor configuration types
export interface SensorField {
  collectionName: string;
  collectionUnit: string;
  hydrologicalSign: string;
  collectionCommand: string;
  ratio: number;
  dataType: string;
  triggerValue: number;
  upperLimit: number;
  lowerLimit: number;
  correctionValue: number;
  thresholdCount: number;
}

export interface SensorConfig {
  id: string;
  sensorId: number;
  sensorName: string;
  modelToken: number;
  modelName: string;
  port: string;
  modelFields: SensorField[];
}

// API response types
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }
}

// Authentication types
export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
} 