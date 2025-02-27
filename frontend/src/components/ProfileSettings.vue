<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const isFormValid = ref(true)

const formData = reactive({
display_name: userStore.user?.display_name || '',
email: userStore.user?.email || '',
photo_url: userStore.user?.photo_url || '',
photoFile: null as File | null
})

const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        formData.photoFile = target.files[0]
        imagePreview.value = URL.createObjectURL(target.files[0])
    }
}

const handleSubmit = async () => {
    try {
        isLoading.value = true
        error.value = null

        await userStore.updateProfile({
        display_name: formData.display_name,
        email: formData.email,
        photo_url: formData.photo_url,
        photoFile: formData.photoFile
        })
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'An error occurred while updating profile'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <v-container>
        <v-form @submit.prevent="handleSubmit" v-model="isFormValid">
            <v-card class="mb-6">
                <v-card-title>Profile Photo</v-card-title>
                <v-card-text>
                    <v-row align="center">
                        <v-col cols="auto">
                            <v-avatar size="100" color="grey-lighten-2">
                                <v-img 
                                v-if="imagePreview || userStore.user?.photo_url"
                                :src="imagePreview || userStore.user?.photo_url"
                                alt="Profile photo"
                                cover
                                />
                                <v-icon v-else size="48">mdi-account</v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col>
                            <input ref="fileInput" type="file" accept="image/*" @change="handleImageChange"
                                class="d-none" />
                            <v-btn variant="tonal" @click="() => fileInput?.click()">
                                Change Photo
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card class="mb-6">
                <v-card-title>Personal Information</v-card-title>
                <v-card-text>
                    <v-text-field 
                    v-model="formData.display_name"
                    label="Display Name"
                    :rules="[v => !!v || 'Display name is required']"
                    variant="outlined"
                    class="mb-4"
                    />

                    <v-text-field
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    :rules="[
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid'
                    ]"
                    variant="outlined"
                    class="mb-4"
                    />
                </v-card-text>
            </v-card>

            <v-btn type="submit" :disabled="!isFormValid || isLoading" color="primary" block :loading="isLoading">
                Save Changes
            </v-btn>

            <v-alert v-if="error" type="error" class="mt-4">
                {{ error }}
            </v-alert>
        </v-form>
    </v-container>
</template>
