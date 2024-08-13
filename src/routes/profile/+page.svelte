<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Button from "../../ui/Button.svelte";
    import { fetchAllProducts } from "$lib/products";
    import db from "$lib/db";

    let productList = [];
    let username = db.authStore.model?.username;
    let email = db.authStore.model?.email;
    let userID = db.authStore.model?.id;
    let productLenght = 0;

    onMount(async () => {
        productList = await fetchAllProducts();
        productLenght = productList.length;
    });
</script>

<div class="flex items-center justify-center min-h-screen" transition:fade={{duration: 300}}>
    <div class="text-center">
        <p class="text-sm">User ID: {userID}</p>
        <h1 class="text-3xl font-bold mb-4 md:text-4xl">{username}'s Profile</h1>
        <div class="flex items-center justify-center mb-4">
            <p class="text-lg mr-2 md:text-xl">Email: <a href="mailto:{email}" class="underline">{email}</a></p>
            <p class="text-lg mr-2 md:text-xl">|</p>
            <p class="text-lg mr-2 md:text-xl">Total Products: {productLenght}</p>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <Button onClick={() => goto('/profile/delete')} variant="outline">Delete Profile</Button>
        <p class="mt-6 text-sm">Or <a href="/dashboard" class="underline">go back</a></p>
    </div>
</div>