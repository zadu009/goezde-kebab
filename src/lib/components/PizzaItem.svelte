<script lang="ts">
	import pizzas from '../assets/pizza.json';
	import Pizzadetail from '$lib/components/Pizzadetail.svelte';
	let hovered = false;
	let cartOpened = false;
	let pizzaname = '';

	function load(i) {
		cartOpened = !cartOpened;
		pizzaname = pizzas[i].name;
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
	<Pizzadetail bind:cartOpened bind:pizzaname />
{/if}
