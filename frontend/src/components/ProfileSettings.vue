<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/models/user'

const userStore = useUserStore()
const isLoading = ref(false)
const errorMessage = ref('')

// Form data
const formData = ref({
display_name: userStore.user?.display_name || '',
email: userStore.user?.email || '',
photo_url: userStore.user?.photo_url || ''
})

// Image preview
const imagePreview = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

// Form validation
const isFormValid = computed(() => {
return formData.value.display_name.length > 0 &&
    formData.value.email.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
})

// Handle image selection
const handleImageChange = (event: Event) => {
const target = event.target as HTMLInputElement
if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.value.photo_url = URL.createObjectURL(file)
    imagePreview.value = URL.createObjectURL(file)
}
}

// Save profile changes
const saveProfile = async () => {
if (!isFormValid.value) return

try {
    isLoading.value = true
    errorMessage.value = ''
    
    // Update user profile using store action
    await userStore.updateProfile({
    display_name: formData.value.display_name,
    email: formData.value.email,
    photo_url: formData.value.photo_url
    })
    
} catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to update profile'
} finally {
    isLoading.value = false
}
}
</script>

<template>
<div class="profile-settings">
    <h2>Profile Settings</h2>
    
    <form @submit.prevent="saveProfile" class="profile-form">
    <!-- Profile Image -->
    <div class="form-group">
        <label>Profile Photo</label>
        <div class="profile-photo">
        <img 
            :src="imagePreview || formData.photo_url || '/default-avatar.png'" 
            alt="Profile photo"
            class="preview-image"
        />
        <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="handleImageChange"
            class="file-input"
        />
        <button 
            type="button" 
            @click="() => fileInput?.click()"
            class="upload-button"
        >
            Change Photo
        </button>
        </div>
    </div>

    <!-- Display Name -->
    <div class="form-group">
        <label for="display_name">Display Name</label>
        <input
        id="display_name"
        v-model="formData.display_name"
        type="text"
        required
        class="form-input"
        />
    </div>

    <!-- Email -->
    <div class="form-group">
        <label for="email">Email</label>
        <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        class="form-input"
        />
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>

    <!-- Submit Button -->
    <button 
        type="submit" 
        :disabled="!isFormValid || isLoading"
        class="save-button"
    >
        {{ isLoading ? 'Saving...' : 'Save Changes' }}
    </button>
    </form>
</div>
</template>

<style scoped>
.profile-settings {
max-width: 600px;
margin: 0 auto;
padding: 20px;
}

.profile-form {
display: flex;
flex-direction: column;
gap: 20px;
}

.form-group {
display: flex;
flex-direction: column;
gap: 8px;
}

.form-input {
padding: 8px 12px;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 16px;
}

.profile-photo {
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
}

.preview-image {
width: 150px;
height: 150px;
border-radius: 50%;
object-fit: cover;
}

.file-input {
display: none;
}

.upload-button {
padding: 8px 16px;
background-color: #f0f0f0;
border: none;
border-radius: 4px;
cursor: pointer;
}

.save-button {
padding: 12px 24px;
background-color: #4CAF50;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
}

.save-button:disabled {
background-color: #cccccc;
cursor: not-allowed;
}

.error-message {
color: #ff0000;
font-size: 14px;
}
</style>

