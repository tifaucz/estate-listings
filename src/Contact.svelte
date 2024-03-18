<script lang="ts">
import type { ContactMessage } from './types';

const contactMessage = <ContactMessage>({
  fullName: '',
  email: '',
  phoneNumber: '',
  comments: ''
});

let validationErrors: Record<string, string> = {};

let formSubmittedSuccessfully = false;

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^[+\d-()\s]*$/;
  return phoneRegex.test(phoneNumber);
}

function validateFullName(fullName: string): boolean {
  return fullName.trim().split(' ').length > 1;
}

function handleSubmit() {
  formSubmittedSuccessfully = false;
  let isValid = true;
  validationErrors = {};

  if (!validateFullName(contactMessage.fullName)) {
    validationErrors.fullName = 'Full Name is required';
    isValid = false;
  }

  if (!contactMessage.email.trim()) {
    validationErrors.email = 'Email is required';
    isValid = false;
  } else if (!validateEmail(contactMessage.email)) {
    validationErrors.email = 'Please enter a valid email';
    isValid = false;
  }

  if (!contactMessage.phoneNumber.trim()) {
    validationErrors.phoneNumber = 'Phone Number is required';
    isValid = false;
  } else if (!validatePhoneNumber(contactMessage.phoneNumber)) {
    validationErrors.phoneNumber = 'Phone Number can only contain numbers, +, -, (, and )';
    isValid = false;
  }

  if (!contactMessage.comments.trim()) {
    validationErrors.comments = 'Comments are required';
    isValid = false;
  }

  if (isValid) {
    formSubmittedSuccessfully = true;
    console.log(contactMessage);
  }
}

$: errorMessages = Object.values(validationErrors).filter(Boolean);

</script>
<div class="border-t border-gray-300 pt-4">
  <h2 class="text-lg font-semibold mb-4">Contact Agent</h2>
  {#if errorMessages.length > 0}
    <div class="mb-4">
      {#each errorMessages as errorMessage}
        <p class="text-red-500 text-xs">{errorMessage}</p>
      {/each}
    </div>
  {/if}
  <form>
    <div class="mb-4">
      <input
        bind:value={contactMessage.fullName}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
        placeholder="Full Name *"
        type="text"
      />
    </div>
    <div class="mb-4">
      <input
        bind:value={contactMessage.email}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
        placeholder="Email *"
        type="email"
      />
    </div>
    <div class="mb-4">
      <input
        bind:value={contactMessage.phoneNumber}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium0"
        placeholder="Phone Number *"
        type="tel"
      />
    </div>
    <div class="mb-4">
      <textarea
        bind:value={contactMessage.comments}
        class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm0"
        placeholder="Comments *"
      ></textarea>
    </div>

    <button class="inline-flex rounded-md text-sm font-medium border-2 bg-background h-10 px-4 py-2 text-gray-600 border-gray-600 mr-2"
      on:click|preventDefault={handleSubmit}
    >Contact Now</button>

    {#if formSubmittedSuccessfully}
      <p class="text-green-500">Message sent successfully</p>
    {/if}

  </form>
</div>
