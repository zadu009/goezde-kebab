<script lang="ts">
	import DonergerichtItem from '$lib/components/DoenergerichtItem.svelte';
	import LahmacunItem from '$lib/components/LahmacunItem.svelte';
	import PideItem from '$lib/components/PideItem.svelte';
	import PizzaItem from '$lib/components/PizzaItem.svelte';
	import VegetarischItem from '$lib/components/VegetarischItem.svelte';
	import Menue from '$lib/components/Menue.svelte';

	export let data: any;
	$: products = data.items;
</script>

<svelte:head>
	<title>Gözde Kebab</title>
</svelte:head>
<Menue />
<hr />

<div class="flex flex-col py-8 px-3">
	<div class="basis-5/6 flex flex-col">
		<div class="grid grid-cols-1 gap-5">
			<DonergerichtItem />
			<PizzaItem />
			<LahmacunItem />
			<PideItem />
			<VegetarischItem />
		</div>
	</div>
</div>
