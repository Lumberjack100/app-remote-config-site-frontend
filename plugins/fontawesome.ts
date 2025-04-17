import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faUser, faLock, faTrash, faEdit, faEye, 
  faPlus, faSearch, faSave, faTimes, faExclamationCircle,
  faChevronLeft, faChevronRight, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default defineNuxtPlugin((nuxtApp) => {
  // Add icons to the library
  library.add(
    faUser, faLock, faTrash, faEdit, faEye, 
    faPlus, faSearch, faSave, faTimes, faExclamationCircle,
    faChevronLeft, faChevronRight, faSignOutAlt
  );

  // Register the FontAwesomeIcon component globally
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
}); 