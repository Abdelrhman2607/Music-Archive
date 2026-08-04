
import { pool } from '@/data/db_pool';

import createEntry from './data_mutation/createEntry';
import createFilter from './data_mutation/createFilter';
import getCatIDByCatName from './data_fetching/single/getCatIDByCatName';

function normalizeCategoryPath(entry) {
    if (Array.isArray(entry.catPath) && entry.catPath.length > 0) {
        return entry.catPath;
    }

    if (Array.isArray(entry.cat) && entry.cat.length > 0) {
        return entry.cat;
    }

    if (typeof entry.cat === 'string' && entry.cat.trim().length > 0) {
        return [entry.cat];
    }

    return [];
}

async function ensureCategoryPathExists(catPath, queryClient) {
    let parentId = null;

    for (const categoryName of catPath) {
        if (!categoryName || !categoryName.toString().trim()) {
            continue;
        }

        let categoryId = await getCatIDByCatName(categoryName, queryClient);
        if (!categoryId) {
            const errorCode = await createFilter('cat', categoryName, parentId, queryClient);
            if (errorCode && errorCode !== '23505') {
                throw new Error(`Unable to create category ${categoryName}: ${errorCode}`);
            }
            categoryId = await getCatIDByCatName(categoryName, queryClient);
        }

        parentId = categoryId;
    }
}

async function ensureFiltersExist(entries, queryClient) {
    const tags = new Set();
    const artists = new Set();
    const categoryPaths = [];

    for (const entry of entries) {
        if (Array.isArray(entry.tags)) {
            entry.tags.forEach((tag) => {
                if (tag && tag.toString().trim()) {
                    tags.add(tag.toString());
                }
            });
        }

        if (Array.isArray(entry.artists)) {
            entry.artists.forEach((artist) => {
                if (artist && artist.toString().trim()) {
                    artists.add(artist.toString());
                }
            });
        }

        const catPath = normalizeCategoryPath(entry);
        if (catPath.length > 0) {
            categoryPaths.push(catPath);
        }
    }

    for (const tag of tags) {
        const errorCode = await createFilter('tag', tag, null, queryClient);
        if (errorCode && errorCode !== '23505') {
            throw new Error(`Unable to create tag ${tag}: ${errorCode}`);
        }
    }

    for (const artist of artists) {
        const errorCode = await createFilter('artist', artist, null, queryClient);
        if (errorCode && errorCode !== '23505') {
            throw new Error(`Unable to create artist ${artist}: ${errorCode}`);
        }
    }

    for (const catPath of categoryPaths) {
        await ensureCategoryPathExists(catPath, queryClient);
    }
}

export default async function importData(entries, client=null) {
    const queryClient = client ?? await pool.connect();
    try {
        await ensureFiltersExist(entries, queryClient);

        for (const entry of entries){
            await createEntry(entry, queryClient);
        }
        console.log('finished')
        return
    }

    catch (error) {
        console.error(error);
        return
    }
    finally {
        if (!client) {
            queryClient.release();
        }
    }
}