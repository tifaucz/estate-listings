<script lang="ts">
	import EstateListing from './EstateListing.svelte';
	import type { Listing } from './types';
	import listingsData from '../public/listings.json';
	import { onMount } from 'svelte';
  
	let listings: Listing[] = listingsData;
	onMount(async () => {
		const response = await fetch('../public/listings.json');
    	const data: Listing[] = await response.json();
    	listings = [...data];
	  	console.log("listings", listings);
	});
  </script>
  
  <main class="p-4 mx-auto text-center w-full">
	{#if listings.length > 0}
		<EstateListing {listings} />
	{:else}
		<p>Loading listings...</p>
	{/if}
  </main>
  
  <style lang="postcss">

  </style>
  