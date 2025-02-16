import { describe, it, expect, beforeEach } from 'vitest'
import router from '@/router'
import Login from '@/components/Login.vue'

describe('Router', () => {
    beforeEach(async () => {
        // Reset router to initial state
        await router.push('/')
        await router.isReady()
    })

    describe('routes', () => {
        it('should contain home route', () => {
            const route = router.getRoutes().find(r => r.name === 'home')
            expect(route).toBeDefined()
            expect(route?.path).toBe('/')
            expect(route?.components?.default).toBeTruthy()
            // Verify it's the Login component by checking its name
            expect((route?.components?.default as any).__name).toBe('Login')
        })

        it('should contain login route', () => {
            const route = router.getRoutes().find(r => r.name === 'login')
            expect(route).toBeDefined()
            expect(route?.path).toBe('/login')
            expect(route?.components?.default).toBeTruthy()
            // Verify it's the Login component by checking its name
            expect((route?.components?.default as any).__name).toBe('Login')
        })
    })

    describe('navigation', () => {
        it('should navigate to home route', async () => {
            await router.push('/')
            await router.isReady()
            expect(router.currentRoute.value.name).toBe('home')
        })

        it('should navigate to login route', async () => {
            await router.push('/login')
            await router.isReady()
            expect(router.currentRoute.value.name).toBe('login')
        })

        it('should handle navigation by name', async () => {
            await router.push({ name: 'login' })
            await router.isReady()
            expect(router.currentRoute.value.path).toBe('/login')
        })
    })

    describe('route matching', () => {
        it('should match home route', () => {
            const matched = router.resolve('/')
            expect(matched.name).toBe('home')
        })

        it('should match login route', () => {
            const matched = router.resolve('/login')
            expect(matched.name).toBe('login')
        })

        it('should handle unknown routes', () => {
            const matched = router.resolve('/unknown')
            expect(matched.matched.length).toBe(0)
        })
    })
})
