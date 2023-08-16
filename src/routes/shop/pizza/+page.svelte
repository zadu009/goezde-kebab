<script lang="ts">
	import pizzas from '$lib/assets/pizza.json';
	import Menue from '$lib/components/Menue.svelte';
	import PizzaItem from '$lib/components/PizzaItem.svelte';
	let hovered = false;
	let cartOpened = false;
	let pizzaname = '';

	function load(i) {
		cartOpened = !cartOpened;
		pizzaname = pizzas[i].name;
	}
</script>

<svelte:head>
	<title>Gözde Kebab</title>
</svelte:head>
<Menue />
<hr />
<div class="flex flex-col py-8 px-3">
	<PizzaItem />
</div>
