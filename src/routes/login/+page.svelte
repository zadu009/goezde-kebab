<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { warenkorbArtikelStore } from '$lib/stores';
	import type { WarenkorbArtikel } from '$lib/stores';

	let msgBody = 'Biite Bestätigen Sie Ihre Bestellung?';
	let subject = 'Ihre Bestellung bei Gözde Kebab';
	let email = '';
	let telefonnummer = '';
	let fullname = '';
	let warenkorbArtikelValue: WarenkorbArtikel[];
	let orders: WarenkorbArtikel[];

	export async function getOrders() {
		const unsubscribe = warenkorbArtikelStore.subscribe((value) => {
			warenkorbArtikelValue = value;
		});
		const res = await fetch('https://mailservice-production.up.railway.app/sendFinalMail', {
			method: 'POST',
			body: JSON.stringify({
				recipient: email,
				msgBody,
				subject,
				orders: $warenkorbArtikelStore,
				fullname: fullname,
				telefonnummer: telefonnummer,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
		goto('/order');
	}

	function order() {
		goto('/order');
	}
</script>

<div class="flex items-center justify-center relative isolate overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none">
			<div class="w-full max-w-md space-y-8">
				<div>
					<h1 class="text-center text-3xl md:text-3xl xl:text-3xl font-bold tracking-tight">
						Bitte Kontaktdaten eingeben
					</h1>
				</div>
				<div class="">
					<form class="mt-8 space-y-6">
						<div class="grid grid-cols-1 grid-gap">
							<div>
								<label for="name" class="block text-sm font-semibold leading-6">Name</label>
								<div class="mt-2.5">
									<input
										bind:value={fullname}
										type="text"
										name="name"
										required
										class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label for="email" class="block text-sm font-semibold leading-6">Email</label>
								<div class="mt-2.5">
									<input
										bind:value={email}
										type="email"
										name="email"
										required
										class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label for="nummer" class="block text-sm font-semibold leading-6">Mobil</label>
								<div class="mt-2.5">
									<input
										bind:value={telefonnummer}
										type="tel"
										name="nummer"
										required
										class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div class="grid justify-items-center">
							<button
								on:click={getOrders}
								class="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
								>Bestellung abschließen</button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
