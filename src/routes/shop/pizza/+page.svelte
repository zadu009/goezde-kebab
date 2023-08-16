<script lang="ts">
	import pizzas from '$lib/assets/pizza.json';
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

<div class="flex justify-center items-center gap-6 m-auto p-5 flex-wrap">
	<a class="hover:underline underline-offset-4" href="/shop/all">Alle Gerichte</a>
	<a class="hover:underline underline-offset-4" href="/shop/doener">Döner Gerichte</a>
	<a class="hover:underline underline-offset-4" href="/shop/lahamcun">Lahmacun</a>
	<a class="hover:underline underline-offset-4" href="/shop/pide">Pide</a>
	<a class="hover:underline underline-offset-4" href="/shop/pizza">Pizza</a>
	<a class="hover:underline underline-offset-4" href="/shop/seele">Seele</a>
	<a class="hover:underline underline-offset-4" href="/shop/vegetarisch">Vegetarisch</a>
</div>

<hr />
<div class="flex flex-col py-8 px-3">
	<PizzaItem />
</div>
