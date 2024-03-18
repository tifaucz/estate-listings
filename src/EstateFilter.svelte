<script lang="ts">
  import { createEventDispatcher } from 'svelte';
	import { listings } from './store';

  let bedrooms: number = -1;
  let bathrooms: number = -1;
  let parking: number = -1;
  let priceRange: number = -1;
  let showWishlist: boolean = false; 
  const dispatch = createEventDispatcher();

  function dispatchSearch() {
    dispatch('search', {
      bedrooms,
      bathrooms,
      parking,
      priceRange,
      showWishlist
    });
  }

  $: if ($listings.length > 0) {
    if(priceRange < 0) priceRange = priceRangeMax; 
    dispatchSearch();
  }

  $: if (priceRange !== -1) {
    dispatchSearch();
  }

  $: if (showWishlist !== undefined) {
    dispatchSearch();
  }

  $: bedroomOptions = [ ...new Set($listings.map(listing => listing.bedrooms))].sort((a: number, b: number) => a - b);
  $: bathroomOptions = [ ...new Set($listings.map(listing => listing.bathrooms))].sort((a, b) => a - b);
  $: parkingOptions = [ ...new Set($listings.map(listing => listing.parking))].sort((a, b) => a - b);
  $: priceRangeMin = Math.min(...$listings.map(listing => listing.price));
  $: priceRangeMax = Math.max(...$listings.map(listing => listing.price));

</script>

<div class="flex justify-center items-center space-x-4 text-black p-8">
  
  <div class="flex items-center space-x-2 p-4">
    <label class="text-blue-600 font-bold" for="bedrooms">Bedrooms:</label>
    <select class="border-2 border-blue-600 rounded p-1" bind:value={bedrooms} id="bedrooms">
      <option value={-1}>Any</option>
      {#each bedroomOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  
  <div class="flex items-center space-x-2 p-4">
    <label class="text-blue-600 font-bold" for="bathrooms">Bathrooms:</label>
    <select class="border-2 border-blue-600 rounded p-1" bind:value={bathrooms} id="bathrooms">
      <option value={-1}>Any</option>
      {#each bathroomOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  
  <div class="flex items-center space-x-2 p-4">
    <label class="text-blue-600 font-bold" for="parking">Parking:</label>
    <select class="border-2 border-blue-600 rounded p-1" bind:value={parking} id="parking">
      <option value={-1}>Any</option>
      {#each parkingOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>

  <div class="flex items-center space-x-2 p-4">
    <label class="text-blue-600 font-bold w-32 min-w-fit" for="price-range">Max Price: {(priceRange != priceRangeMax) ? "$"+priceRange.toLocaleString() : "All"}</label>
    <input class="w-80" id="price-range" max={priceRangeMax} min={priceRangeMin} type="range" bind:value={priceRange} />
  </div>

  <div class="flex items-center">
    <label class="inline-flex items-center mr-4">
      <input type="radio" class="form-radio" bind:group={showWishlist} value={false} />
      <span class="ml-2 text-blue-600 font-bold">Show All</span>
    </label>
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" bind:group={showWishlist} value={true} />
      <span class="ml-2 text-blue-600 font-bold">Show Your Wishlist</span>
    </label>
  </div>

</div>

<style>
</style>
