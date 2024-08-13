<script lang="ts">
    import { loginUser, isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import Button from "../../ui/Button.svelte";
    import { fade } from 'svelte/transition';

    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;

    const handleSubmit = async () => {
        isLoading = true;
        try {
            const user = await loginUser(email, password);
            if (user) {
                toast.success("Logged in successfully!");
                goto("/dashboard");
            }
        } catch (e) {
            error = (e as Error).message;
        } finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        if (await isUserLoggedIn()) {
            goto("/dashboard");
        }
    });
</script>

<Toaster />
<div class="min-h-screen flex items-center justify-center p-4">
    <form on:submit|preventDefault={handleSubmit} class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" transition:fade={{duration: 300}}>
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">Login</h1>
            <p class="text-gray-600">Welcome back to our stock management application</p>
        </div>
        <div class="space-y-6">
            <div>
                <label for="email" class="block mb-2 text-xs font-medium">Email</label>
                <input type="email" id="email" bind:value={email} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="hi@unoxdevs.fun" />
            </div>
            <div>
                <label for="password" class="block mb-2 text-xs font-medium">Password</label>
                <input type="password" id="password" bind:value={password} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Supersecretpassword123" />
            </div>
            {#if error}
                <div class="text-red-500 bg-red-100 p-2 rounded-lg px-3" transition:fade={{duration: 200}}>{error}</div>
            {/if}
            <div class="flex justify-center">
                {#if isLoading}
                    <Button variant="filled" disabled>Logging in...</Button>
                {:else}
                {#if email && password}
                    <Button type="submit" variant="filled">Login</Button>
                {:else}
                    <Button type="button" variant="filled" disabled>Login</Button>
                {/if}
                {/if}
            </div>
        </div>
        <div class="mt-6 text-center text-xs">
            Don't have an account? <a href="/register" class="underline">Register</a>
        </div>
    </form>
</div>