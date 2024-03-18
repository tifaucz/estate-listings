<script lang="ts">
	import EstateListing from './EstateListing.svelte';
	import type { Listing } from './types';
	import { onMount } from 'svelte';
	import EstateFilter from './EstateFilter.svelte';
	import { listings, filteredListings, savedListings } from './store';

	onMount(async () => {
		const response = await fetch('../public/listings.json');
		const data: any[] = await response.json();
		const mappedListings: Listing[] = data.map((item) => ({
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
		listings.set(mappedListings);
    	filteredListings.set(mappedListings);
	});

    function onSearch(event: CustomEvent<{ bedrooms: number; bathrooms: number; parking: number; priceRange: number, showWishlist: boolean }>)
	{
		const { bedrooms, bathrooms, parking, priceRange, showWishlist } = event.detail;
		const estates = showWishlist ? $savedListings : $listings;

		const filtered = estates.filter(listing => {
			return (
				(bedrooms === -1 || listing.bedrooms === bedrooms) &&
				(bathrooms === -1 || listing.bathrooms === bathrooms) &&
				(parking === -1 || listing.parking === parking) &&
				(priceRange === -1 || listing.price <= priceRange)
			);
		});
		filteredListings.set(filtered);
    }
</script>

<main class="p-4 mx-auto text-center w-full">
<EstateFilter on:search={onSearch} />
{#if $listings.length > 0}
	<EstateListing />
{:else}
	<p>Loading listings...</p>
{/if}
</main>

<style lang="postcss">
</style>
