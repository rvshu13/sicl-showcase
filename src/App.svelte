<script>
	import ListItem from './lib/components/ListItem.svelte';
	import { onMount } from 'svelte';

	let expenses = [];

	onMount(async () => {
		const res = await fetch('/api/expenses');
		expenses = await res.json();
	});

	let date = new Date();
	let dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	//$: totalValue: expenses.reduce((acc, curr) => acc.value + curr.value, 0);
</script>

<div class="hero">
	<sicl-button type="button" class="primary" icon-left="sun" />
	<div class="header">
		<h1>✨SICL✨</h1>
		<h4>Simple & Intuitive Component Library.</h4>
	</div>
	<div class="more-below-container">
		<!-- TODO: add text-transform to h5 style definition -->
		<h5 style="text-transform: uppercase;">Showcase below</h5>
		<sicl-icon style="color: var(--text-subtitle-color);" size="48px" name="arrow-down" />
	</div>
</div>
<div class="showcase">
	<div class="container">
		<div class="header">
			<div class="header-text-wrapper">
				<h1>Hi there! 😇</h1>
				<h4>Today is {date.toLocaleDateString(undefined, dateOptions)}</h4>
			</div>
		</div>
		<div class="form">
			<span class="form-header">
				<h3>Any expenses today?</h3>
				<p class="body-1 regular">
					Put them in with the form below, I will try to save them in a list on the right.
				</p>
			</span>
			<span class="form-wrapper">
				<sicl-input
					style="width: 100%;"
					type="primary"
					label-text="Name (max. 40 characters)"
					placeholder="ex. Dinner"
				/>
				<sicl-input style="width: 35%;" type="primary" label-text="Value" placeholder="$ 4.11" />
				<sicl-radio-group name="payment-type" label-text="Payment type">
					<sicl-radio label-text="💳 Card" checked />
					<sicl-radio label-text="💵 Cash" />
				</sicl-radio-group>
				<sicl-checkbox-group name="additional" label-text="Additional info">
					<sicl-checkbox label-text="🍟 Fast food" />
					<sicl-checkbox label-text="🍻 Alcohol" />
					<sicl-checkbox label-text="👀 Do you regret this?" />
				</sicl-checkbox-group>
				<span class="form-buttons">
					<sicl-button type="button" class="tertiary" icon-left="trash">Clear</sicl-button>
					<sicl-button type="submit" class="primary" icon-right="arrow-right"
						>Add an expense</sicl-button
					>
				</span>
			</span>
		</div>
		<div class="list">
			{#each expenses as expense}
				<ListItem
					description={expense.description}
					value={expense.value}
					payment-type={expense.paymentType}
					additional={expense.additional}
				/>
			{/each}
		</div>
		<div class="total" />
	</div>
</div>