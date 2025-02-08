import { createRouter, createWebHistory } from 'vue-router';
import RegisterAddress from '/src/views/Home.vue';
import AddressSelectionPage from '/src/views/AddressSelectionPage.vue';
import UsersInfo from '/src/views/ViewAddresses.vue';
import NotFound from '/src/components/NotFound.vue';

const routes = [
	{
		path: '/',
		name: 'register',
		component: RegisterAddress,
	},
	{
		path: '/view-addresses',
		name: 'view-addresses',
		component: AddressSelectionPage,
		beforeEnter: (to, from, next) => {
			if (!to.query.firstName || !to.query.lastName || !to.query.phone || !to.query.address || !to.query.gender) {
				next('/');
			} else {
				next();
			}
		},
	},
	{
		path: '/userinfo',
		name: 'usersinfo',
		component: UsersInfo,
	},
	{
		path: '/:catchAll(.*)',
		name: 'not-found',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
