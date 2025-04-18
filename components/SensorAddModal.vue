<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- Center modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            添加传感器配置
          </h3>
          <button type="button" class="text-gray-400 hover:text-gray-500" @click="$emit('close')">
            <font-awesome-icon icon="times" class="h-5 w-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="bg-white p-6 overflow-y-auto max-h-[70vh]">
            <!-- 传感器基本信息 -->
            <div class="mb-8">
              <h4 class="text-lg font-medium text-gray-900 mb-4">基本信息</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-group">
                  <label class="form-label">接口</label>
                  <select v-model="formData.port" class="input">
                    <option value="485-1">485-1</option>
                    <option value="485-2">485-2</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">传感器ID</label>
                  <input v-model="formData.sensorID" type="number" class="input" placeholder="请输入传感器ID"
                    :class="{'border-red-500': errors.sensorId}" min="1" max="999" />
                  <p v-if="errors.sensorId" class="error-text">{{ errors.sensorId }}</p>
                </div>
                <div class="form-group">
                  <label class="form-label">传感器名称</label>
                  <input v-model="formData.sensorName" type="text" class="input" placeholder="请输入传感器名称"
                    :class="{'border-red-500': errors.sensorName}" maxlength="30" />
                  <p v-if="errors.sensorName" class="error-text">{{ errors.sensorName }}</p>
                </div>
                <div class="form-group">
                  <label class="form-label">物模型编号</label>
                  <input v-model="formData.modelToken" type="number" class="input" placeholder="请输入物模型编号"
                    :class="{'border-red-500': errors.modelToken}" min="100" max="99999" />
                  <p v-if="errors.modelToken" class="error-text">{{ errors.modelToken }}</p>
                </div>
                <div class="form-group">
                  <label class="form-label">物模型名称</label>
                  <input v-model="formData.modelName" type="text" class="input" placeholder="请输入物模型名称"
                    :class="{'border-red-500': errors.modelName}" maxlength="30" />
                  <p v-if="errors.modelName" class="error-text">{{ errors.modelName }}</p>
                </div>
              </div>
            </div>

            <!-- 采集项信息 -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-medium text-gray-900">采集项配置</h4>
                <button type="button" class="btn-secondary text-sm py-1" @click="addModelField"
                  :disabled="formData.modelFieldList.length >= 2">
                  <font-awesome-icon icon="plus" class="mr-1" />
                  新增采集项
                </button>
              </div>

              <div v-for="(field, index) in formData.modelFieldList" :key="index"
                class="mb-6 p-4 bg-gray-50 rounded-lg relative">
                <div class="flex justify-between items-center mb-4">
                  <h5 class="font-medium text-gray-900">采集项 {{ index + 1 }}</h5>
                  <button v-if="formData.modelFieldList.length > 1" type="button" class="text-red-500 hover:text-red-700"
                    @click="removeModelField(index)">
                    <font-awesome-icon icon="trash" />
                    删除
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div class="form-group">
                    <label class="form-label">采集项名称</label>
                    <input v-model="field.fieldName" type="text" class="input" placeholder="请输入采集项名称"
                      :class="{'border-red-500': getFieldError(index, 'fieldName')}" maxlength="30" />
                    <p v-if="getFieldError(index, 'fieldName')" class="error-text">
                      {{ getFieldError(index, 'fieldName') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">采集项单位</label>
                    <input v-model="field.engUnit" type="text" class="input" placeholder="请输入采集项单位"
                      :class="{'border-red-500': getFieldError(index, 'engUnit')}" maxlength="10" />
                    <p v-if="getFieldError(index, 'engUnit')" class="error-text">
                      {{ getFieldError(index, 'engUnit') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">水文标识</label>
                    <input v-model="field.hydrologicalIdentification" type="text" class="input" placeholder="请输入水文标识"
                      :class="{'border-red-500': getFieldError(index, 'hydrologicalIdentification')}" maxlength="5" />
                    <p v-if="getFieldError(index, 'hydrologicalIdentification')" class="error-text">
                      {{ getFieldError(index, 'hydrologicalIdentification') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">采集指令</label>
                    <input v-model="field.collectionInstructions" type="text" class="input" placeholder="请输入采集指令"
                      :class="{'border-red-500': getFieldError(index, 'collectionInstructions')}" maxlength="10" />
                    <p v-if="getFieldError(index, 'collectionInstructions')" class="error-text">
                      {{ getFieldError(index, 'collectionInstructions') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">倍率</label>
                    <input v-model="field.ratio" type="number" class="input" placeholder="请输入倍率"
                      :class="{'border-red-500': getFieldError(index, 'ratio')}" step="any" />
                    <p v-if="getFieldError(index, 'ratio')" class="error-text">
                      {{ getFieldError(index, 'ratio') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">数据类型</label>
                    <input v-model="field.dataFormat" type="text" class="input" placeholder="请输入数据类型"
                      :class="{'border-red-500': getFieldError(index, 'dataFormat')}" maxlength="30" />
                    <p v-if="getFieldError(index, 'dataFormat')" class="error-text">
                      {{ getFieldError(index, 'dataFormat') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">触发值</label>
                    <input v-model="field.triggerValue" type="number" class="input" placeholder="请输入触发值"
                      :class="{'border-red-500': getFieldError(index, 'triggerValue')}" step="any" />
                    <p v-if="getFieldError(index, 'triggerValue')" class="error-text">
                      {{ getFieldError(index, 'triggerValue') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">上限值</label>
                    <input v-model="field.upperLimit" type="number" class="input" placeholder="请输入上限值"
                      :class="{'border-red-500': getFieldError(index, 'upperLimit')}" step="any" />
                    <p v-if="getFieldError(index, 'upperLimit')" class="error-text">
                      {{ getFieldError(index, 'upperLimit') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">下限值</label>
                    <input v-model="field.lowerLimit" type="number" class="input" placeholder="请输入下限值"
                      :class="{'border-red-500': getFieldError(index, 'lowerLimit')}" step="any" />
                    <p v-if="getFieldError(index, 'lowerLimit')" class="error-text">
                      {{ getFieldError(index, 'lowerLimit') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">修正值</label>
                    <input v-model="field.correctValue" type="number" class="input" placeholder="请输入修正值"
                      :class="{'border-red-500': getFieldError(index, 'correctValue')}" step="any" />
                    <p v-if="getFieldError(index, 'correctValue')" class="error-text">
                      {{ getFieldError(index, 'correctValue') }}
                    </p>
                  </div>
                  <div class="form-group">
                    <label class="form-label">阈值次数</label>
                    <input v-model="field.ngateval" type="number" class="input" placeholder="请输入阈值次数"
                      :class="{'border-red-500': getFieldError(index, 'ngateval')}" min="1" max="999" />
                    <p v-if="getFieldError(index, 'ngateval')" class="error-text">
                      {{ getFieldError(index, 'ngateval') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
            <button type="button" class="btn-secondary mr-2" @click="$emit('close')">
              取消
            </button>
            <button type="submit" class="btn" :disabled="loading">
              <span v-if="loading">保存中...</span>
              <span v-else>保存</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useSensorConfigStore } from '~/stores/sensorConfig';
import type { SensorConfig } from '../types';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const sensorStore = useSensorConfigStore();
const loading = ref(false);

// Initialize form data
const formData = reactive<SensorConfig>(sensorStore.createNewSensor());

// Field level validation errors
const fieldErrors = ref<Record<number, Record<string, string>>>({});

// Form level errors
const errors = reactive({
  sensorId: '',
  sensorName: '',
  modelToken: '',
  modelName: '',
});

// Add a new model field
function addModelField() {
  if (formData.modelFieldList.length < 2) {
    formData.modelFieldList.push(sensorStore.createNewSensorField());
  }
}

// Remove a model field
function removeModelField(index: number) {
  if (formData.modelFieldList.length > 1) {
    formData.modelFieldList.splice(index, 1);
    
    // Also remove any errors for this field
    const newFieldErrors = {...fieldErrors.value};
    delete newFieldErrors[index];
    
    // Reindex the errors for fields after the removed one
    for (let i = index; i < formData.modelFieldList.length; i++) {
      if (newFieldErrors[i + 1]) {
        newFieldErrors[i] = newFieldErrors[i + 1];
        delete newFieldErrors[i + 1];
      }
    }
    
    fieldErrors.value = newFieldErrors;
  }
}

// Get field-level error
function getFieldError(fieldIndex: number, fieldName: string): string {
  return fieldErrors.value[fieldIndex]?.[fieldName] || '';
}

// Validate the form
function validateForm(): boolean {
  let isValid = true;
  
  // Reset errors
  errors.sensorId = '';
  errors.sensorName = '';
  errors.modelToken = '';
  errors.modelName = '';
  fieldErrors.value = {};
  
  // Validate basic info
  if (!formData.sensorID) {
    errors.sensorId = '请输入传感器ID';
    isValid = false;
  } else if (formData.sensorID < 1 || formData.sensorID > 999) {
    errors.sensorId = '传感器ID必须为1-999之间的整数';
    isValid = false;
  }
  
  if (!formData.sensorName.trim()) {
    errors.sensorName = '请输入传感器名称';
    isValid = false;
  } else if (formData.sensorName.length > 30) {
    errors.sensorName = '传感器名称不能超过30个字符';
    isValid = false;
  }
  
  if (!formData.modelToken) {
    errors.modelToken = '请输入物模型编号';
    isValid = false;
  } 
  
  if (!formData.modelName.trim()) {
    errors.modelName = '请输入物模型名称';
    isValid = false;
  } else if (formData.modelName.length > 30) {
    errors.modelName = '物模型名称不能超过30个字符';
    isValid = false;
  }
  
  // Validate each model field
  formData.modelFieldList.forEach((field, index) => {
    const fieldError: Record<string, string> = {};
    
    if (!field.fieldName.trim()) {
      fieldError.fieldName = '请输入采集项名称';
      isValid = false;
    } else if (field.fieldName.length > 30) {
      fieldError.fieldName = '采集项名称不能超过30个字符';
      isValid = false;
    }
    
    if (!field.engUnit.trim()) {
      fieldError.engUnit = '请输入采集项单位';
      isValid = false;
    } else if (field.engUnit.length > 10) {
      fieldError.engUnit = '采集项单位不能超过10个字符';
      isValid = false;
    }
    
    if (!field.hydrologicalIdentification.trim()) {
      fieldError.hydrologicalIdentification = '请输入水文标识';
      isValid = false;
    } else if (!/^[0-9a-zA-Z]{1,5}$/.test(field.hydrologicalIdentification)) {
      fieldError.hydrologicalIdentification = '水文标识必须为1-5位数字/字母';
      isValid = false;
    }
    
    if (!field.collectionInstructions.trim()) {
      fieldError.collectionInstructions = '请输入采集指令';
      isValid = false;
    } else if (!/^[0-9a-zA-Z]{1,10}$/.test(field.collectionInstructions)) {
      fieldError.collectionInstructions = '采集指令必须为1-10位数字/字母';
      isValid = false;
    }
    
    if (field.ratio === undefined || field.ratio === null) {
      fieldError.ratio = '请输入倍率';
      isValid = false;
    }
    
    if (!field.dataFormat.trim()) {
      fieldError.dataFormat = '请输入数据类型';
      isValid = false;
    } else if (field.dataFormat.length > 30) {
      fieldError.dataFormat = '数据类型不能超过30个字符';
      isValid = false;
    }
    
    if (field.triggerValue === undefined || field.triggerValue === null) {
      fieldError.triggerValue = '请输入触发值';
      isValid = false;
    }
    
    if (field.upperLimit === undefined || field.upperLimit === null) {
      fieldError.upperLimit = '请输入上限值';
      isValid = false;
    }
    
    if (field.lowerLimit === undefined || field.lowerLimit === null) {
      fieldError.lowerLimit = '请输入下限值';
      isValid = false;
    }
    
    if (field.correctValue === undefined || field.correctValue === null) {
      fieldError.correctValue = '请输入修正值';
      isValid = false;
    }
    
    if (!field.ngateval) {
      fieldError.ngateval = '请输入阈值次数';
      isValid = false;
    } else if (parseInt(field.ngateval) < 1 || parseInt(field.ngateval) > 999) {
      fieldError.ngateval = '阈值次数必须为1-999之间的整数';
      isValid = false;
    }
    
    if (Object.keys(fieldError).length > 0) {
      fieldErrors.value[index] = fieldError;
    }
  });
  
  return isValid;
}

// 在提交表单前，确保数值字段保持字符串类型
function prepareFormData() {
  formData.modelFieldList.forEach(field => {
    field.ratio = field.ratio.toString();
    field.triggerValue = field.triggerValue.toString();
    field.upperLimit = field.upperLimit.toString();
    field.lowerLimit = field.lowerLimit.toString();
    field.correctValue = field.correctValue.toString();
    field.ngateval = field.ngateval.toString();
  });
}

// Handle form submission
async function handleSubmit() {
  if (!validateForm()) return;
  
  // 确保数值字段以字符串形式提交
  prepareFormData();
  
  loading.value = true;
  try {
    const newSensor = { ...formData };
    delete (newSensor as any).id; // Remove ID for the create operation
    
    await sensorStore.addSensor(newSensor);
    emit('saved');
  } catch (error) {
    console.error('Error saving sensor:', error);
  } finally {
    loading.value = false;
  }
}
</script> 