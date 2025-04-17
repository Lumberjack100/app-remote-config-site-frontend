<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>

      <!-- Center modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            传感器详情
          </h3>
          <button type="button" class="text-gray-400 hover:text-gray-500" @click="$emit('close')">
            <font-awesome-icon icon="times" class="h-5 w-5" />
          </button>
        </div>
        
        <div class="bg-white p-6 overflow-y-auto max-h-[70vh]">
          <template v-if="sensor">
            <!-- 传感器基本信息 -->
            <div class="mb-8">
              <h4 class="text-lg font-medium text-gray-900 mb-4">基本信息</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-500">传感器ID</p>
                  <p class="mt-1">{{ sensor.sensorId }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">传感器名称</p>
                  <p class="mt-1">{{ sensor.sensorName }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">物模型编号</p>
                  <p class="mt-1">{{ sensor.modelToken }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">物模型名称</p>
                  <p class="mt-1">{{ sensor.modelName }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">接口</p>
                  <p class="mt-1">{{ sensor.port }}</p>
                </div>
              </div>
            </div>
            
            <!-- 采集项信息 -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">采集项配置</h4>
              <div v-for="(field, index) in sensor.modelFields" :key="index" class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h5 class="font-medium text-gray-900 mb-3">采集项 {{ index + 1 }}</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-500">采集项名称</p>
                    <p class="mt-1">{{ field.collectionName }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">采集项单位</p>
                    <p class="mt-1">{{ field.collectionUnit }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">水文标识</p>
                    <p class="mt-1">{{ field.hydrologicalSign }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">采集指令</p>
                    <p class="mt-1">{{ field.collectionCommand }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">倍率</p>
                    <p class="mt-1">{{ field.ratio }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">数据类型</p>
                    <p class="mt-1">{{ field.dataType }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">触发值</p>
                    <p class="mt-1">{{ field.triggerValue }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">上限值</p>
                    <p class="mt-1">{{ field.upperLimit }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">下限值</p>
                    <p class="mt-1">{{ field.lowerLimit }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">修正值</p>
                    <p class="mt-1">{{ field.correctionValue }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">阈值次数</p>
                    <p class="mt-1">{{ field.thresholdCount }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        
        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
          <button 
            type="button" 
            class="btn-secondary"
            @click="$emit('close')"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SensorConfig } from '~/types';

defineProps<{
  sensor: SensorConfig | null;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script> 