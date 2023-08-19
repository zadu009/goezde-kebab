<script lang="ts">
	import vegetarische from '../assets/vegetarisch.json';
	import Doenerdetail from '$lib/components/Doenerdetail.svelte';
	import type { WarenkorbArtikel, warenkorbArtikelStore } from '$lib/stores';
	let hovered = false;
	let cartOpened = false;
	let doener: WarenkorbArtikel;
	let data = '';

	function load(i) {
		let item: WarenkorbArtikel;
		item = {
			id: vegetarische[i].id.toString(),
			name: vegetarische[i].name,
			slug: '',
			thumbnail: '',
			price: parseFloat(vegetarische[i].value.replace(',', '.').replace(' ', '')),
			salePrice: parseFloat(vegetarische[i].value.replace(',', '.').replace(' ', '')),
			quantity: 2,
			extras: [],
			speziell: '',
			pizzaextras: [],
			sossen: []
		};
		cartOpened = !cartOpened;
		doener = item;
	}
</script>

<div class="pb-4">
	<card padding="xl" size="md">
		<div class="flex justify-between items-center mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Vegetarische Gerichte</h5>
		</div>
		<listgroup class="border-0 dark:!bg-transparent">
			{#each vegetarische as vegetarisch, i}
				<div class="flex space-x-4">
					<button
						on:click={() => {
							load(i);
						}}
						class="flex-1 min-w-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
					>
						<p class="text-sm font-medium text-gray-900 truncate text-left">
							{vegetarisch.id}- {vegetarisch.name}
						</p>
						<p
							style="float:left;"
							class="text-sm text-gray-500 truncate dark:text-gray-400 text-left"
						>
							{vegetarisch.detail}
						</p>
						<div class="text-base font-semibold text-gray-900 text-right">
							{vegetarisch.value}
						</div>
					</button>
				</div>
			{/each}
		</listgroup>
	</card>
</div>

{#if cartOpened}
	<Doenerdetail bind:cartOpened bind:doener bind:data />
{/if}
