<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let onClick: (() => void) | undefined = undefined;
  export let variant: 'outline' | 'filled' = 'filled';
  export let disabled = false;
</script>

<button {type} on:click={onClick} disabled={disabled} class={`rounded-lg p-2 px-16 ${variant === 'outline' ? 'border-2 border-dark-green text-dark-green' : 'border-2 border-light-green bg-light-green'}`} style={disabled ? 'opacity: 0.5' : ''}>
    <slot></slot>
</button>

