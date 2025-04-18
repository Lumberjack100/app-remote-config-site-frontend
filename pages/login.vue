<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Android应用远程配置管理系统</h1>
        <p class="text-gray-600 mt-2">请登录您的账户</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="username" class="form-label">用户名</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <font-awesome-icon icon="user" class="text-gray-400" />
            </div>
            <input 
              v-model="username" 
              type="text" 
              id="username" 
              class="input pl-10" 
              placeholder="请输入用户名"
              :disabled="authStore.loading"
            >
          </div>
          <p v-if="errors.username" class="error-text">{{ errors.username }}</p>
        </div>
        
        <div>
          <label for="password" class="form-label">密码</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <font-awesome-icon icon="lock" class="text-gray-400" />
            </div>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              class="input pl-10" 
              placeholder="请输入密码"
              :disabled="authStore.loading"
            >
          </div>
          <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
        </div>
        
        <div>
          <button 
            type="submit" 
            class="btn w-full flex justify-center"
            :disabled="authStore.loading"
          >
            <span v-if="authStore.loading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </div>
        
        <div v-if="authStore.error" class="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          <font-awesome-icon icon="exclamation-circle" class="mr-2" />
          <span>{{ authStore.error }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';

// Define route middleware
definePageMeta({
  middleware: ['auth']
});

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const errors = reactive({
  username: '',
  password: ''
});

// Handle form submission
async function onSubmit() {
  // Reset errors
  errors.username = '';
  errors.password = '';
  
  // Validate form
  let isValid = true;
  
  if (!username.value.trim()) {
    errors.username = '请输入用户名';
    isValid = false;
  }
  
  if (!password.value.trim()) {
    errors.password = '请输入密码';
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Submit form
  const success = await authStore.login(username.value, password.value);
  
  if (success) {
    // Explicitly navigate to home page
    navigateTo('/');
  }
}
</script> 