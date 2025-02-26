<script setup lang="ts">
import ProfileSettings from '@/components/ProfileSettings.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
if (!userStore.isAuthenticated) {
    router.push('/login')
}
})
</script>

<template>
<div class="profile-view">
    <h1>My Profile</h1>
    <ProfileSettings />
</div>
</template>

<style scoped>
.profile-view {
padding: 20px;
max-width: 800px;
margin: 0 auto;
}
</style>

