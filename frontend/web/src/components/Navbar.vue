<template>
    <div>
        <div v-if="loggedIn">

            <router-link to="/summary">Summary</router-link> |
            <router-link to="/about">About</router-link>

            <button @click.prevent="onLogout">Logout</button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Navbar',

    computed: {
        loggedIn(){

            console.log(localStorage.getItem('jwt'))
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