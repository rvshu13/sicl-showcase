<script>
	import ListItem from './lib/components/ListItem.svelte'
	import { onMount } from 'svelte'

	onMount(async () => {
		const res = await (await fetch('/api/expenses')).json()
		expenses = res.expenses
	})

	let expenses = []
	let promise = Promise.resolve()
	let date = new Date()
	let dateOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	async function postExpense(expense) {
		console.log('JSON.stringify(expense)', JSON.stringify(expense))
		const response = await fetch(`/api/expenses`, {
			method: 'post',
			body: JSON.stringify(expense),
		})

		return response
	}

	const handleSubmit = (e) => {
		let form = e.target
		let formData = new FormData(form)
		let expense = {
			dateAdded: date.toISOString().split("T")[0],
			description: formData.get('description'),
			value: Number(formData.get('value')),
			paymentType: formData.get('paymentType'),
			additional: formData.getAll('additional'),
		}

		const response = postExpense(expense)

		response.then((res) => {
			if (res.ok) {
				res.json()
					.then((data) => ({ data: data }))
					.then((res) => {
						expense.id = res.data.id
					})
				expenses.push(expense)
				expenses = expenses

				form.reset()
			} else {
				throw new Error(res.statusText)
			}
		})
	}

	async function deleteExpense(id) {
		const response = await fetch(`/api/expenses/${id}`, {
			method: 'delete',
		})

		if (response.ok) {
			expenses = expenses.filter((expense) => expense.id !== id)
		} else {
			throw new Error(response.statusText)
		}
	}

	function handleDelete(id) {
		promise = deleteExpense(id)
	}

	$: totalValue = expenses.reduce((prev, curr) => prev + curr.value, 0)
</script>

<div class="hero">
	<div class="temp-header-center-inside-flex-please-don't-mind-me-please" />
	<div class="header">
		<h1>✨ SICL ✨</h1>
		<h4>Simple & Intuitive Component Library.</h4>
	</div>
	<div class="more-below-container">
		<!-- TODO: add text-transform to h5 style definition -->
		<h5 style="text-transform: uppercase;">Showcase below</h5>
		<sicl-icon
			style="color: var(--text-subtitle-color);"
			size="48px"
			name="arrow-down"
		/>
	</div>
</div>
<div class="showcase">
	<div class="container">
		<div class="header">
			<div class="header-text-wrapper">
				<h1>Hi there! 😇</h1>
				<h4>
					Today is {date.toLocaleDateString(undefined, dateOptions)}
				</h4>
			</div>
		</div>
		<form action="/api/expenses" on:submit|preventDefault={handleSubmit}>
			<span class="form-header">
				<h3>Any expenses today?</h3>
				<p class="body-1 regular">
					Put them in with the form below, I will <i>try</i> to save them
					in a list on the right.
				</p>
			</span>
			<span class="form-wrapper">
				<sicl-input
					name="description"
					style="width: 100%;"
					label-text="Name (max. 40 characters)"
					placeholder="ex. Dinner"
					max-length="40"
					form-associated="true"
				/>
				<sicl-input
					name="value"
					style="width: 35%;"
					type="number"
					step="0.01"
					min="1"
					label-text="Value"
					placeholder="4.11"
					form-associated="true"
				/>
				<sicl-radio-group name="paymentType" label-text="Payment type">
					<sicl-radio
						value="card"
						label-text="💳 Card"
						form-associated="true"
						checked
					/>
					<sicl-radio
						value="cash"
						label-text="💵 Cash"
						form-associated="true"
					/>
				</sicl-radio-group>
				<sicl-checkbox-group
					name="additional"
					label-text="Additional info"
				>
					<sicl-checkbox
						value="fast-food"
						label-text="🍟 Fast food"
						form-associated="true"
					/>
					<sicl-checkbox
						value="alcohol"
						label-text="🍻 Alcohol"
						form-associated="true"
					/>
					<sicl-checkbox
						value="regret"
						label-text="👀 Do you regret this?"
						form-associated="true"
					/>
				</sicl-checkbox-group>
				<span class="form-buttons">
					<sicl-button
						type="reset"
						variant="tertiary"
						icon-left="trash">Clear</sicl-button
					>
					<sicl-button
						type="submit"
						variant="primary"
						icon-right="arrow-right">Add an expense</sicl-button
					>
				</span>
			</span>
		</form>
		<div class="list">
			<scrollable-component class="list-component">
				<div class="list-items-wrapper">
					{#each expenses as expense}
						<ListItem
							id={expense.id}
							dateAdded={expense.dateAdded}
							description={expense.description}
							value={expense.value}
							paymentType={expense.paymentType}
							additional={expense.additional}
							on:delete={() => handleDelete(expense.id)}
						/>
					{/each}
				</div>
			</scrollable-component>
		</div>
		<div class="total">
			<h3 class="total-value">Total: <h1>$ {totalValue}</h1></h3>
		</div>
	</div>
</div>
