<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Listing } from './types';
  export let listing: Listing;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', listing);
  }
</script>
<div class="w-[350px] bg-white text-gray-600 shadow-md rounded overflow-hidden p-4 border-4 border-white hover:border-blue-600">
  <div class="h-[200px] bg-blue-600" style="background-image: url({listing.thumbURL}); background-size: cover;"></div>
  <div class="p-4">
    <h3 class="text-lg font-semibold">{listing.title}</h3>
    <p class="text-sm">{listing.location}</p>
    <p class="text-sm">{listing.bedrooms} beds | {listing.bathrooms} baths</p>
    <p class="text-xl font-bold text-gray-800">${listing.price.toLocaleString()}</p>
    <button on:click={handleClick} class="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      View Details
    </button>
  </div>
</div>
