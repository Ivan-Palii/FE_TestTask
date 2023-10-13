<script setup>
import { useImageStore } from '@/stores/imageStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import TheCarousel from "@/components/TheCarousel.vue";

const { getImages } = useImageStore()
const { images } = storeToRefs(useImageStore())
onMounted(async () => {
	await getImages()
})
</script>

<template>
	<div class="main__container">
		<TheCarousel v-if="images" />
	</div>
</template>

<style scoped>
	.main__container{
		height: 100%;
	}
</style>
