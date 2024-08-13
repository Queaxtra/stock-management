<script lang="ts">
    import Navbar from "../../../components/dashboard/Navbar.svelte";
    import { deleteUser } from "$lib/user";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import Button from "../../../ui/Button.svelte";
    import { fade } from 'svelte/transition';

    let userID = "";
    let error = "";
    let isLoading = false;

    const handleDelete = async () => {
        isLoading = true;
        try {
            await deleteUser(userID);
            toast.success("User deleted successfully!");
            goto("/");
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
            <h1 class="text-4xl font-bold mb-2">Delete Account</h1>
            <p class="text-gray-600">Permanently delete your account</p>
        </div>
        <div class="space-y-6">
            <div>
                <label for="userId" class="block mb-2 text-xs font-medium">User ID</label>
                <input type="text" id="userId" bind:value={userID} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Enter Product ID" />
            </div>
            {#if error}
                <div class="text-red-500 bg-red-100 p-2 rounded-lg" transition:fade={{duration: 200}}>{error}</div>
            {/if}
            <div class="flex justify-center">
                {#if isLoading}
                    <Button variant="filled" disabled>Deleting...</Button>
                {:else}
                {#if userID}
                    <Button type="submit" variant="filled">Delete Account</Button>
                {:else}
                    <Button type="button" variant="filled" disabled>Delete Account</Button>
                {/if}
                {/if}
            </div>
        </div>
    </form>
</div>
