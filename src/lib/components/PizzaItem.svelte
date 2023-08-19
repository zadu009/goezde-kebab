<script lang="ts">
	import pizzas from '../assets/pizza.json';
	import Pizzadetail from '$lib/components/Pizzadetail.svelte';
	import type { WarenkorbArtikel } from '$lib/stores';
	let hovered = false;
	let cartOpened = false;
	let pizzaname = '';
	let pizza: WarenkorbArtikel;
	let data = '';

	function load(i) {
		let item: WarenkorbArtikel;
		item = {
			id: pizzas[i].id.toString(),
			name: pizzas[i].name,
			slug: '',
			thumbnail: '',
			price: parseFloat(pizzas[i].value.replace(',', '.').replace(' ', '')),
			salePrice: parseFloat(pizzas[i].value.replace(',', '.').replace(' ', '')),
			quantity: 2,
			extras: [],
			speziell: '',
			pizzaextras: [],
			sossen: []
		};
		cartOpened = !cartOpened;
		pizza = item;
	}
</script>

<div class="pb-4">
	<card padding="xl" size="md">
		<div class="flex justify-between items-center mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Pizza</h5>
		</div>
		<listgroup class="border-0 dark:!bg-transparent">
			{#each pizzas as pizza, i}
				<div class="flex space-x-4">
					<button
						on:click={() => {
							load(i);
						}}
						class="flex-1 min-w-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
					>
						<p class="text-sm font-medium text-gray-900 truncate text-left">
							{pizza.id}- {pizza.name}
						</p>
						<p
							style="float:left;"
							class="text-sm text-gray-500 truncate dark:text-gray-400 text-left"
						>
							{pizza.detail}
						</p>
						<div class="text-base font-semibold text-gray-900 text-right">
							{pizza.value}
						</div>
					</button>
				</div>
			{/each}
		</listgroup>
	</card>
</div>

{#if cartOpened}
	<Pizzadetail bind:cartOpened bind:pizza bind:data />
{/if}
