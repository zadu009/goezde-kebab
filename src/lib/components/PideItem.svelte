<script lang="ts">
	import pides from '../assets/pide.json';
	import Doenerdetail from '$lib/components/Doenerdetail.svelte';
	let hovered = false;
	let cartOpened = false;
	let doenergerichtname = '';

	function load(i) {
		cartOpened = !cartOpened;
		doenergerichtname = pides[i].name;
	}
</script>

<div class="pb-4">
	<card padding="xl" size="md">
		<div class="flex justify-between items-center mb-4">
			<h5 class="text-xl font-bold leading-none text-gray-900">Pide Gerichte</h5>
		</div>
		<listgroup class="border-0 dark:!bg-transparent">
			{#each pides as pide, i}
				<div class="flex space-x-4">
					<button
						on:click={() => {
							load(i);
						}}
						class="flex-1 min-w-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400"
					>
						<p class="text-sm font-medium text-gray-900 truncate text-left">
							{pide.id}- {pide.name}
						</p>
						<p
							style="float:left;"
							class="text-sm text-gray-500 truncate dark:text-gray-400 text-left"
						>
							{pide.detail}
						</p>
						<div class="text-base font-semibold text-gray-900 text-right">
							{pide.value}
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
