<script lang="ts">
	import Menue from '$lib/components/Menue.svelte';
	import PideItem from '$lib/components/PideItem.svelte';
	let hovered = false;
	let cartOpened = false;
	let pizzaname = '';
</script>

<svelte:head>
	<title>Gözde Kebab</title>
</svelte:head>
<Menue />
<hr />
<div class="flex flex-col py-8 px-3">
	<PideItem />
</div>
