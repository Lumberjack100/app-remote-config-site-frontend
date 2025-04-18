export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('token');
  const authStore = useAuthStore();
  
  console.log('Auth middleware triggered for path:', to.path);
  console.log('Authentication state:', { 
    hasToken: !!token.value, 
    isAuthenticated: authStore.isAuthenticated 
  });
  
  // If token exists but we don't have user info, try to fetch it
  if (token.value && !authStore.isAuthenticated) {
    console.log('Fetching user info with token');
    await authStore.fetchUserInfo();
    console.log('After fetch - isAuthenticated:', authStore.isAuthenticated);
  }
  
  // If user is not authenticated and not going to login page, redirect to login
  if (!authStore.isAuthenticated && to.path !== '/login') {
    console.log('Not authenticated, redirecting to login');
    return navigateTo('/login');
  }
  
  // If user is authenticated and going to login page, redirect to home
  if (authStore.isAuthenticated && to.path === '/login') {
    console.log('Already authenticated, redirecting to home');
    return navigateTo('/');
  }
}); 