<script>
    import { goto } from "$app/navigation";
    import Button from "../ui/Button.svelte";
</script>

<header class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Stock Management</h1>
        <p class="text-lg mb-4">One stock management application made with Svelte Kit and Pocketbase.</p>
        <div class="space-x-4">
            <Button onClick={() => goto("/login")} variant="outline">Login</Button>
            <Button onClick={() => goto("/register")} variant="outline">Register</Button>
        </div>
    </div>
</header>