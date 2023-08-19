<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import { onDestroy } from 'svelte';
	import { warenkorbArtikelStore, removeFromCart, type WarenkorbArtikel } from '$lib/stores';
	import QuantityInput from '$lib/components/QuantityInput.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js/pure';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let stripe: any = null;

	export let cartOpened: boolean;
	export let pizzaname: string;
	let backgroundNode: HTMLElement;

	let cartItemsValue: WarenkorbArtikel[];
	let checkoutPrice: number;

	$: {
		let value = 0;
		for (const item of cartItemsValue) {
			if (item.salePrice === 0) {
				value += item.price * item.quantity;
			} else {
				value += item.salePrice * item.quantity;
			}
		}
		checkoutPrice = Math.round(value * 100) / 100;
	}

	const unsubscribe = warenkorbArtikelStore.subscribe((value) => {
		cartItemsValue = value;
	});

	async function handlePayment() {
		if ($currentUser) {
			goto('/payment');
			cartOpened = false;
		} else {
			goto('/login');
			cartOpened = false;
		}
	}

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	onDestroy(unsubscribe);
</script>

<div
	class="fixed w-full max-w-lg right-0 inset-y-0 flex flex-col bg-white z-20 scroll"
	use:clickoutside={{ limit: { parent: backgroundNode } }}
	on:clickoutside={() => (cartOpened = false)}
>
	<div class="flex items-center justify-between mx-5 py-4">
		<h1 class="uppercase font-bold text-xl">{pizzaname}</h1>

		<button on:click={() => (cartOpened = !cartOpened)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
	<hr class="mb-5" />

	<h1 class="p-2 uppercase font-bold text-xl">Extras</h1>
	<div class="gap-3 my-2">
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Mit Knoblauchsoße</span>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Mit scharfer Soße</span>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Mit Joghurtsoße</span>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Extra Käse&nbsp;&nbsp;</span>
				<p style="float:right;" class=" text-gray-500 truncate dark:text-gray-400 text-left">
					+0,50 €
				</p>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Extra Dönerfleisch</span>
				<p style="float:right;" class=" text-gray-500 truncate dark:text-gray-400 text-left">
					+1,00 €
				</p>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input type="checkbox" value="true" class="checkbox" />
				<span class="label-text">Extra 1 Stück hausgemachtes Brot&nbsp;&nbsp;</span>
				<p style="float:right;" class=" text-gray-500 truncate dark:text-gray-400 text-left">
					+1,00 €
				</p>
			</label>
		</div>
		<div class="gap-3 p-2">
			Menge <QuantityInput mini={true} />
		</div>
	</div>
	<div class="p-2">
		<label for="about" class="block text-sm font-medium leading-6 text-gray-900"
			>Spezielle Anweisung</label
		>
		<div class="p-2">
			<textarea
				id="about"
				name="about"
				rows="3"
				placeholder="Beispiel: Ohne Tomaten"
				class="block rounded-md border-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</div>
	</div>
	<div class="flex-col overflow-y-auto">
		{#each $warenkorbArtikelStore as cartItem}
			<div class="flex mx-5 mb-5 gap-5">
				<img
					src="{PUBLIC_POCKETBASE_URL}/api/files/products/{cartItem.id}/{cartItem.thumbnail}"
					width="92"
					height="92"
					alt="{cartItem.name} thumbnail"
				/>

				<div>
					<a href="/products/{cartItem.slug}" target="_self">{cartItem.name}</a>
					<div class="flex gap-3 my-2">
						<QuantityInput bind:count={cartItem.quantity} mini={true} />
						<button
							on:click={() => removeFromCart(cartItem.slug)}
							class="font-light hover:underline"
						>
							Entfernen
						</button>
					</div>
				</div>

				<div class="flex flex-col grow">
					{#if cartItem.salePrice === 0}
						<p class="text-right">
							{Number(cartItem.price * cartItem.quantity).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}€
						</p>
					{:else}
						<p class="text-right text-red-600">
							{Number(cartItem.salePrice * cartItem.quantity).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}€
						</p>
						<p class="text-right text-gray-600 line-through">
							{Number(cartItem.price * cartItem.quantity).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}€
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="px-10 py-10 grow flex items-end">
		<button
			class="w-full h-12 text-black font-bold transition-colors duration-150 bg-yellow-300 focus:shadow hover:bg-yellow-500"
			on:click={() => handlePayment()}
		>
			In den Warenkorb {checkoutPrice.toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			})}€
		</button>
	</div>
</div>

<div bind:this={backgroundNode} class="fixed inset-0 bg-black opacity-40 z-[15]" />

<style>
	div.scroll {
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
