<template>
  <div>
    <div class="flex items-center mb-6">
      <button @click="navigateTo('/')" class="flex items-center text-blue-600 hover:text-blue-800">
        <font-awesome-icon icon="chevron-left" class="mr-1" />
        返回
      </button>
      <h1 class="text-2xl font-bold ml-4">MR702-遥测终端机传感器配置</h1>
    </div>
    
    <!-- 筛选区域 -->
    <div class="card mb-6">
      <div class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="w-full md:w-auto">
          <label class="form-label">接口</label>
          <select 
            v-model="sensorStore.filter.port" 
            class="input" 
            @change="handleSearch"
          >
            <option value="">全部</option>
            <option value="485-1">485-1</option>
            <option value="485-2">485-2</option>
          </select>
        </div>
        
        <div class="w-full md:flex-1">
          <label class="form-label">传感器名称</label>
          <div class="relative">
            <input 
              v-model="sensorStore.filter.sensorName" 
              type="text" 
              class="input pr-10" 
              placeholder="输入传感器名称"
            >
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <font-awesome-icon icon="search" class="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div class="flex items-end">
          <button @click="handleSearch" class="btn">
            查询
          </button>
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex justify-between mb-4">
      <div>
        <button @click="showAddModal = true" class="btn mr-2">
          <font-awesome-icon icon="plus" class="mr-1" />
          添加传感器
        </button>
        <button 
          @click="handleDelete" 
          class="btn-secondary" 
          :disabled="sensorStore.selectedSensorIds.length === 0"
        >
          <font-awesome-icon icon="trash" class="mr-1" />
          删除
        </button>
      </div>
      <div class="text-gray-600">
        共 {{ sensorStore.total }} 条记录
      </div>
    </div>
    
    <!-- 数据表格 -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input 
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                  :checked="isAllSelected" 
                  @change="toggleAllSelection"
                >
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                传感器ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                传感器名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                物模型编号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                物模型名称
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="sensorStore.loading" class="animate-pulse">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                加载中...
              </td>
            </tr>
            <tr v-else-if="sensorStore.sensorList.length === 0" class="hover:bg-gray-50">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                暂无数据
              </td>
            </tr>
            <template v-else>
              <tr v-for="sensor in sensorStore.sensorList" :key="sensor.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    :checked="sensorStore.selectedSensorIds.includes(sensor.id)"
                    @change="() => sensorStore.toggleSelectSensor(sensor.id)"
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ sensor.sensorId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ sensor.sensorName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ sensor.modelToken }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ sensor.modelName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button @click="viewSensor(sensor)" class="text-blue-600 hover:text-blue-900">
                    <font-awesome-icon icon="eye" />
                  </button>
                  <button @click="editSensor(sensor)" class="text-green-600 hover:text-green-900">
                    <font-awesome-icon icon="edit" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 分页 -->
    <div class="flex justify-center">
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="prevPage" 
            :disabled="sensorStore.page === 1"
            class="btn-secondary"
          >
            上一页
          </button>
          <button 
            @click="nextPage" 
            :disabled="sensorStore.page * sensorStore.pageSize >= sensorStore.total"
            class="btn-secondary"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示第 
              <span class="font-medium">{{ ((sensorStore.page - 1) * sensorStore.pageSize) + 1 }}</span>
              至
              <span class="font-medium">
                {{ Math.min(sensorStore.page * sensorStore.pageSize, sensorStore.total) }}
              </span>
              条，共
              <span class="font-medium">{{ sensorStore.total }}</span>
              条结果
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="prevPage" 
                :disabled="sensorStore.page === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <font-awesome-icon icon="chevron-left" class="h-5 w-5" />
              </button>
              
              <button 
                @click="nextPage" 
                :disabled="sensorStore.page * sensorStore.pageSize >= sensorStore.total"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <font-awesome-icon icon="chevron-right" class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 添加传感器模态框 -->
    <SensorAddModal 
      v-if="showAddModal" 
      @close="showAddModal = false" 
      @saved="handleSaved"
    />
    
    <!-- 编辑传感器模态框 -->
    <SensorEditModal 
      v-if="showEditModal" 
      :sensor="currentSensor"
      @close="showEditModal = false" 
      @saved="handleSaved"
    />
    
    <!-- 查看传感器详情模态框 -->
    <SensorDetailModal 
      v-if="showDetailModal" 
      :sensor="currentSensor"
      @close="showDetailModal = false" 
    />
    
    <!-- 确认删除模态框 -->
    <ConfirmModal 
      v-if="showDeleteConfirm" 
      title="确认删除" 
      message="确定要删除选中的传感器配置吗？此操作不可撤销。" 
      @confirm="confirmDelete" 
      @cancel="showDeleteConfirm = false" 
    />
  </div>
</template>

<script setup lang="ts">
// Define route middleware
definePageMeta({
  middleware: ['auth']
});

import { ref, computed, onMounted } from 'vue';
import { useSensorConfigStore } from '~/stores/sensorConfig';
import type { SensorConfig } from '~/types';

// Get store
const sensorStore = useSensorConfigStore();

// State
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const showDeleteConfirm = ref(false);
const currentSensor = ref<SensorConfig | null>(null);

// Computed
const isAllSelected = computed(() => {
  return sensorStore.sensorList.length > 0 && 
    sensorStore.selectedSensorIds.length === sensorStore.sensorList.length;
});

// Methods
function handleSearch() {
  sensorStore.setPage(1);
  fetchSensorList();
}

async function fetchSensorList() {
  await sensorStore.fetchSensorList();
}

function toggleAllSelection() {
  if (isAllSelected.value) {
    sensorStore.unselectAllSensors();
  } else {
    sensorStore.selectAllSensors();
  }
}

function prevPage() {
  if (sensorStore.page > 1) {
    sensorStore.setPage(sensorStore.page - 1);
    fetchSensorList();
  }
}

function nextPage() {
  if (sensorStore.page * sensorStore.pageSize < sensorStore.total) {
    sensorStore.setPage(sensorStore.page + 1);
    fetchSensorList();
  }
}

function viewSensor(sensor: SensorConfig) {
  currentSensor.value = sensor;
  showDetailModal.value = true;
}

function editSensor(sensor: SensorConfig) {
  currentSensor.value = sensor;
  showEditModal.value = true;
}

function handleDelete() {
  if (sensorStore.selectedSensorIds.length > 0) {
    showDeleteConfirm.value = true;
  }
}

async function confirmDelete() {
  await sensorStore.deleteSensors(sensorStore.selectedSensorIds);
  showDeleteConfirm.value = false;
}

function handleSaved() {
  showAddModal.value = false;
  showEditModal.value = false;
  fetchSensorList();
}

// Fetch sensor list on mount
onMounted(() => {
  fetchSensorList();
});
</script> 