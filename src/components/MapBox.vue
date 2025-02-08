<template>
	<section class="MapParent">
		<StatusMessage
			v-if="statusMessage.visible"
			:status="statusMessage.status"
			:message="statusMessage.message"
			@close="statusMessage.visible = false" />

		<div class="BackSelectAdress">
			<div class="BackButton" @click="router.go(-1)">
				<img src="/src/assets/icons/left-arrow.svg" alt="Back" class="imgBackDesktop" />
			</div>
			<div class="wordheader">
				<RouterLink to="/"> <p>انتخاب آدرس</p></RouterLink>
			</div>
		</div>

		<div class="MapContainer">
			<div class="MapInstructions">
				<p>موقعیت مورد نظر خود را روی نقشه مشخص کنید</p>
			</div>
			<div id="map" ref="mapContainer" class="MapStyle">
				<div class="gps-button" @click="getUserLocation">
					<img src="/src/assets/icons/GPS.svg" alt="Gps" class="ImgGPS" />
				</div>
			</div>
		</div>

		<div class="SubmitMap">
			<button @click="submitLocation" :disabled="loading || !coordinates">
				<span v-if="loading">در حال ارسال...</span>
				<span v-else>ثبت و ادامه</span>
			</button>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted, nextTick, defineEmits } from 'vue';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { useRouter, useRoute } from 'vue-router';
	import { postAddress } from '/src/api/userAddressService.js';
	import StatusMessage from './StatusMessage.vue';

	const emit = defineEmits();
	const mapContainer = ref(null);
	const coordinates = ref(null);
	const currentMarker = ref(null);
	const loading = ref(false);
	const router = useRouter();
	const route = useRoute();
	let map = null;
	const statusMessage = ref({ visible: false, status: '', message: '' });

	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

	const showMessage = (status, message) => {
		statusMessage.value = { visible: true, status, message };
	};

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const userLng = position.coords.longitude;
					const userLat = position.coords.latitude;

					coordinates.value = { lat: userLat, lng: userLng };

					if (map) {
						map.flyTo({ center: [userLng, userLat], zoom: 12 });

						if (currentMarker.value) currentMarker.value.remove();

						currentMarker.value = new mapboxgl.Marker().setLngLat([userLng, userLat]).addTo(map);
					}
				},
				error => showMessage('error', 'امکان دریافت موقعیت مکانی شما وجود ندارد.'),
			);
		} else {
			showMessage('error', 'مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
		}
	};

	const submitLocation = async () => {
		if (!coordinates.value) {
			showMessage('error', 'لطفاً یک موقعیت مکانی را انتخاب کنید.');
			return;
		}

		const userData = {
			first_name: route.query.firstName || '',
			last_name: route.query.lastName || '',
			coordinate_mobile: route.query.phone || '',
			coordinate_phone_number: route.query.phoneNumber || '',
			address: route.query.address || '',
			region: '1',
			lat: coordinates.value.lat,
			lng: coordinates.value.lng,
			gender: route.query.gender || 'male',
			address_id: route.query.addressId || '',
		};

		try {
			loading.value = true;
			showMessage('loading', 'در حال ارسال اطلاعات...');
			const response = await postAddress(userData);
			if (response && !response.error) {
				showMessage('success', 'آدرس با موفقیت ارسال شد!');

				setTimeout(() => {
					showMessage('loading', 'در حال انتقال به صفحه آدرس‌ها');
				}, 2000);

				setTimeout(() => {
					router.push('/userinfo');
				}, 3000);
			} else {
				showMessage('error', 'خطا در ارسال آدرس!');
			}
		} catch (error) {
			showMessage('error', 'خطایی رخ داده است.');
		} finally {
			loading.value = false;
		}
	};

	const handleMapClick = event => {
		const { lng, lat } = event.lngLat;
		coordinates.value = { lat, lng };

		map.flyTo({ center: [lng, lat], zoom: 12 });

		if (currentMarker.value) currentMarker.value.remove();

		currentMarker.value = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
	};

	const loadRTLTextPlugin = () => {
		if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
			mapboxgl.setRTLTextPlugin(
				'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
				() => console.log('RTL Text Plugin Loaded'),
				true,
			);
		}
	};

	onMounted(async () => {
		await nextTick();

		if (!mapboxgl.supported()) {
			showMessage('error', 'WebGL پشتیبانی نمی‌شود.');
			return;
		}

		loadRTLTextPlugin();

		if (!mapContainer.value) {
			showMessage('error', 'مشکلی در بارگذاری نقشه وجود دارد.');
			return;
		}

		map = new mapboxgl.Map({
			container: mapContainer.value,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [51.389, 35.6892],
			zoom: 12,
		});

		map.on('click', handleMapClick);
	});
</script>

<style scoped></style>
