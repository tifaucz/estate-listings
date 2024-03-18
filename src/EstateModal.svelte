<script lang="ts">
  import type { Listing } from './types';
  import { savedListings } from './store';
  import Contact from './Contact.svelte';
  export let listing: Listing;
  export let isOpen = false;

  $: isSaved = $savedListings.some(l => l.id === listing.id);

  function saveListing()
  {
    if(isSaved) return;
    const currentListings = [...$savedListings, listing];
    savedListings.set(currentListings);
  }

  function removeListing()
  {
    if(!isSaved) return;
    const currentListings = $savedListings.filter(l => l.id!== listing.id);
    savedListings.set(currentListings);
  }

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

</script>
{#if isOpen}
  <dialog class="z-20 max-w-6xl bg-white text-black w-fit h-fit mx-auto my-8 p-4 flex justify-center items-start shadow-lg">
    <div class="flex justify-between items-center mb-4">
    </div>
    <div class="flex justify-between">
      <div class="w-3/5">
        <div class="flex justify-between items-center m-4 text-2xl font-bold">
          <h1>{listing.title}</h1>
          <div class="text-blue-600">${listing.price}</div>
        </div>
        <div class="flex justify-between items-center m-2 text-lg text-gray-600">
          <div><strong>Location:</strong> {listing.location}</div>
          <div><strong>Date Listed:</strong> {formatDate(listing.dateListed)}</div>
        </div>
        <div class="h-96 w-full bg-blue-600" style="background-image: url({listing.picURL}); background-size: cover;"></div>
        <div class="flex items-center justify-between bg-gray-200 p-4 mb-4">
          <div class="text-center">
            <span class="block text-lg font-bold">{listing.bedrooms}</span>
            <span class="block text-sm text-gray-600">BED</span>
          </div>
          <div class="text-center">
            <span class="block text-lg font-bold">{listing.bathrooms}</span>
            <span class="block text-sm text-gray-600">BATH</span>
          </div>
          <div class="text-center">
            <span class="block text-lg font-bold">{listing.parking}</span>
            <span class="block text-sm text-gray-600">PARKING</span>
          </div>
          <div class="text-center">
            <span class="block text-lg font-bold">{listing.sqft}</span>
            <span class="block text-sm text-gray-600">SQFT</span>
          </div>
          <div class="text-center">
            <span class="block text-lg font-bold">{listing.yearBuilt}</span>
            <span class="block text-sm text-gray-600">YEAR BUILT</span>
          </div>
        </div>
        <p class="mb-4">{listing.description}</p>
      </div>
      <div class="w-2/5 bg-gray-100 p-4">
        <div class="mb-4">
          <div class="flex justify-between items-center mb-4">
            {#if !isSaved}
              <button class="inline-flex rounded-md text-sm font-medium border bg-background h-10 px-4 py-2 text-blue-600 border-blue-600"
                on:click={saveListing}
              >Save Property</button> 
            {:else}
              <button class="inline-flex rounded-md text-sm font-medium border bg-background h-10 px-4 py-2 text-red-600 border-red-600"
                on:click={removeListing}
              >Remove Property</button> 
            {/if}
            <button class="inline-flex rounded-md text-sm font-medium border bg-background h-10 px-4 py-2 text-gray-600 border-gray-600 mr-2"
              on:click={() => isOpen = false}
            >Close</button>
          </div>
        </div>
        <Contact />
      </div>
    </div>
  </dialog>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 bg-black bg-opacity-30 z-10" on:click={() => isOpen = false} ></div>
{/if}