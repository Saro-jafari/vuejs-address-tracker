<template>
	<div class="container">
		<h3 class="title">آدرس ها و مشخصات</h3>

		<div v-if="isLoading" class="loading">
			<p>در حال بارگذاری...</p>
		</div>

		<div v-else-if="addresses.length" class="container">
			<div v-for="address in addresses" :key="address.id" class="card">
				<table class="parentTable">
					<tbody class="Tbody">
						<tr>
							<th>نام</th>
							<td>{{ address.first_name }}</td>
						</tr>
						<tr>
							<th>نام خانوادگی</th>
							<td>{{ address.last_name }}</td>
						</tr>
						<tr>
							<th>جنسیت</th>
							<td>{{ address.gender || 'ناشناخته' }}</td>
						</tr>
						<tr>
							<th>شماره تلفن همراه</th>
							<td>{{ address.coordinate_mobile }}</td>
						</tr>
						<tr>
							<th>شماره تلفن ثابت</th>
							<td>{{ address.coordinate_phone_number || 'ندارد' }}</td>
						</tr>
						<tr>
							<th>آدرس</th>
							<td>{{ address.address }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<StatusMessage v-if="statusMessageState.visible" :status="statusMessageState.status" :message="statusMessageState.message" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { getAddresses } from '/src/api/addressService.js';
	import StatusMessage from './StatusMessage.vue';

	const addresses = ref([]);
	const isLoading = ref(true);
	const statusMessageState = ref({ visible: false, status: '', message: '' });

	const showMessage = (status, message) => {
		statusMessageState.value = { visible: true, status, message };
	};

	onMounted(async () => {
		try {
			const addressData = await getAddresses();
			if (Array.isArray(addressData)) {
				addresses.value = addressData.slice(0, 10);
			} else {
				showMessage('error', 'مشکلی در دریافت آدرس‌ها وجود دارد.');
			}
		} catch (error) {
			showMessage('error', 'خطا در بارگذاری آدرس‌ها');
		} finally {
			isLoading.value = false;
		}
	});
</script>

<style scoped>
	.loading {
		text-align: center;
		font-size: 1.5em;
		color: #333;
	}

	.errorMessage {
		color: red;
		text-align: center;
	}
</style>
