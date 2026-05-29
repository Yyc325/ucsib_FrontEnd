<template>
	<div class="i-skeleton">
		<div class="i-skeleton-container">
			<div class="i-skeleton-header">
				<h1 class="i-skeleton-title">{{ $t(`backstage.${String(router.currentRoute.value.name)}.title`) }}</h1>
				<div class="i-skeleton-desc">{{ $t(`backstage.${String(router.currentRoute.value.name)}.description`) }}</div>
			</div>
			<div class="i-skeleton-body">
				<slot name="body"></slot>
			</div>
		</div>
    <slot name="popup"></slot>
	</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ISkeleton',
	props: {


	},
	setup() {
		const router = useRouter();
		return {
			router
		}
	}
});
</script>

<style lang="scss" scoped>
@forward './ISkeleton.scss';
</style>