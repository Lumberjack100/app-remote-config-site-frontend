export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('token');
  const authStore = useAuthStore();
  
  // If token exists but we don't have user info, try to fetch it
  if (token.value && !authStore.isAuthenticated) {
    await authStore.fetchUserInfo();
  }
  
  // If user is not authenticated and not going to login page, redirect to login
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
  
  // If user is authenticated and going to login page, redirect to home
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/');
  }
}); 