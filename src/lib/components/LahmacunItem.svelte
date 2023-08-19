<script lang="ts">
	import lahmacuns from '../assets/lahmacun.json';
	import Doenerdetail from '$lib/components/Doenerdetail.svelte';
	import type { WarenkorbArtikel, warenkorbArtikelStore } from '$lib/stores';
	let hovered = false;
	let cartOpened = false;
	let doener: WarenkorbArtikel;
	let data = '';

	function load(i) {
		cartOpened = !cartOpened;
		doener.name = lahmacuns[i].name;
		doener.id = lahmacuns[i].id.toString();
		doener.price = parseFloat(lahmacuns[i].value);
	}
</script>

<div class="pb-4">
	<card padding="xl" size="md">
		<div class="flex justify-between items-center mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Lahmacun Gerichte</h5>
		</div>
		<listgroup class="border-0 dark:!bg-transparent">
			{#each lahmacuns as lahmacun, i}
				<div class="flex space-x-4">
					<button
						on:click={() => {
							load(i);
						}}
						class="flex-1 min-w-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
					>
						<p class="text-sm font-medium text-gray-900 truncate text-left">
							{lahmacun.id}- {lahmacun.name}
						</p>
						<p
							style="float:left;"
							class="text-sm text-gray-500 truncate dark:text-gray-400 text-left"
						>
							{lahmacun.detail}
						</p>
						<div class="text-base font-semibold text-gray-900 text-right">
							{lahmacun.value}
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
