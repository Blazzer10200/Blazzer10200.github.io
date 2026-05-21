<script lang="ts">
	type Props = {
		num: string;
		label: string;
		meta?: string;
	};

	let { num, label, meta = '' }: Props = $props();
</script>

<div class="rail">
	<span class="num">{num}</span>
	<span class="label">{label}</span>
	{#if meta}
		<span class="meta">{meta}</span>
	{/if}
</div>
