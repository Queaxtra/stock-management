<script>
    import Navbar from "../../components/dashboard/Navbar.svelte";
    import SummaryStats from "../../components/dashboard/SummaryStats.svelte";
    import QuickLinks from "../../components/dashboard/QuickLinks.svelte";
    import Items from "../../components/dashboard/Items.svelte";
    import Footer from "../../components/dashboard/Footer.svelte";
</script>

<Navbar />
<div class="px-6">
    <SummaryStats />
    <QuickLinks />
    <Items />
</div>
<Footer />