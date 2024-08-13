<script lang="ts">
    import Navbar from "../../../components/dashboard/Navbar.svelte";
    import { createProduct } from "$lib/products";
    import db from "$lib/db";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import Button from "../../../ui/Button.svelte";
    import { fade } from 'svelte/transition';

    let productInfo = {
        name: '',
        description: '',
        price: 0,
        itemCode: '',
        quantity: 0,
        status: '',
        author: db.authStore.model?.username
    };

    let error = "";
    let isLoading = false;

    const handleSubmit = async () => {
        isLoading = true;
        try {
            const product = await createProduct(productInfo.name, productInfo.description, productInfo.price, productInfo.itemCode, productInfo.quantity, productInfo.status, productInfo.author);
            if (product) {
                toast.success("Product created successfully!");
                goto("/dashboard");
            }
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
    <form on:submit|preventDefault={handleSubmit} class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" transition:fade={{duration: 300}}>
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">Create Product</h1>
            <p class="text-gray-600">Add a new product to your inventory</p>
        </div>
        <div class="space-y-6">
            <div>
                <label for="name" class="block mb-2 text-xs font-medium">Product Name</label>
                <input type="text" id="name" bind:value={productInfo.name} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Product Name" />
            </div>
            <div>
                <label for="description" class="block mb-2 text-xs font-medium">Description</label>
                <textarea id="description" bind:value={productInfo.description} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Product Description"></textarea>
            </div>
            <div>
                <label for="price" class="block mb-2 text-xs font-medium">Price</label>
                <input type="number" id="price" bind:value={productInfo.price} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Price" />
            </div>
            <div>
                <label for="itemCode" class="block mb-2 text-xs font-medium">Item Code</label>
                <input type="text" id="itemCode" bind:value={productInfo.itemCode} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Item Code" />
            </div>
            <div>
                <label for="quantity" class="block mb-2 text-xs font-medium">Quantity</label>
                <input type="number" id="quantity" bind:value={productInfo.quantity} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Quantity" />
            </div>
            <div>
                <label for="status" class="block mb-2 text-xs font-medium">Status</label>
                <select id="status" bind:value={productInfo.status} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm">
                    <option value="" disabled selected>Select Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Low Stock">Low Stock</option>
                </select>
            </div>
            <div>
                <label for="author" class="block mb-2 text-xs font-medium">Author</label>
                <input type="text" id="author" readonly bind:value={productInfo.author} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Author" disabled />
            </div>
            {#if error}
                <div class="text-red-500 bg-red-100 p-2 rounded-lg" transition:fade={{duration: 200}}>{error}</div>
            {/if}
            <div class="flex justify-center">
                {#if isLoading}
                    <Button variant="filled" disabled>Creating...</Button>
                {:else}
                {#if productInfo.name && productInfo.description && productInfo.price && productInfo.itemCode && productInfo.quantity && productInfo.status}
                    <Button type="submit" variant="filled">Create Product</Button>
                {:else}
                    <Button type="button" variant="filled" disabled>Create Product</Button>
                {/if}
                {/if}
            </div>
        </div>
    </form>
</div>
