<script lang="ts">
	import Carousel from 'svelte-carousel';
	import CarouselDot from '$lib/components/CarouselDot.svelte';

	import { browser } from '$app/environment';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Doener from '$lib/assets/doener.jpg';
	import Pizza from '$lib/assets/pizza.jpg';

	export let banners: any;

	let carousel: any; // for calling methods of the carousel instance
</script>

<div class="w-full aspect-[1.9/3] md:aspect-[16/6]">
	{#if browser}
		<Carousel
			let:loaded
			let:currentPageIndex
			let:pagesCount
			let:showPage
			bind:this={carousel}
			autoplay
			autoplayDuration={5000}
			autoplayProgressVisible
			arrows={false}
		>
			<div slot="dots" class="flex flex-wrap items-center justify-center gap-1 p-2">
				{#each Array(pagesCount) as _, pageIndex (pageIndex)}
					<CarouselDot
						active={currentPageIndex === pageIndex}
						number={pageIndex + 1}
						on:click={() => showPage(pageIndex)}
					/>
				{/each}
			</div>
			<div class="relative">
				<img
					src={Doener}
					class="w-full object-cover aspect-[2/3] md:aspect-[16/5]"
					width="2000"
					height="1000"
					draggable="false"
				/>
				<div
					class="absolute inset-0 flex flex-col justify-center gap-5 mx-0 items-center md:mx-16 md:items-start"
				>
					<h1
						class=" text-5xl font-extrabold text-white uppercase center text-center md:text-left md:text-7xl"
					>
						Gözde Kebab
					</h1>
					<a
						class="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
						href="/shop/all"
					>
						Zum Menü
					</a>
				</div>
			</div>
		</Carousel>
	{/if}
</div>
