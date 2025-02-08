<template>
	<div class="address-form">
		<StatusMessage
			v-if="statusMessage.visible"
			:status="statusMessage.status"
			:message="statusMessage.message"
			@close="statusMessage.visible = false" />

		<section class="FormAll">
			<section class="resgestirTitle">
				<p class="word">ثبت آدرس</p>
			</section>
			<form id="addressForm" class="form" @submit.prevent="submitForm">
				<p class="titleForm">لطفا مشخصات و آدرس خود را وارد کنید.</p>

				<section>
					<label for="firstName">نام:</label>
					<div class="input-wrapper">
						<input
							type="text"
							v-model="form.firstName"
							id="firstName"
							:class="{ 'input-error': !isValidFirstName && formSubmitted }"
							minlength="3" />
						<img
							v-if="form.firstName"
							class="clear-icon"
							@click="clearInput('firstName')"
							src="/src/assets/icons/closeIcon.svg"
							title="clear" />
					</div>
					<span v-show="!isValidFirstName && formSubmitted" class="error-message">نام باید حداقل ۳ حرف باشد</span>
				</section>

				<section>
					<label for="lastName">نام خانوادگی:</label>
					<div class="input-wrapper">
						<input
							type="text"
							v-model="form.lastName"
							id="lastName"
							:class="{ 'input-error': !isValidLastName && formSubmitted }"
							minlength="3" />
						<img
							v-if="form.lastName"
							class="clear-icon"
							@click="clearInput('lastName')"
							src="/src/assets/icons/closeIcon.svg"
							title="clear" />
					</div>
					<span v-show="!isValidLastName && formSubmitted" class="error-message">نام خانوادگی باید حداقل ۳ حرف باشد</span>
				</section>

				<section>
					<label for="phone">تلفن همراه:</label>
					<div class="input-wrapper">
						<input type="tel" v-model="form.phone" id="phone" :class="{ 'input-error': !isValidPhone && formSubmitted }" />
						<img
							v-if="form.phone"
							class="clear-icon-right"
							@click="clearInput('phone')"
							src="/src/assets/icons/closeIcon.svg"
							title="clear" />
					</div>
					<span v-show="!isValidPhone && formSubmitted" class="error-message">شماره همراه باید ۱۱ رقم باشد</span>
				</section>

				<section>
					<label for="landline">تلفن ثابت (اختیاری):</label>
					<div class="input-wrapper">
						<input type="tel" v-model="form.landline" id="landline" :class="{ 'input-error': !isValidLandline && formSubmitted }" />
						<img
							v-if="form.landline"
							class="clear-icon-right"
							@click="clearInput('landline')"
							src="/src/assets/icons/closeIcon.svg"
							title="clear" />
					</div>
					<span v-show="!isValidLandline && form.landline && formSubmitted" class="error-message"> تلفن ثابت باید شامل ۱۱ رقم باشد </span>
				</section>

				<section class="adresses">
					<label for="address">آدرس:</label>
					<div class="input-wrapper">
						<textarea
							v-model="form.address"
							id="address"
							class="textarea-address"
							:class="{ 'input-error': !isValidAddress && formSubmitted }"
							minlength="10"></textarea>
						<img
							v-if="form.address"
							class="clear-icon"
							@click="clearInput('address')"
							src="/src/assets/icons/closeIcon.svg"
							title="clear" />
					</div>
					<span v-show="!isValidAddress && formSubmitted" class="error-message">آدرس باید حداقل ۱۰ کاراکتر باشد</span>
				</section>

				<div class="gender-selection">
					<p>جنسیت</p>
					<label class="gender-option">
						<input type="radio" name="gender" value="male" v-model="form.gender" />
						<span class="custom-radio"></span>
						<span class="label-text">آقا</span>
					</label>
					<label class="gender-option">
						<input type="radio" name="gender" value="female" v-model="form.gender" />
						<span class="custom-radio"></span>
						<span class="label-text">خانم</span>
					</label>
				</div>
				<span v-show="!form.gender && formSubmitted" class="error-message">لطفاً جنسیت خود را انتخاب کنید</span>
			</form>
		</section>

		<section class="wrapper">
			<section class="Footer">
				<button @click="submitForm">ثبت و ادامه</button>
			</section>
		</section>
	</div>
</template>

<script setup>
	import { reactive, ref, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import StatusMessage from './StatusMessage.vue';

	const statusMessage = ref({ visible: false, status: '', message: '' });

	const showMessage = (status, message) => {
		statusMessage.value = { visible: true, status, message };
	};

	const form = reactive({
		firstName: '',
		lastName: '',
		phone: '',
		landline: '',
		address: '',
		gender: '',
	});

	const formSubmitted = ref(false);
	const router = useRouter();

	const isValidFirstName = computed(() => form.firstName.trim().length >= 3);
	const isValidLastName = computed(() => form.lastName.trim().length >= 3);
	const isValidPhone = computed(() => /^\d{11}$/.test(form.phone));
	const isValidLandline = computed(() => !form.landline || /^\d{11}$/.test(form.landline));
	const isValidAddress = computed(() => form.address.trim().length >= 10);
	const isValidGender = computed(() => form.gender !== '');

	const submitForm = () => {
		formSubmitted.value = true;

		if (isValidFirstName.value && isValidLastName.value && isValidPhone.value && isValidAddress.value && isValidGender.value) {
			router.push({
				name: 'view-addresses',
				query: {
					firstName: form.firstName,
					lastName: form.lastName,
					phone: form.phone,
					landline: form.landline,
					address: form.address,
					gender: form.gender,
				},
			});
		} else {
			showMessage('error', 'لطفا همه‌ی قسمت‌ها را پر کنید');
		}
	};
</script>

<style>
	.input-error {
		border: 1px solid red;
	}

	.error-message {
		color: red;
		font-size: 12px;
		margin-top: 5px;
	}
</style>
