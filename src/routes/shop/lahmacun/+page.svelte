<script lang="ts">
	import LahmacunItem from '$lib/components/LahmacunItem.svelte';
	import Menue from '$lib/components/Menue.svelte';
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
	<LahmacunItem />
</div>
