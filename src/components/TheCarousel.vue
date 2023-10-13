<script setup>
import { useImageStore } from '@/stores/imageStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import SelectedImageUrls from '@/components/SelectedImageUrls.vue'
import CarouselItem from '@/components/CarouselItem.vue'

const { images } = storeToRefs(useImageStore())
const step = ref('')
const transitioning = ref(false)
const inner = ref(null)
const innerStyles = ref({})

function next() {
	if (transitioning.value) return
	transitioning.value = true

	moveLeft()
	afterTransition(() => {
		const image = images.value.shift()
		images.value.push(image)
		resetTranslate()
		transitioning.value = false
	})
}

function moveLeft() {
	innerStyles.value = {
		transform: `translateX(-${step.value})
                translateX(-${step.value})`
	}
}

function prev() {
	if (transitioning.value) return
	transitioning.value = true

	moveRight()
	afterTransition(() => {
		const image = images.value.pop()
		images.value.unshift(image)
		resetTranslate()
		transitioning.value = false
	})
}

function moveRight() {
	innerStyles.value = {
		transform: `translateX(${step.value})
                translateX(-${step.value})`
	}
}

function afterTransition(callback) {
	const listener = () => {
		callback()
		inner.value.removeEventListener('transitionend', listener)
	}
	inner.value.addEventListener('transitionend', listener)
}
function setStep() {
	const innerWidth = inner.value.scrollWidth
	const totalImages = images.value.length
	step.value = `${innerWidth / totalImages}px`
}

function resetTranslate() {
	innerStyles.value = {
		transition: 'none',
		transform: `translateX(-${step.value})`
	}
}

onMounted(() => {
	setStep()
	resetTranslate()
	window.addEventListener('resize', handleResize)
})

const handleResize = () => {
	setStep()
	resetTranslate()
}
</script>

<template>
	<h1 class="title">Image Gallery</h1>
	<div class="carousel">
		<div ref="inner" :style="innerStyles" class="carousel__inner">
			<CarouselItem
				v-for="item in images"
				:key="item.id"
				:item="item"
				:transitioning="transitioning"
				class="carousel__item"
			/>
		</div>
		<button @click="prev" class="carousel__btn carousel__prev"></button>
		<button @click="next" class="carousel__btn carousel__next"></button>
	</div>
	<SelectedImageUrls />
</template>

<style scoped lang="scss">
.title {
	font-size: 30px;
	font-weight: 700;
	text-align: center;
	text-transform: uppercase;
	padding-top: 20px;
	margin-bottom: 15px;
}

.carousel {
	overflow: hidden;
	padding: 30px 0;
	position: relative;

	// .carousel__inner
	&__inner {
		width: 100%;
		transition: transform 0.4s ease-in;

		white-space: nowrap;
		display: flex;
		flex-wrap: nowrap;
	}

	// .carousel__item
	&__item {
		padding: 0 15px;
		@media (max-width: $tablet) {
			padding: 0 10px;
		}

		@media (max-width: $mobile) {
			padding: 0 5px;
		}
	}

	// .carousel__btn
	&__btn {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffffffff;
		border: 1px solid black;
		box-sizing: content-box;
		transition: background-color 0.3s;
		&:hover {
			background-color: rgba(144, 142, 142, 0.75);
		}
		&:active {
			background-color: rgb(130, 125, 125);
		}
	}

	&__prev,
	&__next {
		transition: 0.3s;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			border: solid black;
		}
	}

	// .carousel__prev
	&__prev {
		&:after {
			left: 50%;
			height: 14px;
			width: 14px;
			transform: translate(-25%, -50%) rotate(-135deg);
			border-width: 3px 3px 0 0;
		}
	}

	// .carousel__next
	&__next {
		right: 0;
		&:after {
			right: 50%;
			height: 14px;
			width: 14px;
			transform: translate(25%, -50%) rotate(45deg);
			border-width: 3px 3px 0 0;
		}
	}
}
</style>
