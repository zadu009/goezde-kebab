<script lang="ts">
	import DoenergerichtItem from '$lib/components/DoenergerichtItem.svelte';
	import Menue from '$lib/components/Menue.svelte';
	let hovered = false;
	let cartOpened = false;
	let doenergerichtname = '';
</script>

<Menue />

<hr />
<div class="flex flex-col py-8 px-3">
	<DoenergerichtItem />
</div>
