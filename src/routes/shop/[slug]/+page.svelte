<script lang="ts">
	import ProductItem from '$lib/components/ProductItem.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	export let data: any;
	$: products = data.items;
</script>

<svelte:head>
	<title>E-Handel Shop</title>
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

<div class="flex flex-col py-8 px-3 lg:flex-row md:px-20">
	<div class="basis-5/6 flex flex-col">
		<div class="grid grid-cols-1 gap-5">
			<ProductItem />
		</div>
	</div>
</div>
