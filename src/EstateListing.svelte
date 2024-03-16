<script lang="ts">
  import EstateCard from './EstateCard.svelte';
  import type { Listing } from './types';

  export let listings: Listing[];
</script>

<ul class="flex flex-wrap -mx-4">
  {#each listings as listing}
    <li class="px-4 mb-4 flex-auto">
      <EstateCard {listing} />
    </li>
  {/each}
</ul>
