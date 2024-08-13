<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { fetchAllProducts } from '$lib/products';
    import db from '$lib/db';

    let items: any[] = [];
    let hoveredItem: any = null;
    let currentPage = 0;
    let itemsPerPage = 8;
    let filteredItems = items;

    onMount(async () => {
        try {
            const username = db.authStore.model?.username;
            items = await fetchAllProducts();
            filteredItems = items.filter(item => item.author === username);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    $: getPaginatedItems = () => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredItems.slice(start, end);
    };

    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < items.length) {
            currentPage++;
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            currentPage--;
        }
    };

    $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);
</script>

<h1 class="text-2xl font-semibold mb-4 mt-14">Items</h1>
{#if items.length === 0}
<p>No items found.</p>
{:else}
<div class="flex justify-between items-center mb-4">
    <div class="flex items-center">
        <button class="w-10 h-10 rounded-full bg-white border" on:click={prevPage} disabled={currentPage === 0}>
            <i class="ri-arrow-left-s-line"></i>
        </button>
        <div class="mx-4 text-lg">
            {currentPage + 1} / {totalPages}
        </div>
        <button class="w-10 h-10 rounded-full bg-white border" on:click={nextPage} disabled={(currentPage + 1) * itemsPerPage >= items.length}>
            <i class="ri-arrow-right-s-line"></i>
        </button>
    </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    {#each getPaginatedItems() as item}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="bg-white p-4 rounded-lg border relative {item.status === 'Out of Stock' ? 'opacity-50 cursor-not-allowed' : ''}" on:mouseenter={() => hoveredItem = item} on:mouseleave={() => hoveredItem = null}>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="ri-box-1-line text-2xl mr-3"></i>
                    <div>
                        <p class="text-base font-semibold">{item.name}</p>
                        <p class="text-xs text-custom-gray">{item.description}</p>
                        {#if item.status === 'In Stock'}
                            <div class="mt-2 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">In Stock</div>
                        {:else if item.status === 'Out of Stock'}
                            <div class="mt-2 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">Out of Stock</div>
                        {:else if item.status === 'Low Stock'}
                            <div class="mt-2 inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Low Stock</div>
                        {/if}
                    </div>
                </div>
                <div>
                    <p class="text-2xl font-semibold">${item.price}</p>
                </div>
            </div>
            
            {#if hoveredItem === item}
                <div class="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-4 z-10" transition:fade={{ duration: 300 }}>
                    <p><b>Item Code:</b> {item.itemCode}</p>
                    <p><b>Quantity:</b> {item.quantity}</p>
                    <p><b>Status:</b> {item.status}</p>
                </div>
            {/if}
        </div>
    {/each}
</div>
<div class="flex items-center">
    <input type="text" placeholder="Search items" class="w-full p-2 border rounded-lg focus:outline-none px-4" on:input={(e) => e.target && searchItems(e.target.value)} />
</div>
{/if}
