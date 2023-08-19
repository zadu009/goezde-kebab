<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import DoenergerichtItem from '$lib/components/DoenergerichtItem.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	export let data: any;
	let showcase = data.showcase;
	let banners = data.carousels;
</script>

<svelte:head>
	<title>Goezde-Kebab</title>
</svelte:head>

{#if banners.length !== 0}
	<Carousel {banners} />
{/if}

<div class="mx-3 md:mx-10">
	<section class="text-gray-800 text-center lg:text-left lg:px-32 lg:py-5">
		<div class="grid lg:grid-cols-2 gap-6 xl:gap-12 justify-center">
			<div class="mb-6 lg:mb-0">
				<h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight">
					Gözde Kebab Abholservice
				</h1>
				<p class="mt-4 text-lg lg:pl-3">
					Wir von Gözde Kebab bieten Gerichte von hervorragender Qualität und laden Sie herzlich
					ein, unsere köstliche Küche kennenzulernen.
				</p>
			</div>
			<div class="mb-6 lg:mb-0 flex flex-col justify-center">
				<p class="text-gray-500 text-lg">
					Der Schlüssel zu unserem Erfolg ist einfach: Wir bieten hochwertige Gerichte, die stets
					den Gaumen erfreuen. Wir sind stolz darauf, unseren Kunden schmackhafte und authentische
					Gerichte zu servieren. zB.: Pizza, Fast Food, Türkisch . Genießen Sie wahre Gaumenfreuden.
					Wählen Sie dazu ein Getränk aus. Und vor allem: Entspannen Sie sich! Wir bedanken uns
					herzlich bei Ihnen für Ihre fortwährende Unterstützung.
				</p>
			</div>
		</div>
	</section>

	{#each showcase as showsection}
		<h2 class="text-center font-extrabold text-6xl pt-20 pb-12 uppercase">{showsection.name}</h2>

		<div class="grid gap-12 grid-cols-2 lg:grid-cols-4">
			<DoenergerichtItem />
		</div>
	{/each}
</div>
<br /><br />
