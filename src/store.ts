import { writable } from 'svelte/store';
import type { Listing } from './types';

export const listings = writable<Listing[]>([]);
export const filteredListings = writable<Listing[]>([]);
export const savedListings = writable<Listing[]>([]);
