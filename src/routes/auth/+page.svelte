<script lang="ts">
	import { SvelteToast, toast } from '@zerodevx/svelte-toast'

    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

	let email = '';
	let validEmail = true;

	function validateEmail() {
		// Basic email validation pattern (change it based on your requirements)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		validEmail = emailRegex.test(email);
	}

	async function handleSubmit() {
		validateEmail();
		if (validEmail) {
			// Send the link to the user's email
			const response = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                }})
                if (response.error != null) {
                    toast.push('Error signing in: ' + response.error.message, {
                        theme: {
                            '--toastBackground': '#e53e3e'
                        }
                    });
                } else {
                    toast.push('Check your email for the sign-in link!', {
                        theme: {
                            '--toastBackground': '#38a169'
                        }
                    });
                }

		}
	}

	async function handleGoogleSignIn() {
		const response = await supabase.auth.signInWithOAuth(
            {
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            }
        )
	}

	async function handleGithubSignIn() {
		const response = await supabase.auth.signInWithOAuth({
            provider: 'github',
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			}
        })
	}
</script>

<svelte:head>
	<title>Sign In to Link</title>
	<meta name="description" content="Sign in to Link" />
</svelte:head>

<div
	class="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg"
>
	<!-- Header -->
	<div class="flex flex-col items-center justify-center w-full mb-6">
		<img src="/logo.svg" class="w-24" alt="Link Logo" />
	</div>
	<!-- Sign in with Email (Passwordless) -->
	<form
		class="flex flex-col items-center justify-center w-full mb-6"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="flex flex-col items-start justify-start w-full mb-4">
			<label for="email-input" class="mb-2 text-sm font-medium text-white">Email</label>
			<input
				id="email-input"
				bind:value={email}
				class="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
			/>
			{#if !validEmail}
				<p class="text-red-500 mt-1 mb-0 text-sm font-medium text-green">Invalid email address</p>
			{/if}
		</div>
		<button
			class="w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
		>
			Sign In
		</button>
	</form>
	<!-- Seperator (or) -->
	<div class="flex items-center justify-center w-full mb-1.5">
		<div class="flex-grow h-px bg-gray-600" />
		<div class="px-4 text-sm font-medium text-white">or</div>
		<div class="flex-grow h-px bg-gray-600" />
	</div>
	<form class="flex flex-col items-center justify-center w-full">
		<!-- Sign in with Google -->
		<button
			class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
			on:click={handleGoogleSignIn}
		>
			<img alt="Google Logo" src="/google.svg" class="w-4 h-4 mr-2" />
			Sign in with Google
		</button>
		<!-- Sign in with GitHub (Inverted) -->
		<button
			class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
			on:click={handleGithubSignIn}
		>
			<img alt="GitHub Logo" src="/github.svg" class="w-4 h-4 mr-2 invert" />
			Sign in with GitHub
		</button>
		{#if session}
			<button
				on:click={() => supabase.auth.signOut()}
				class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
			>
				Sign Out (Currently signed in as {session.user.email})
			</button>
		{/if}
	</form>
	<!-- Made by ThinkAlex -->
	<div class="mt-8 text-xs font-medium text-white">Made by ThinkAlex &copy; 2023</div>
</div>
<SvelteToast/>