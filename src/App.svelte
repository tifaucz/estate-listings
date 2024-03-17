<script lang="ts">
	import EstateListing from './EstateListing.svelte';
	import type { Listing } from './types';
	import { onMount } from 'svelte';
	import EstateFilter from './EstateFilter.svelte';
  
	let listings: Listing[] = [];
	let filteredListings: Listing[] = listings;

	onMount(async () => {
		const response = await fetch('../public/listings.json');
		const data: any[] = await response.json();
		listings = data.map((item) => ({
			id: item.Id || 0,
			dateListed: item.DateListed || '',
			title: item.Title || '',
			description: item.Description || '',
			price: item['Sale Price'] || 0,
			thumbURL: item.ThumbnailURL || '',
			picURL: item.PictureURL || '',
			location: item.Location || '',
			sqft: item.Sqft || 0,
			bedrooms: item.Bedrooms || 0,
			bathrooms: item.Bathrooms || 0,
			parking: item.Parking || 0,
			yearBuilt: item.YearBuilt || 0,
		}));
		filteredListings = listings;

		console.log("mount listings", listings);
	});

	console.log("listings", listings);
	console.log("filteredListings", filteredListings);

	function onSearch(event: CustomEvent<{ bedrooms: number; bathrooms: number; parking: number; priceRange: number }>) {
		const { bedrooms, bathrooms, parking, priceRange } = event.detail;
		filteredListings = listings.filter(listing => {
			return (
				(bedrooms === -1 || listing.bedrooms === bedrooms) &&
				(bathrooms === -1 || listing.bathrooms === bathrooms) &&
				(parking === -1 || listing.parking === parking) &&
				(priceRange === -1 || listing.price <= priceRange)
			);
		});
		console.log("filteredListings", filteredListings);
	}
  </script>
  
  <main class="p-4 mx-auto text-center w-full">
	<EstateFilter on:search={onSearch} listings={listings}/>
	{#if listings.length > 0}
		<EstateListing listings={filteredListings} />
	{:else}
		<p>Loading listings...</p>
	{/if}
  </main>
  
  <style lang="postcss">

  </style>
  