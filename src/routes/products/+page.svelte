<script>
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Button from "../../ui/Button.svelte";
</script>

<div class="flex items-center justify-center min-h-screen" transition:fade={{duration: 300}}>
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-4 md:text-4xl">Where do you wanna go?</h1>
    <p class="text-lg mb-6 md:text-xl">Choose one of the options below.</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex flex-col gap-3 md:flex-row md:gap-4">
        <Button onClick={() => goto('/products/add')} variant="outline">Add Product</Button>
        <Button onClick={() => goto('/products/edit')} variant="outline">Delete Product</Button>
        <Button onClick={() => goto('/products/edit')} variant="outline">Update Product</Button>
    </div>
    <p class="mt-6 text-sm">Or <a href="/dashboard" class="underline">go back</a></p>
  </div>
</div>