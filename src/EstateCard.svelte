<script lang="ts">
  import type { Listing } from './types';
  export let listing: Listing;
</script>
<div class="w-[350px] bg-white shadow-md rounded overflow-hidden p-4">
  <div class="h-[200px] bg-blue-600" style="background-image: url({listing.PictureURL}); background-size: cover;"></div>
  <div class="p-4">
    <h3 class="text-lg font-semibold">{listing.Title}</h3>
    <p class="text-sm text-gray-600">{listing.Location}</p>
    <p class="text-sm text-gray-600">{listing.Bedrooms} beds | {listing.Bathrooms} baths</p>
    <p class="text-xl font-bold text-gray-800">${listing['Sale Price'].toLocaleString()}</p>
    <button class="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      View Details
    </button>
  </div>
</div>
