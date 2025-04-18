import { defineStore } from 'pinia';
import type { SensorConfig, SensorField } from '../types';

const DEFAULT_SENSOR_FIELD: SensorField = {
  fieldName: '',
  engUnit: '',
  hydrologicalIdentification: '',
  collectionInstructions: '',
  ratio: 1,
  dataFormat: '',
  triggerValue: 0,
  upperLimit: 0,
  lowerLimit: 0,
  correctValue: 0,
  ngateval: 1
};

export const useSensorConfigStore = defineStore('sensorConfig', {
  state: () => ({
    sensorList: [] as SensorConfig[],
    selectedSensorIds: [] as string[],
    currentSensor: null as SensorConfig | null,
    loading: false,
    error: null as string | null,
    total: 0,
    page: 1,
    pageSize: 20,
    filter: {
      port: '',
      sensorName: ''
    }
  }),
  
  getters: {
    selectedSensors: (state) => {
      return state.sensorList.filter(sensor => state.selectedSensorIds.includes(sensor.id));
    },
  },
  
  actions: {
    async fetchSensorList() {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          port: this.filter.port || undefined,
          sensorName: this.filter.sensorName || undefined
        };
        console.log('Fetching sensor list with params:', params);
        
        const response = await api.sensorConfig.getList(params);
        console.log('API response:', response);
        
        if (response.code === 0) {
          console.log('Response data structure:', response.data);
          
          if (response.data && response.data.sensorList) {
            this.sensorList = response.data.sensorList.map((item: any) => ({
              id: item.id.toString(),
              sensorId: item.sensorID || 0,
              sensorName: item.sensorName || '',
              modelToken: parseInt(item.modelToken) || 0,
              modelName: item.modelName || '',
              port: item.port || '',
              modelFields: (item.modelFieldList || []).map((field: any) => ({
                collectionName: field.fieldName || '',
                collectionUnit: field.engUnit || '',
                hydrologicalSign: field.hydrologicalIdentification || '',
                collectionCommand: field.collectionInstructions || '',
                ratio: parseFloat(field.ratio) || 1,
                dataType: field.dataFormat || '',
                triggerValue: parseFloat(field.triggerValue) || 0,
                upperLimit: parseFloat(field.upperLimit) || 0,
                lowerLimit: parseFloat(field.lowerLimit) || 0,
                correctionValue: parseFloat(field.correctValue) || 0,
                thresholdCount: parseInt(field.ngateval) || 1
              }))
            }));
            
            this.total = response.data.total || this.sensorList.length;
            console.log('Transformed sensorList:', this.sensorList, 'total:', this.total);
            return true;
          } else {
            this.sensorList = [];
            this.total = 0;
            console.log('No sensor list data found in response');
            return true;
          }
        } else {
          this.error = response.msg || '获取传感器列表失败';
          console.error('API error:', this.error);
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '获取传感器列表失败';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async addSensor(sensor: Omit<SensorConfig, 'id'>) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.sensorConfig.addSensor(sensor);
        if (response.code === 200) {
          await this.fetchSensorList();
          return true;
        } else {
          this.error = response.msg || '添加传感器失败';
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '添加传感器失败';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async editSensor(sensor: SensorConfig) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.sensorConfig.editSensor(sensor);
        if (response.code === 200) {
          await this.fetchSensorList();
          return true;
        } else {
          this.error = response.msg || '编辑传感器失败';
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '编辑传感器失败';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteSensors(ids: string[]) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.sensorConfig.deleteSensor(ids);
        if (response.code === 200) {
          this.selectedSensorIds = this.selectedSensorIds.filter(id => !ids.includes(id));
          await this.fetchSensorList();
          return true;
        } else {
          this.error = response.msg || '删除传感器失败';
          return false;
        }
      } catch (error: any) {
        this.error = error.message || '删除传感器失败';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    toggleSelectSensor(id: string) {
      const index = this.selectedSensorIds.indexOf(id);
      if (index === -1) {
        this.selectedSensorIds.push(id);
      } else {
        this.selectedSensorIds.splice(index, 1);
      }
    },
    
    selectAllSensors() {
      this.selectedSensorIds = this.sensorList.map(sensor => sensor.id);
    },
    
    unselectAllSensors() {
      this.selectedSensorIds = [];
    },
    
    createNewSensor(): SensorConfig {
      return {
        id: '',
        sensorID: 0,
        sensorName: '',
        modelToken: 0,
        modelName: '',
        port: '485-1',
        modelFieldList: [{ ...DEFAULT_SENSOR_FIELD }]
      };
    },
    
    createNewSensorField(): SensorField {
      return { ...DEFAULT_SENSOR_FIELD };
    },
    
    setFilter(filter: { port?: string, sensorName?: string }) {
      if (filter.port !== undefined) this.filter.port = filter.port;
      if (filter.sensorName !== undefined) this.filter.sensorName = filter.sensorName;
      this.page = 1; // Reset to first page when changing filters
    },
    
    setPage(page: number) {
      this.page = page;
    }
  },
}); 