// User types
export interface User {
  id: number;
  account: string;
  name: string;
  companyId: number;
  companyName: string;
}

export interface UserInfo {
  subjectID: number;
  subjectName: string;
  companyID: number;
  companyName: string;
}

// Sensor configuration types
export interface SensorField {
  fieldName: string;
  engUnit: string;
  hydrologicalIdentification: string;
  collectionInstructions: string;
  ratio: number;
  dataFormat: string;
  triggerValue: number;
  upperLimit: number;
  lowerLimit: number;
  correctValue: number;
  ngateval: number;
}

export interface SensorConfig {
  id: string;
  sensorID: number;
  sensorName: string;
  modelToken: number;
  modelName: string;
  port: string;
  modelFieldList: SensorField[];
}

// API response types
export interface ApiResponse<T> {
  code: number;
  msg: string | null;
  data: T;
}

export interface PaginatedResponse<T> {
  code: number;
  msg: string | null;
  data: {
    sensorList: T[];
    total?: number;
  }
}

// Authentication types
export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
} 