<script lang="ts">
	import doenergerichte from '../assets/doenergerichte.json';
	import Doenerdetail from '$lib/components/Doenerdetail.svelte';
	let hovered = false;
	let cartOpened = false;
	let doenergerichtname = '';

	function load(i) {
		cartOpened = !cartOpened;
		doenergerichtname = doenergerichte[i].name;
	}
</script>

<div class="pb-4">
	<card padding="xl" size="md">
		<div class="flex justify-between items-center mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Döner Gerichte</h5>
		</div>
		<listgroup class="border-0 dark:!bg-transparent">
			{#each doenergerichte as doenergericht, i}
				<div class="flex space-x-4">
					<button
						on:click={() => {
							load(i);
						}}
						class="flex-1 min-w-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
					>
						<p class="text-sm font-medium text-gray-900 truncate text-left">
							{doenergericht.id}- {doenergericht.name}
						</p>
						<p
							style="float:left;"
							class="text-sm text-gray-500 truncate dark:text-gray-400 text-left"
						>
							{doenergericht.detail}
						</p>
						<div class="text-base font-semibold text-gray-900 text-right">
							{doenergericht.value}
						</div>
					</button>
				</div>
			{/each}
		</listgroup>
	</card>
</div>

{#if cartOpened}
	<Doenerdetail bind:cartOpened bind:doenergerichtname />
{/if}

<!--div class="flex flex-col justify-center items-center">
	<a
		class="aspect-square block mb-6"
		href={link}
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		on:touchstart={() => (hovered = true)}
		on:touchend={() => (hovered = false)}
	>
		<img
			class="object-cover aspect-square"
			width="700"
			height="700"
			loading="lazy"
			src={hovered && hoverImage.length !== 0 ? hoverImage : image}
			alt="{title} image"
		/>
	</a>
	<div class="flex flex-col justify-start flex-grow text-center leading-tight gap-1">
		<a href={link}>{title}</a>
		<div class="flex justify-center gap-3">
			{#if salePrice === 0}
				<span
					>${price.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}</span
				>
			{:else}
				<span class="text-red-600"
					>{salePrice.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}€</span
				>
				<span class="text-gray-600 line-through"
					>{price.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}€</span
				>
			{/if}
		</div>
	</div>
</div-->
