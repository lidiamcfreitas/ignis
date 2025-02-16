import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Mock global objects if necessary
globalThis.URL.createObjectURL = vi.fn()

// Create Vuetify instance
const vuetify = createVuetify({
components,
directives,
})

// Setup Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
setActivePinia(pinia)

// Setup Vue Test Utils
config.global.plugins = [vuetify, pinia]
config.global.mocks = {}
