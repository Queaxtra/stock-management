<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

    export let text: string;
    export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
    
    let showTooltip = false;
    const dispatch = createEventDispatcher();

    function handleMouseEnter() {
        showTooltip = true;
        dispatch('show');
    }

    function handleMouseLeave() {
        showTooltip = false;
        dispatch('hide');
    }

    $: positionClasses = {
        'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        'bottom': 'top-full left-1/2 -translate-x-1/2 -mt-2',
        'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
        'right': 'left-full top-1/2 -translate-y-1/2 ml-2'
    }[position];

    $: arrowClasses = {
        'top': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-800 border-x-transparent border-b-transparent',
        'bottom': 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-800 border-x-transparent border-t-transparent',
        'left': 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-800 border-y-transparent border-r-transparent',
        'right': 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-800 border-y-transparent border-l-transparent'
    }[position];

    $: flyParams = {
        'top': { y: -5 },
        'bottom': { y: 5 },
        'left': { x: -5 },
        'right': { x: 5 }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative inline-block" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    <slot />
    {#if showTooltip}
        <div class={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-black rounded-lg shadow-lg ${positionClasses}`} transition:fly={{ duration: 200, ...flyParams[position] }}>
        {text}
        <div class={`absolute w-0 h-0 border-4 ${arrowClasses}`}></div>
        </div>
    {/if}
</div>