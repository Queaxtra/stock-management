<script lang="ts">
    import Navbar from "../../../components/dashboard/Navbar.svelte";
    import { deleteProduct } from "$lib/products";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import Button from "../../../ui/Button.svelte";
    import { fade } from 'svelte/transition';

    let productId = "";
    let error = "";
    let isLoading = false;

    const handleDelete = async () => {
        isLoading = true;
        try {
            await deleteProduct(productId);
            toast.success("Product deleted successfully!");
            goto("/dashboard");
        } catch (e) {
            error = (e as Error).message;
        } finally {
            isLoading = false;
        }
    }
</script>

<Navbar />
<Toaster />
<div class="min-h-screen flex items-center justify-center p-4">
    <form on:submit|preventDefault={handleDelete} class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" transition:fade={{duration: 300}}>
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">Delete Product</h1>
            <p class="text-gray-600">Remove a product from your inventory</p>
        </div>
        <div class="space-y-6">
            <div>
                <label for="productId" class="block mb-2 text-xs font-medium">Product ID</label>
                <input type="text" id="productId" bind:value={productId} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Enter Product ID" />
            </div>
            {#if error}
                <div class="text-red-500 bg-red-100 p-2 rounded-lg" transition:fade={{duration: 200}}>{error}</div>
            {/if}
            <div class="flex justify-center">
                {#if isLoading}
                    <Button variant="filled" disabled>Deleting...</Button>
                {:else}
                {#if productId}
                    <Button type="submit" variant="filled">Delete Product</Button>
                {:else}
                    <Button type="button" variant="filled" disabled>Delete Product</Button>
                {/if}
                {/if}
            </div>
        </div>
    </form>
</div>
