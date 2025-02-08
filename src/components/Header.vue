<template>
	<header class="header">
		<section class="logo">
			<img :src="logoSrc" alt="LOGO" />
		</section>
		<nav>
			<ul>
				<RouterLink to="/" exact-active-class="active">ثبت آدرس</RouterLink>

				<RouterLink to="/userinfo" exact-active-class="active">مشاهده آدرس ها</RouterLink>
			</ul>
		</nav>
	</header>
</template>
<script setup>
	import logoSrc from '/public/Logo.svg';
</script>
<style scoped></style>
