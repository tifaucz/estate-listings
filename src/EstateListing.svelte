<script lang="ts">
  import EstateCard from './EstateCard.svelte';
  import EstateModal from './EstateModal.svelte';
  import type { Listing } from './types';
  import { filteredListings } from './store';

  let selectedListing: Listing | null = null;
  let isModalOpen = false;

  function handleCardClick(event: CustomEvent<Listing>) {
    selectedListing = event.detail;
    isModalOpen = true;
  }

</script>
{#if selectedListing}
  <EstateModal listing={selectedListing} bind:isOpen={isModalOpen} />
{/if}
{#if $filteredListings.length === 0}
  <p class="text-center text-xl text-gray-600 m-16" >No listings in the selection</p>
{:else}
  <ul class="flex flex-wrap -mx-4">
    {#each $filteredListings as listing}
      <li class="px-4 mb-4 flex-auto">
        <EstateCard {listing} on:click={handleCardClick} />
      </li>
    {/each}
  </ul>
{/if}
