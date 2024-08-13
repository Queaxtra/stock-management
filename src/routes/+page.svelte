<script>
    import { isUserLoggedIn } from "$lib/user";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Header from "../components/Header.svelte";

    onMount(async () => {
        if (await isUserLoggedIn()) {
            goto("/dashboard");
        }
    });
</script>

<Header />