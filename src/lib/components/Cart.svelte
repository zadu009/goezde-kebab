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
	let backgroundNode: HTMLElement;

	let cartItemsValue: WarenkorbArtikel[];
	let checkoutPrice: number;

	$: {
		let value = 0;
		for (const item of cartItemsValue) {
			if (item.price === 0) {
				value += item.price * item.quantity;
			} else {
				value += item.price * item.quantity;
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
	onDestroy(unsubscribe);
</script>

<div
	class="fixed w-full max-w-lg right-0 inset-y-0 flex flex-col bg-white z-20"
	use:clickoutside={{ limit: { parent: backgroundNode } }}
	on:clickoutside={() => (cartOpened = false)}
>
	<div class="flex items-center justify-between mx-5 py-4">
		<h1 class="uppercase font-bold text-xl">
			{cartItemsValue.length}
			{cartItemsValue.length === 1 ? 'Artikel' : 'Artikel'}
		</h1>

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

	{#if cartItemsValue.length !== 0}
		<div class="flex-col overflow-y-auto">
			{#each $warenkorbArtikelStore as cartItem}
				<div class="flex mx-5 mb-5 gap-5">
					<div>
						<a href="/products/{cartItem.slug}" target="_self">{cartItem.name}</a>
						{#each cartItem.sossen as sosse}
							<p class="text-sm">{sosse}</p>
						{/each}
						{#each cartItem.extras as extra}
							<div>
								<p style="float:right;" class=" text-gray-500 text-sm">
									+{Number(extra.doenerextra.price).toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})}€
								</p>
								<p class="text-sm">{extra.doenerextra.name}</p>
							</div>
						{/each}
						{#each cartItem.pizzaextras as pextra}
							<div>
								<p style="float:right;" class=" text-gray-500 text-sm">
									+{Number(pextra.pizzaextra.price).toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2
									})}€
								</p>
								<p class="text-sm">{pextra.pizzaextra.name}</p>
							</div>
						{/each}
						{#if cartItem.speziell.length > 2}
							<p class="font-bold">Spezielle Anweisungen:</p>
							<p class="text-sm">{cartItem.speziell}</p>
						{/if}

						<div class="flex gap-3 my-2">
							<QuantityInput bind:count={cartItem.quantity} mini={true} />
							<button on:click={() => removeFromCart(cartItem)} class="font-light hover:underline">
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
							<p class="text-right text-600">
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
				Zur Kasse {checkoutPrice.toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}€
			</button>
		</div>
	{:else}
		<div class="flex flex-col justify-center h-full">
			<p class="text-center">Dein Einkaufskorb ist leer.</p>
			<div class="px-10 py-10">
				<a href="/shop/all" target="_self">
					<button
						class="w-full h-12 text-black font-bold transition-colors duration-150 bg-yellow-300 focus:shadow hover:bg-yellow-500"
					>
						Jetzt einkaufen
					</button>
				</a>
			</div>
		</div>
	{/if}
</div>

<div bind:this={backgroundNode} class="fixed inset-0 bg-black opacity-40 z-[15]" />
