<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
    import type { PageData } from './$types';
    
    export let data: PageData;

    // Increment count
    async function incrementCount()  {
        await supabase.rpc('increment_clicks', { code: data.link.code});
    }
</script>
<svelte:head>
<title>{data.link.name}</title>
<meta name="description" content="{data.link.owner} sent you {data.link.name}" />
</svelte:head>


<div class="flex flex-col items-center justify-center h-screen bg-gray-900 px-4">
	<div
	class="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg"
>
	<!-- Header -->
    <div class="flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center space-y-1">
            <div class="text-2xl font-medium text-white">{data.link.owner}</div>
            <div class="text-2xl font-extralight text-white">sent you</div>
            <div class="text-2xl font-medium text-white">{data.link.name}</div>
        </div>
        <!-- Button (Take me there!)-->
        <a
			class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-4"
			href="{data.link.link}"
            on:click={incrementCount}
		>
			Let's go
            <svg
				class="w-5 h-5 mx-1"
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
        <!-- Notice of logging -->
        <div class="text-sm text-center font-small text-gray-400 mt-4">
            This link has been opened {data.link.clicks} times
        </div>
    </div>
</div>
	<!-- Bottom section -->
	<div class="flex flex-row items-center justify-center mt-4 text-xs font-medium text-white">
		<a href="/legal/privacy">Privacy Policy</a>
		<div class="mx-2 text-gray-600">|</div>
		<a href="/login/tos">Terms of Service</a>
	</div>
</div>
