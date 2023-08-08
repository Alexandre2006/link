<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900 px-4">
	<div
		class="flex flex-col items-center  justify-center w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg text-white"
	>

		<div class="flex justify-center items-center mb-4">
			<div class="mt-2 text-2xl">{$page.status}</div>
			<div class="text-5xl text-gray-600 font-light mx-2">|</div>
			<div class="mt-2 text-2xl">{$page.error?.message}</div>
		</div>
		{#if parseInt(($page.status / 100).toString()) === 4}
			<div class="text-center">It looks like your browser made an invalid request.</div>
		{/if}
		{#if parseInt(($page.status / 100).toString()) === 5}
			<div class="text-center">
				You've found a glitch in the matrix. Please try again later, or contact us if the problem
				persists.
			</div>
		{/if}

		<!-- Button -->
		<a
			class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-4"
			href="/"
		>
			<svg
				class="w-5 h-5 mx-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				transform="rotate(180)"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M14 5l7 7m0 0l-7 7m7-7H3"
				/>
			</svg>
			Back to Home
		</a>
	</div>
	<!-- Bottom section -->
	<div class="flex flex-row items-center justify-center mt-4 text-xs font-medium text-white">
		<a href="/legal/privacy">Privacy Policy</a>
		<div class="mx-2 text-gray-600">|</div>
		<a href="/legal/tos">Terms of Service</a>
	</div>
</div>
