<script setup>
import { useImageStore } from '@/stores/imageStore'

const { changeSelectedImages } = useImageStore()

defineProps({
	item: {
		type: Object,
		required: true
	}
})
</script>

<template>
	<li>
		<a :href="item.download_url" target="_blank" class="link">{{ item.download_url }}</a>
		<button class="delete-btn" @click="changeSelectedImages(item.id)"></button>
	</li>
</template>

<style scoped lang="scss">
li {
	border-radius: 15px;
	font-size: 20px;
	word-wrap: break-word;
	background-color: rgba(157, 157, 157, 0.25);
	padding: 5px 45px 5px 10px;
	position: relative;
	&:not(:last-child) {
		margin-bottom: 15px;
	}
}
.link {
	transition: color 0.3s;
	&:hover {
		color: #0d8200;
	}
}

.delete-btn {
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	right: 15px;
	transform: translateY(-50%);
	&:before,
	&:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 15px;
		border: 2px solid black;
	}
	&:before {
		transform: translate(-50%, -50%) rotate(45deg);
	}
	&:after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}
}
</style>
