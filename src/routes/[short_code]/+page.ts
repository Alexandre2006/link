import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
        // Fetch data from supabase (matching short_code)
        const {data} = await supabase.from('links').select('*').eq('short_code', params.short_code).single();
        if (data == null) {
            throw error(404, 'Link not found');
        }

        // Otherwise, parse data into Link
        const link = {
            id: data.id,
            code: data.short_code,
            owner: data.owner,
            name: data.name,
            link: data.link,
            clicks: data.clicks
        };

        // Return Link
        return {
            link: link
        };
}) satisfies PageLoad;