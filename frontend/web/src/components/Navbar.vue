<template>
    <div v-if="loggedIn">
        <router-link to="/summary">Summary</router-link> |
        <router-link to="/about">About</router-link>

        <button @click.prevent="onLogout">Logout</button>
    </div>
</template>

<script>
export default {
    name: 'Navbar',

    computed: {
        loggedIn(){
            console.log("testing")
            if (localStorage.getItem('jwt') == null) {
                return false
            } else {
                return true
            }
        }
        
    },
    methods: {
        onLogout(){
            console.log("jwt removed")
            localStorage.removeItem('jwt');
        }
    }
}
</script>