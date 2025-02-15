import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// Mock global objects if necessary
globalThis.URL.createObjectURL = vi.fn();

// Setup Vue Test Utils
config.global.mocks = {};
