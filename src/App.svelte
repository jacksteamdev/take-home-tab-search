<script lang="ts">
  import { panelY, panelHidden } from './lib/panel'
  import { onMount } from 'svelte'

  onMount(async () => {
    panelHidden.set(false)
  })

  function handleFormData(e: FormData) {
    const searchTerm = e.get('searchTerm')
    if (searchTerm !== '')
      return chrome.runtime.sendMessage({
        type: 'searchTerm',
        searchTerm,
      })
  }
</script>

<aside style="top: {$panelY}vh">
  <form
    on:submit|preventDefault={(e) => {
      const formData = new FormData(e.currentTarget)
      handleFormData(formData)
    }}
  >
    <label for="searchTerm">Search for a tab by title</label>
    <input type="text" id="searchTerm" name="searchTerm" />
  </form>
</aside>

<style>
  aside {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    position: fixed;
    left: 50vw;
    transform: translate(-50%);

    padding: 1rem;
    margin: 0 auto;
    background-color: #ffebe7;
    border-radius: 0.5em;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;
  }

  label {
    display: block;
  }

  input[type='text'] {
    display: block;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.25em;
  }
</style>
