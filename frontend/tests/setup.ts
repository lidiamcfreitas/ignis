import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Mock global objects if necessary
globalThis.URL.createObjectURL = vi.fn()

// Create Vuetify instance
const vuetify = createVuetify({
components,
directives,
})

// Setup Vue Test Utils
config.global.plugins = [vuetify]
config.global.mocks = {}
