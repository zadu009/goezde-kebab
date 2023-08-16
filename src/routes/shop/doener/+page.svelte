<script lang="ts">
	import doenergerichte from '$lib/assets/doenergerichte.json';
	import Doenerdetail from '$lib/components/Doenerdetail.svelte';
	import DoenergerichtItem from '$lib/components/DoenergerichtItem.svelte';
	let hovered = false;
	let cartOpened = false;
	let doenergerichtname = '';

	function load(i) {
		cartOpened = !cartOpened;
		doenergerichtname = doenergerichte[i].name;
	}
</script>

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
	<DoenergerichtItem />
</div>
