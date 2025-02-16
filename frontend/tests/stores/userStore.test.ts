import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import { getFirebaseToken } from '@/firebase'
import { User } from "../../src/models/user";

vi.mock('axios')
vi.mock('@/firebase')

describe('UserStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        pinia.use(piniaPluginPersistedstate)
        setActivePinia(pinia)
        vi.clearAllMocks()
    })

    describe('initial state', () => {
        it('should start with empty user state', () => {
            const store = useUserStore()
            expect(store.user).toBeNull()
            expect(store.isAuthenticated).toBe(false)
        })
    })

    describe('login', () => {
        it('should successfully log in user', async () => {
            const store = useUserStore()
            const mockToken = 'mock-firebase-token'
            const mockUserData = {
                data: {
                    id: "1",
                    email: 'test@example.com',
                    display_name: 'Test User',
                    created_at: "2024-02-16T00:00:00Z",
                    updated_at: "2024-02-16T00:00:00Z"
                } satisfies User
            }

            vi.mocked(getFirebaseToken).mockResolvedValue(mockToken)
            vi.mocked(axios.post).mockResolvedValue(mockUserData)

            await store.login()

            expect(store.user).toEqual({
                id: mockUserData.data.id,
                email: mockUserData.data.email,
                created_at: mockUserData.data.created_at,
                updated_at: mockUserData.data.updated_at,
                display_name: mockUserData.data.display_name
            })
            expect(store.isAuthenticated).toBe(true)
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/auth/login',
                {},
                { headers: { "Authorization": "Bearer " + mockToken } }
            )
        })

        it('should handle login failure', async () => {
            const store = useUserStore()
            const mockError = new Error('Firebase authentication failed')

            vi.mocked(getFirebaseToken).mockRejectedValueOnce(mockError)

            await expect(() => store.login())
                .rejects
                .toBe(mockError)
                
            expect(store.user).toBeNull()
            expect(store.isAuthenticated).toBe(false)
            expect(store.token).toBeNull()
        })
    })

    describe('restoreSession', () => {
        it('should restore user session', async () => {
            const store = useUserStore()

            const mockToken = 'mock-firebase-token'
            const mockUserData = {
                data: {
                    id: "1",
                    email: 'test@example.com',
                    display_name: 'Test User',
                    created_at: "2024-02-16T00:00:00Z",
                    updated_at: "2024-02-16T00:00:00Z"
                } satisfies User
            }

            vi.mocked(axios.get).mockResolvedValue(mockUserData)
            vi.mocked(getFirebaseToken).mockResolvedValue(mockToken)

            await store.restoreSession(mockToken)

            expect(store.user).toEqual(mockUserData.data)
            expect(store.isAuthenticated).toBe(true)
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/auth/login',
                {},
                { headers: { "Authorization": "Bearer " + mockToken } }
            )
        })

        it('should handle restore session failure', async () => {
            const store = useUserStore()
            const mockError = new Error('Session restore failed')
            const mockToken = 'mock-firebase-token'

            vi.mocked(axios.post).mockRejectedValue(mockError)

            // Set initial state to verify it's cleared on failure
            store.$patch({
                user: { 
                    id: "1",
                    email: 'test@example.com',
                    display_name: 'Test User',
                    created_at: "2024-02-16T00:00:00Z",
                    updated_at: "2024-02-16T00:00:00Z"
                },
                isAuthenticated: true,
                token: 'old-token'
            })

            await expect(() => store.restoreSession(mockToken))
            .rejects
            .toThrow('Login failed')

            expect(store.user).toBeNull()
            expect(store.isAuthenticated).toBe(false)
            expect(store.token).toBeNull()
        })
    })

    describe('logout', () => {
        it('should clear user state on logout', async () => {
            const store = useUserStore()
            // Set initial authenticated state
            store.$patch({
                user: { id: 1, email: 'test@example.com', name: 'Test User' },
                isAuthenticated: true
            })

            await store.logout()

            expect(store.user).toBeNull()
            expect(store.isAuthenticated).toBe(false)
            expect(store.token).toBeNull()
        })
    })
})

