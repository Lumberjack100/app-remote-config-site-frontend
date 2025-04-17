<template>
  <div class="min-h-screen bg-gray-100">
    <header v-if="authStore.isAuthenticated" class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">Android应用远程配置管理系统</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ authStore.user?.name }}</span>
          <button @click="logout" class="text-gray-600 hover:text-gray-800">
            <font-awesome-icon icon="sign-out-alt" class="mr-1" />
            退出
          </button>
        </div>
      </div>
    </header>
    
    <main class="container mx-auto py-6 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script> 