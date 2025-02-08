<script setup>
	import Header from './components/Header.vue';

</script>

<template>
	<Header />
	<router-view></router-view>
</template>

<style scoped>

	#app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}


	.router-view {
		flex-grow: 1;
		padding-bottom: 60px;
	}

	.Footer button {
		height: 40px;
		font-family: sahel;
		background-color: #2ebba6;
		color: #fff;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
</style>
