<script lang="ts">
    import { onMount } from "svelte";
    import { fetchAllProducts } from "$lib/products";

    let products: any[] = [];
    let totalStock = 0;
    let lowStockItems = 0;
    let outOfStockItems = 0;
    let totalStockValue = 0;

    function formatCurrency(value: number) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    function calculateStats() {
        totalStock = products.length;
        lowStockItems = products.filter(product => product.quantity > 0 && product.quantity <= 5).length;
        outOfStockItems = products.filter(product => product.quantity === 0).length;
        totalStockValue = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    }

    onMount(async () => {
        products = await fetchAllProducts();
        calculateStats();
    });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-6">
    <div class="bg-white p-4 rounded-lg border">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="ri-shopping-bag-3-line text-2xl mr-3"></i>
                <div>
                    <p class="text-base font-semibold">Total Stock</p>
                    <p class="text-xs text-custom-gray">Total number of items in stock</p>
                </div>
            </div>
            <div>
                <p class="text-2xl font-semibold">{totalStock}</p>
            </div>
        </div>
    </div>
    <div class="bg-white p-4 rounded-lg border">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="ri-error-warning-line text-2xl mr-3"></i>
                <div>
                    <p class="text-base font-semibold">Low Stock Items</p>
                    <p class="text-xs text-custom-gray">Items that are running low in stock</p>
                </div>
            </div>
            <div>
                <p class="text-2xl font-semibold">{lowStockItems}</p>
            </div>
        </div>
    </div>
    <div class="bg-white p-4 rounded-lg border">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="ri-box-1-line text-2xl mr-3"></i>
                <div>
                    <p class="text-base font-semibold">Out of Stock Items</p>
                    <p class="text-xs text-custom-gray">Items that are out of stock</p>
                </div>
            </div>
            <div>
                <p class="text-2xl font-semibold">{outOfStockItems}</p>
            </div>
        </div>
    </div>
    <div class="bg-white p-4 rounded-lg border">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="ri-price-tag-3-line text-2xl mr-3"></i>
                <div>
                    <p class="text-base font-semibold">Total Stock Value</p>
                    <p class="text-xs text-custom-gray">Total value of all items in stock</p>
                </div>
            </div>
            <div>
                <p class="text-2xl font-semibold">{formatCurrency(totalStockValue)}</p>
            </div>
        </div>
    </div>
</div>
