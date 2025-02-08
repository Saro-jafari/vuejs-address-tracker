<template>
	<div v-if="visible" class="status-message" :class="[statusClass, positionClass]">
		<div class="icon">
			<img v-if="status === 'loading'" src="/src/assets/icons/Loading.svg" alt="loading" />
			<img v-if="status === 'success'" src="/src/assets/icons/success.svg" alt="success" />
			<img v-if="status === 'error'" src="/src/assets/icons/error.svg" alt="error" />
		</div>

		<div class="content">
			<slot>{{ message }}</slot>
		</div>
		<button class="close-btn" @click="closeMessage">×</button>
	</div>
</template>

<script setup>
	import { ref, computed, defineProps, defineEmits } from 'vue';

	const props = defineProps({
		status: { type: String, required: true },
		message: { type: String, default: '' },
		timeout: { type: Number, default: 5000 },
		position: { type: String, default: 'top' },
	});

	const visible = ref(true);
	const emit = defineEmits(['close']);

	const statusClass = computed(() => ({
		loading: props.status === 'loading',
		success: props.status === 'success',
		error: props.status === 'error',
	}));

	const positionClass = computed(() => ({
		top: props.position === 'top',
		bottom: props.position === 'bottom',
	}));

	const closeMessage = () => {
		visible.value = false;
		emit('close');
	};

	setTimeout(closeMessage, props.timeout);
</script>

<style scoped></style>
