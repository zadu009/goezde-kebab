import { writable } from 'svelte/store';
import { browser } from '$app/environment';


export const warenkorbArtikelStore = writable(getStorePersistance('warenkorbArtikelStore'));

warenkorbArtikelStore.subscribe((val) => {
	if (browser) {
		localStorage.setItem('warenkorbArtikelStore', JSON.stringify(val));
	}
});

export function addToCart(newItem: WarenkorbArtikel) {
	warenkorbArtikelStore.update((oldItems) => {
			return [...oldItems, newItem];
	});
}

export function removeFromCart(newItem: WarenkorbArtikel) {
	warenkorbArtikelStore.update((oldItems) => {
		oldItems = oldItems.filter((item) => item !== newItem);
		return oldItems;
	});
}

export function emptyCart() {
	warenkorbArtikelStore.set([]);
}

function getStorePersistance(key: string): WarenkorbArtikel[] {
	if (!browser) {
		return [] as WarenkorbArtikel[];
	}

	const storedItems: WarenkorbArtikel[] = JSON.parse(localStorage.getItem(key) || '{}');

	if (Object.keys(storedItems).length <= 0) {
		return [] as WarenkorbArtikel[];
	} else {
		return storedItems;
	}
}


export interface WarenkorbArtikel {
	id: string;
	name: string;
	slug: string;
	price: number;
	salePrice: number;
	thumbnail: string;
	quantity: number;
	extras: any;
	speziell: string;
	pizzaextras: any;
	sossen: string[];
}
