<script setup>
import { useImageStore } from "@/stores/imageStore";
import { storeToRefs } from "pinia";
import SelectedListItem from "@/components/SelectedListItem.vue";

const {selectedImages} = storeToRefs(useImageStore())
</script>
<template>
	<div class="selected" v-show="selectedImages.length">
		<h3 class="selected__list-title">Selected image url`s</h3>
		<TransitionGroup name="list" tag="ul" class="selected__urls-list">
			<SelectedListItem
				v-for="item in selectedImages"
				:key="item.id"
				:item="item"
			></SelectedListItem>
		</TransitionGroup>
	</div>
</template>

<style scoped lang="scss">
.selected {
	margin: 0 auto;
	height: 50%;
	display: flex;
	flex-direction: column;
	// .selected__list-title
	&__list-title {
		text-align: center;
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 25px;
	}

	// .selected__urls-list
	&__urls-list {
		margin: 0 auto;
		overflow-y: scroll;
		overflow-x: hidden;
		@media (max-width: $mobileSmall) {
			max-width: 100%;
		}

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #888;
			border-radius: 10px;

			&:hover {
				background-color: #555;
			}
		}
	}
}
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease-in-out;
}
.list-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

</style>
