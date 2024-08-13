<script>
    import { fly } from "svelte/transition";

    let isOpen = false;
</script>

<div class="bg-white p-4 rounded-lg mt-6 border">
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            <i class="ri-links-line text-2xl mr-3"></i>
            <div>
                <p class="text-base font-semibold">Quick Links</p>
                <p class="text-xs text-custom-gray">Access important sections quickly</p>
            </div>
        </div>
        <button class="md:hidden" on:click={() => isOpen = !isOpen}>
            <i class="ri-menu-line text-2xl"></i>
        </button>
    </div>
    <div class="mt-0 md:mt-4">
        <ul class="hidden md:flex space-x-4 ">
            <li><a href="/dashboard" class="text-custom-gray hover:text-dark-green transition-colors duration-300"><i class="ri-dashboard-fill"></i> Dashboard</a></li>
            <li><a href="/products" class="text-custom-gray hover:text-dark-green transition-colors duration-300"><i class="ri-product-hunt-fill"></i> Products</a></li>
            <li><a href="/profile" class="text-custom-gray hover:text-dark-green transition-colors duration-300"><i class="ri-user-fill"></i> Profile</a></li>
        </ul>
    </div>
    <div class={`mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
        {#if isOpen}
            <ul class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4" transition:fly={{ y: -10, duration: 300 }}>
                <li><a href="/dashboard" class="text-custom-gray hover:text-dark-green transition-colors duration-300 flex items-center"><i class="ri-dashboard-fill mr-2"></i> Dashboard</a></li>
                <li><a href="/products" class="text-custom-gray hover:text-dark-green transition-colors duration-300 flex items-center"><i class="ri-product-hunt-fill mr-2"></i> Products</a></li>
                <li><a href="/profile" class="text-custom-gray hover:text-dark-green transition-colors duration-300 flex items-center"><i class="ri-user-fill"></i> Profile</a></li>
            </ul>
        {/if}
    </div>
</div>
