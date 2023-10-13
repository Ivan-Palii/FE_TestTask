import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
// import { parseLinkHeader } from '@web3-storage/parse-link-header'

export const useImageStore = defineStore('imageStore', () => {
	const images = ref()
	const selectedImages = ref([])
	async function getImages() {
		try {
			const { data } = await axios.get('https://picsum.photos/v2/list')
			images.value = data
			images.value = images.value.map((e) => {
				e.selected = false
				return e
			})
		} catch (e) {
			console.log(e)
		}
	}

	function changeSelectedImages(id) {
		const tmp = selectedImages.value.findIndex((e) => e.id === id)
		const img = images.value.find((e) => e.id === id)
		const imgIndex = images.value.findIndex((e) => e.id === id)
		if (tmp >= 0) {
			selectedImages.value.splice(tmp, 1)
		} else {
			selectedImages.value.push(img)
		}
		images.value[imgIndex].selected = !img.selected
	}

	return { images, selectedImages, getImages, changeSelectedImages }
})
