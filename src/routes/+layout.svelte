<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
	// Vercel
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
  
    export let data
  
    let { supabase, session } = data
    $: ({ supabase, session } = data)
  
    onMount(() => {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, _session) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate('supabase:auth')
        }
      })
  
      return () => subscription.unsubscribe()
    });
  </script>

<div class="bg-gray-900 flex flex-col h-screen">
	<!-- Navbar -->
	<nav class="flex flex-row items-center justify-between w-screen px-4 py-4 mx-auto bg-gray-900">
		<div class="flex flex-row items-center space-x-4 justify-center">
			<a href="/" class="flex items-center space-x-">
				<img src="/logo.svg" class="w-12" alt="Link Logo"/>
			</a>
		</div>
		<div class="flex flex-row items-center justify-center space-x-4">
			<a href="/" class="text-base font-medium text-white hover:text-gray-400"> Home </a>
			<span class="text-gray-400 text-base">•</span>
			<div class="relative group">
				<div class="text-base font-medium text-white cursor-pointer">Legal</div>
				<div
					class="hidden absolute z-10 w-48 py-2 space-y-2 bg-white rounded-md shadow-md group-hover:block"
				>
					<a href="/legal/tos" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">
						Terms of Service
					</a>
					<a
						href="/legal/privacy"
						class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</div>
		<div class="flex flex-row items-center space-x-4" >
			{#if data.session != null}
				<a
					class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
					href="/dashboard"
				>
					Go to Dashboard
					<svg
						class="w-5 h-5 ml-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
			{:else}
				
				<a
					class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
					href="/auth"
				>
					Sign In
					<svg
						class="w-5 h-5 ml-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
			{/if}
		</div>
	</nav>
	<slot />
</div>