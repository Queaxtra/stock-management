<script>
    import { goto } from "$app/navigation";
    import Button from "../ui/Button.svelte";
</script>

<header class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">404</h1>
        <p class="text-lg mb-4">The page you are looking for does not exist.</p>
        <Button onClick={() => goto("/")} variant="outline">Go back</Button>
    </div>
</header>