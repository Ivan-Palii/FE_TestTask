<script setup>
import { useImageStore } from '@/stores/imageStore'

const { changeSelectedImages } = useImageStore()
const props = defineProps({
	item: {
		type: Object,
		required: true
	},
	transitioning: {
		type: Boolean,
		required: true
	}
})

function clickEvent() {
	// props.item.selected = !props.item.selected
	changeSelectedImages(props.item.id)
}
</script>

<template>
	<div class="img-wrapper">
		<img
			:class="{ selected: item.selected, 'image-hover': !transitioning }"
			@click="clickEvent"
			:src="item.download_url"
			alt=""
		/>
	</div>
</template>

<style scoped lang="scss">
.img-wrapper {
	display: flex;
	justify-content: center;
	height: 200px;
	flex: 0 0 20%;
	@media (max-width: $tablet) {
		flex: 0 0 25%;
	}
	@media (max-width: $mobile) {
		flex: 0 0 33.333%;
	}
	@media (max-width: $mobileSmall) {
		flex: 0 0 100%;
	}
}

.img-wrapper {
	padding: 10px 0;
}

.selected {
	box-shadow: 0px 0px 3px 8px rgba(99, 212, 42, 1);

	@media (max-width: $mobileSmall) {
		box-shadow: 0px 0px 1px 4px rgba(99, 212, 42, 1);
	}
}

img {
	cursor: pointer;
	border-radius: 20px;
	object-fit: cover;
	height: 100%;
	width: 100%;

}

.image-hover{
	transition: all ease 0.2s;
	&:hover {
		transform: translateY(-5px);
		@media (max-width: $mobile) {
			transform: scale(0.98);
		}
	}
}
</style>