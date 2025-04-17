<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">配置模块</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- MR702-遥测终端机传感器配置 -->
      <div class="card hover:shadow-lg transition-all cursor-pointer" @click="navigateTo('/sensor-config')">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">MR702-遥测终端机传感器配置</h2>
          <font-awesome-icon icon="edit" class="text-blue-500 text-xl" />
        </div>
        <p class="text-gray-600 mb-4">
          管理MR702-遥测终端机传感器的各项配置参数，包括传感器基本信息和采集项配置。
        </p>
        <div class="flex justify-end">
          <button class="btn-secondary">
            进入配置
            <font-awesome-icon icon="chevron-right" class="ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define route middleware
definePageMeta({
  middleware: ['auth']
});
</script> 