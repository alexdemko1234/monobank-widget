/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/db'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'


const app = createApp(App)

registerPlugins(app)
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.mount('#app')
