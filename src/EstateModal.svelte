<script lang="ts">
  import type { Listing } from './types';
  import { savedListings } from './store';
  export let listing: Listing;
  export let isOpen = false;

  $: isSaved = $savedListings.some(l => l.id === listing.id);

  function saveListing() {
    console.log("saveListing", isSaved, $savedListings);

    if(isSaved) return;
    const currentListings = [...$savedListings, listing];
    savedListings.set(currentListings);
  }

  function removeListing() {
    console.log("removeListing", isSaved, $savedListings);

    if(!isSaved) return;
    const currentListings = $savedListings.filter(l => l.id!== listing.id);
    savedListings.set(currentListings);
  }

</script>
{#if isOpen}
  <dialog class="z-20 max-w-6xl bg-white text-black w-fit h-fit mx-auto my-8 p-4 flex justify-center items-start shadow-lg">
    <div class="flex justify-between items-center mb-4">
    </div>
    <div class="flex justify-between">
      <div class="w-3/5">
        <h1 class="text-2xl font-bold">{listing.title}</h1>
        <div class="text-3xl font-bold text-blue-600">${listing.price}</div>
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
        <div class="border-t border-gray-300 pt-4">
          <h2 class="text-lg font-semibold mb-4">Contact Agent</h2>
          <form>
            <div class="mb-4">
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
                placeholder="Full Name *"
                type="text"
              />
            </div>
            <div class="mb-4">
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
                placeholder="Email *"
                type="email"
              />
            </div>
            <div class="mb-4">
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
                placeholder="Phone Number *"
                type="tel"
              />
            </div>
            <div class="mb-4">
              <textarea
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm0"
                placeholder="Comments *"
              ></textarea>
            </div>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              Contact Now
            </button>
          </form>
        </div>
      </div>
    </div>
</dialog>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed inset-0 bg-black bg-opacity-30 z-10" on:click={() => isOpen = false} ></div>
{/if}