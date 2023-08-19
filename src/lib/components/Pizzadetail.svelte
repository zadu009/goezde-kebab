<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import { onDestroy } from 'svelte';
	import {
		warenkorbArtikelStore,
		removeFromCart,
		addToCart,
		type WarenkorbArtikel
	} from '$lib/stores';
	import QuantityInput from '$lib/components/QuantityInput.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js/pure';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let stripe: any = null;

	export let cartOpened: boolean;
	export let data: any;
	let original_data = data;
	let quantity = 1;
	let product = data;
	export let pizza: WarenkorbArtikel;
	let backgroundNode: HTMLElement;
	let warenkorbArtikelValue: WarenkorbArtikel[];
	let checkoutPrice: number;
	let doenersossen = [''];
	let anweisung;
	let pizzaextras = [
		{ name: 'Extra Salami', selected: false, price: 2.3 },
		{ name: 'Extra Thunfisch', selected: false, price: 3.3 },
		{ name: 'Extra Paprika', selected: false, price: 4.3 },
		{ name: 'Extra Sucuk', selected: false, price: 2.3 },
		{ name: 'Extra Zwiebel', selected: false, price: 3.3 },
		{ name: 'Extra Käse', selected: false, price: 4.3 },
		{ name: 'Extra Peperoni', selected: false, price: 2.3 },
		{ name: 'Extra Ananas', selected: false, price: 3.3 },
		{ name: 'Extra Pilze', selected: false, price: 4.3 }
	];
	let pizzaextrasSelected = [];

	$: {
		let value = 0;
		for (const item of warenkorbArtikelValue) {
			if (item.price === 0) {
				value += item.price * item.quantity;
			} else {
				value += item.price * item.quantity;
			}
		}
		checkoutPrice = Math.round(value * 100) / 100;
	}

	const unsubscribe = warenkorbArtikelStore.subscribe((value) => {
		warenkorbArtikelValue = value;
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

	function prepareToCart() {
		let item: WarenkorbArtikel;
		item = {
			id: pizza.id,
			name: pizza.name,
			slug: product.slug,
			thumbnail: '',
			price: pizza.price,
			salePrice: pizza.salePrice,
			quantity: quantity,
			extras: [],
			sossen: doenersossen,
			speziell: anweisung,
			pizzaextras: pizzaextrasSelected
		};

		addToCart(item);
		cartOpened = false;
	}

	function addExtra(pizzaextra) {
		pizzaextra.selected = !pizzaextra.selected;
		if (pizzaextra.selected) {
			pizzaextrasSelected.push({ pizzaextra });
			pizza.price = pizza.price + pizzaextra.price;
		}
		if (!pizzaextra.selected) {
			pizza.price = pizza.price - pizzaextra.price;
			pizzaextrasSelected = dopizzaextrasSelectedenerextrasSelected.filter((t) => t != pizzaextra);
		}
	}
</script>

<div
	class="fixed w-full max-w-lg right-0 inset-y-0 flex flex-col bg-white z-20 scroll"
	use:clickoutside={{ limit: { parent: backgroundNode } }}
	on:clickoutside={() => (cartOpened = false)}
>
	<div class="flex items-center justify-between mx-5 py-4">
		<h1 class="uppercase font-bold text-xl">{pizza.name}</h1>

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
				<input
					type="checkbox"
					bind:group={doenersossen}
					value={'Mit Knoblauchsoße'}
					class="checkbox"
				/>
				<span class="label-text">Mit Knoblauchsoße</span>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input
					type="checkbox"
					bind:group={doenersossen}
					value={'Mit Scharfer Soße'}
					class="checkbox"
				/>
				<span class="label-text">Mit scharfer Soße</span>
			</label>
		</div>
		<div class="gap-3 p-2">
			<label class="label cursor-pointer">
				<input
					type="checkbox"
					bind:group={doenersossen}
					value={'Mit Joghurtsoße'}
					class="checkbox"
				/>
				<span class="label-text">Mit Joghurtsoße</span>
			</label>
		</div>

		{#each pizzaextras as pizzaextra}
			<div class="gap-3 p-2">
				<label class="label cursor-pointer">
					<input
						type="checkbox"
						id={pizzaextra.name}
						bind:checked={pizzaextra.selected}
						on:click={() => addExtra(pizzaextra)}
					/>
					<label for={pizzaextra.name}>{pizzaextra.name}</label>
					<p
						style="float:right;"
						class=" text-sm text-gray-500 truncate dark:text-gray-400 text-left"
					>
						+{Number(pizzaextra.price).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}€
					</p>
				</label>
			</div>
		{/each}

		<div class="gap-3 p-2">
			Menge <QuantityInput mini={true} bind:count={quantity} />
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
				bind:value={anweisung}
				placeholder="Beispiel: Ohne Tomaten"
				class="block rounded-md border-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</div>
	</div>

	<div class="px-10 py-10 grow flex items-end">
		<button
			class="w-full h-12 text-black font-bold transition-colors duration-150 bg-yellow-300 focus:shadow hover:bg-yellow-500"
			on:click={() => prepareToCart()}
		>
			In den Warenkorb {(pizza.price * quantity).toLocaleString(undefined, {
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
