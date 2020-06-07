<template>
    <div>
        <h1>Redirect dawg</h1>
    </div>
</template>

<script>
export default {
    name: "Redirect",

    mounted: function() {
        this.$router.push('/login');
    }
}
</script>