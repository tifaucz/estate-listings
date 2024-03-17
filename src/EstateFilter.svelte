<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Listing } from './types';

  export let listings: Listing[] = [];

  console.log('listings', listings);

  $: priceRangeMin = Math.min(...listings.map(listing => listing.price));
  $: priceRangeMax = Math.max(...listings.map(listing => listing.price));

  let bedrooms: number = -1;
  let bathrooms: number = -1;
  let parking: number = -1;
  let priceRange: number = -1;

  const dispatch = createEventDispatcher();

  $: if (listings.length > 0) {
    dispatchSearch();
  }

  function dispatchSearch() {
    dispatch('search', {
      bedrooms,
      bathrooms,
      parking,
      priceRange,
    });
  }

  $: if (priceRange !== -1) {
    dispatchSearch();
  }

  $: bedroomOptions = [ ...new Set(listings.map(listing => listing.bedrooms))].sort((a: number, b: number) => a - b);
  $: bathroomOptions = [ ...new Set(listings.map(listing => listing.bathrooms))].sort((a, b) => a - b);
  $: parkingOptions = [ ...new Set(listings.map(listing => listing.parking))].sort((a, b) => a - b);

</script>

<div class="max-w-4xl mx-auto p-4 flex items-center space-x-4 text-black">
  
  <div class="flex items-center space-x-2">
    <label class="text-blue-600 font-medium" for="bedrooms">Bedrooms:</label>
    <select bind:value={bedrooms} id="bedrooms">
      <option value={-1}>Any</option>
      {#each bedroomOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  
  <div class="flex items-center space-x-2">
    <label class="text-blue-600 font-medium" for="bathrooms">Bathrooms:</label>
    <select bind:value={bathrooms} id="bathrooms">
      <option value={-1}>Any</option>
      {#each bathroomOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  
  <div class="flex items-center space-x-2">
    <label class="text-blue-600 font-medium" for="parking">Parking:</label>
    <select bind:value={parking} id="parking">
      <option value={-1}>Any</option>
      {#each parkingOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>

  <div class="flex items-center space-x-2">
    <label class="text-blue-600 font-medium w-32" for="price-range">Max Price: {(priceRange != priceRangeMax && priceRange > 0) ? "$"+priceRange.toLocaleString() : "Any"}</label>
    <input class="w-80" id="price-range" max={priceRangeMax} min={priceRangeMin} type="range" bind:value={priceRange} />
  </div>

</div>

<style>
</style>
