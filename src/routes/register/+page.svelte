<script lang="ts">
    import { createUser, isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import Button from "../../ui/Button.svelte";
    import { fade } from 'svelte/transition';

    let name = "";
    let email = "";
    let emailVisibility = false;
    let password = "";
    let confirmPassword = "";
    let error = "";
    let isLoading = false;

    const handleSubmit = async () => {
        isLoading = true;
        if (password !== confirmPassword) {
            error = "Passwords do not match";
            isLoading = false;
            return;
        }

        if (password.length < 8) {
            error = "Password must be at least 8 characters long";
            isLoading = false;
            return;
        }
        
        try {
            const user = await createUser(name, email, emailVisibility, password, confirmPassword);
            if (user) {
                toast.success("User created successfully!");
                goto("/login");
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
            <h1 class="text-4xl font-bold mb-2">Register</h1>
            <p class="text-gray-600">Join our stock management application</p>
        </div>
        <div class="space-y-6">
            <div>
                <label for="username" class="block mb-2 text-xs font-medium">Company Name</label>
                <input type="text" id="username" bind:value={name} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="UnoxDevs" />
            </div>
            <div>
                <label for="email" class="block mb-2 text-xs font-medium">Email</label>
                <input type="email" id="email" bind:value={email} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="hi@unoxdevs.fun" />
            </div>
            <div>
                <label for="password" class="block mb-2 text-xs font-medium">Password</label>
                <input type="password" id="password" bind:value={password} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Supersecretpassword123" />
                <p class="text-xs text-gray-600 mt-1">Password must be at least 8 characters long</p>
            </div>
            <div>
                <label for="confirmPassword" class="block mb-2 text-xs font-medium">Confirm Password</label>
                <input type="password" id="confirmPassword" bind:value={confirmPassword} class="w-full p-2 border border-dark-green focus:outline-none rounded-lg placeholder:text-dark-green/30 placeholder:text-sm" placeholder="Supersecretpassword123" />
                <p class="text-xs text-gray-600 mt-1">Password must be at least 8 characters long</p>
            </div>
            <div class="flex items-center">
                <input type="checkbox" id="emailVisibility" bind:checked={emailVisibility} class="w-3 h-3" />
                <label for="emailVisibility" class="ml-2 text-xs">Make my email visible to other users</label>
            </div>
            {#if error}
                <div class="text-red-500 bg-red-100 p-2 rounded-lg" transition:fade={{duration: 200}}>{error}</div>
            {/if}
            <div class="flex justify-center">
                {#if isLoading}
                    <Button variant="filled" disabled>Registering...</Button>
                {:else}
                {#if name && email && password && confirmPassword}
                    <Button type="submit" variant="filled">Register</Button>
                {:else}
                    <Button type="button" variant="filled" disabled>Register</Button>
                {/if}
                {/if}
            </div>
        </div>
        <div class="mt-6 text-center text-xs">
            Already have an account? <a href="/login" class="underline">Log in</a>
        </div>
    </form>
</div>