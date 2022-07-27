<script>
	import { createEventDispatcher } from 'svelte'
  	const dispatch = createEventDispatcher()

    export let id = 0;
    export let dateAdded = "";
    export let description = "";
    export let value = 0;
    export let paymentType = "card";
    export let additional = []; // "fast-food" | "alcohol" | "regret"
	
    let valueFormatted = new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(value);
    let dateFormatted = new Date(dateAdded).toISOString().split("T")[0];

    function handleDelete() {
        dispatch("delete");
    }
</script>

<div class="list-item" role="listitem">
	<div class="content">
		<p class="body-2 regular">{dateFormatted}</p>
		<h5>{description}</h5>
		<div class="payment-info">
			<h4>{valueFormatted}</h4>
			<p class="body-1 regular">by {(paymentType === "card" ? "💳" : "💵") + " " + paymentType}</p>
		</div>
	</div>
	<div class="additional-info">
		{#if additional.some((element) => element === "fast-food")}<h5 id="fast-food">🍟</h5>{/if}
		{#if additional.some((element) => element === "alcohol")}<h5 id="alcohol">🍻</h5>{/if}
		{#if additional.some((element) => element === "regret")}<h5 id="regret">😢</h5>{/if}
	</div>
	<span class="delete-button">
		<button type="button" on:click|once={() => handleDelete()}>
			<sicl-icon name="x" size="36px" />
		</button>
	</span>
</div>

<style lang="scss">
	.list-item {
		display: grid;
		grid-template-columns: 1fr 66px 66px;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: 'content additional-info delete-button';
        border: 2px solid var(--primary-500);
		border-radius: 16px;
		background-color: var(--container-background-color);
		box-shadow: var(--aura-medium);
		padding: 16px 16px 16px 48px;
		transition: 120ms ease-in-out;

		.content {
			grid-area: content;
			display: flex;
			flex-direction: column;
			justify-content: center;
            row-gap: 4px;
			align-items: flex-start;

			.payment-info {
				display: flex;
				flex-direction: row;
				column-gap: 8px;
				justify-content: flex-end;
				align-items: center;
				h4 {
					width: 160px;
				}
			}
		}

		.additional-info {
			grid-area: additional-info;
			display: flex;
			flex-direction: column;
			justify-content: center;
            align-items: center;
		}

		.delete-button {
			grid-area: delete-button;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            button {
                cursor: pointer;
                background-color: transparent;
                border: none;
                color: var(--danger-light);
            }
		}
	}
</style>
