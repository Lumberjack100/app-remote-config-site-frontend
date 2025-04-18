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
  ratio: string;
  dataFormat: string;
  triggerValue: string;
  upperLimit: string;
  lowerLimit: string;
  correctValue: string;
  ngateval: string;
}

export interface SensorConfig {
  id: number;
  sensorID: number;
  sensorName: string;
  modelToken: string;
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