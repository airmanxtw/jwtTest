<template>
    <h1>Demo Page</h1>
    <p>token:{{ token }}</p>
    <input v-model="user.username" placeholder="Username" />
    <input v-model="user.password" placeholder="Password" type="password" />
    <button @click="handleLogin">Login</button>

    <div style="margin-top: 20px;">
        <button @click="refreshCookie">refresh cookie</button>
    </div>

    <div style="margin-top:20px;">
        <button @click="handleGetTime(token)">Get Time</button>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useStore } from '../api/useStore'
import { useLogin } from '../api/useLogin'
const store = useStore()
const { token } = storeToRefs(store)
const { setToken } = store
const { login,refreshCookie,getTime } = useLogin()

const handleLogin = async () => {
    const response = await login(user.value.username, user.value.password);    
    setToken(response)
}

const handleGetTime = async (token: string) => {    
    const response = await getTime(token);
    alert(response);
}

import type { User } from '../types/user'

const user = ref<User>({
    username: '',
    password: ''
})


</script>