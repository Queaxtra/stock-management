<script lang="ts">
    import { fly } from 'svelte/transition';
    import { logoutUser } from '$lib/user';
    import { goto } from '$app/navigation';

    let isDropdownOpen = false;
    let isSidebarOpen = false;

    const toggleDropdown = () => {
        isDropdownOpen = !isDropdownOpen;
    }

    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
    }

    const logout = async () => {
        await logoutUser().then(() => {
            goto('/login');
        })
    }
</script>

<nav class="bg-white border-b">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-lg font-bold">
            <a href="/">Stock Management</a>
        </div>
        <div class="hidden md:flex space-x-4">
            <a href="/dashboard" class="flex items-center transition-colors duration-300">
                <i class="ri-dashboard-fill mr-2"></i> Dashboard
            </a>
            <div class="relative">
                <button on:click={toggleDropdown} class="flex items-center transition-colors duration-300">
                    <i class="ri-product-hunt-fill mr-2"></i> Product Management
                    <i class="ri-arrow-down-s-line ml-1"></i>
                </button>
                {#if isDropdownOpen}
                    <div transition:fly={{ y: -10, duration: 300 }} class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
                        <div class="py-1">
                            <a href="/products/add" class="block px-4 py-2 text-sm transition-colors duration-300">
                                <i class="ri-add-line mr-2"></i> Add Product
                            </a>
                            <a href="/products/edit" class="block px-4 py-2 text-sm transition-colors duration-300">
                                <i class="ri-edit-line mr-2"></i> Edit Product
                            </a>
                            <a href="/products/delete" class="block px-4 py-2 text-sm transition-colors duration-300">
                                <i class="ri-delete-bin-line mr-2"></i> Delete Product
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
            <button on:click={logout} class="flex items-center transition-colors duration-300">
                <i class="ri-logout-box-r-line mr-2"></i> Logout
            </button>
        </div>
        <button on:click={toggleSidebar} class="md:hidden focus:outline-none">
            <i class="ri-menu-fill text-xl"></i>
        </button>
    </div>
</nav>

{#if isSidebarOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={toggleSidebar}></div>
    <div transition:fly={{ x: 300, duration: 300 }} class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 overflow-y-auto">
        <div class="p-4">
            <button on:click={toggleSidebar} class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <i class="ri-close-line text-xl"></i>
            </button>
            <div class="mt-8 space-y-4">
                <a href="/dashboard" class="flex items-center transition-colors duration-300">
                    <i class="ri-dashboard-fill mr-2"></i> Dashboard
                </a>
                <div>
                    <button on:click={toggleDropdown} class="flex items-center w-full justify-between transition-colors duration-300">
                        <span><i class="ri-product-hunt-fill mr-2"></i> Product Management</span>
                        <i class="ri-arrow-down-s-line"></i>
                    </button>
                    {#if isDropdownOpen}
                        <div transition:fly={{ y: -10, duration: 200 }} class="pl-4 mt-2 space-y-2">
                            <a href="/products/add" class="block transition-colors duration-300">
                                <i class="ri-add-line mr-2"></i> Add Product
                            </a>
                            <a href="/products/edit" class="block transition-colors duration-300">
                                <i class="ri-edit-line mr-2"></i> Edit Product
                            </a>
                            <a href="/products/delete" class="block transition-colors duration-300">
                                <i class="ri-delete-bin-line mr-2"></i> Delete Product
                            </a>
                        </div>
                    {/if}
                </div>
                <a href="/orders" class="flex items-center">
                    <i class="ri-shopping-cart-fill mr-2"></i> Orders
                </a>
                <button on:click={logout} class="flex items-center">
                    <i class="ri-logout-box-r-line mr-2"></i> Logout
                </button>
            </div>
        </div>
    </div>
{/if}
