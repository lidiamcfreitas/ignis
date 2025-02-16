import { mount } from '@vue/test-utils';
import { setActivePinia } from 'pinia';
import { describe, it, expect, vi } from 'vitest';
import Login from '@/components/Login.vue'; // Adjust the path if needed
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/userStore';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// Create Vuetify instance for testing
const vuetify = createVuetify();

describe('Login.vue', () => {
    it('renders welcome message when user is not logged in', () => {
        const wrapper = mount(Login, {
            global: {
                plugins: [createTestingPinia(), vuetify],
            },
        });

        expect(wrapper.text()).toContain('Welcome Back');
        expect(wrapper.text()).toContain('Please sign in to continue');
    });

    it('calls login when login button is clicked', async () => {
        const wrapper = mount(Login, {
            global: {
                plugins: [createTestingPinia(), vuetify],
            },
        });
        await wrapper.vm.$nextTick();
        const userStore = useUserStore();
        userStore.login = vi.fn();

        const button = wrapper.find('#login_button');
        expect(button.exists()).toBe(true); // Ensure button is found

        await button.trigger('click');
        expect(userStore.login).toHaveBeenCalled();
    });

    it('renders user information when user is logged in', async () => {
    const pinia = createTestingPinia({
        createSpy: vi.fn,
    });
    
    setActivePinia(pinia);
    const userStore = useUserStore();
    
    // Explicitly set the state using store methods
    userStore.$patch({
        isAuthenticated: true,
        user: {
        display_name: 'John Doe',
        email: 'john@example.com',
        photo_url: 'https://example.com/photo.jpg',
        }
    });

    const wrapper = mount(Login, {
        global: {
        plugins: [pinia, vuetify],
        },
    });
    
    // Add debug logging
    console.log('User store state after mount:', {
        isAuthenticated: userStore.isAuthenticated,
        user: userStore.user
    });
    
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Welcome back, John Doe!');
    expect(wrapper.text()).toContain('john@example.com');
    });

    it('calls logout when sign out button is clicked', async () => {
        const pinia = createTestingPinia({
            createSpy: vi.fn,
        });
        
        setActivePinia(pinia);
        const userStore = useUserStore();
        
        // Set the initial logged-in state
        userStore.$patch({
            isAuthenticated: true,
            user: {
                display_name: 'John Doe',
                email: 'john@example.com',
                photo_url: 'https://example.com/photo.jpg',
            }
        });

        const wrapper = mount(Login, {
            global: {
                plugins: [pinia, vuetify],
            },
        });

        // Wait for the component to update
        await wrapper.vm.$nextTick();
        
        // Debug the component's HTML to see what's rendered
        console.log('Component HTML:', wrapper.html());
        console.log('Store state:', {
            isAuthenticated: userStore.isAuthenticated,
            user: userStore.user
        });

        // Look for the sign out button with both color and icon
        const signOutButton = wrapper.find('#logout_button');
        expect(signOutButton.exists()).toBe(true);
        
        await signOutButton.trigger('click');
        expect(userStore.logout).toHaveBeenCalled();
    });

    it('updates hover state on mouse events', async () => {
        const wrapper = mount(Login, {
            global: {
                plugins: [createTestingPinia(), vuetify],
            },
        });
        await wrapper.vm.$nextTick();
        const card = wrapper.find('.v-card');

        expect(card.classes()).not.toContain('elevation-12');

        await card.trigger('mouseenter');
        await wrapper.vm.$nextTick();
        expect(card.classes()).toContain('elevation-12');

        await card.trigger('mouseleave');
        await wrapper.vm.$nextTick();
        expect(card.classes()).not.toContain('elevation-12');
    });
});
