
import { pool } from '@/data/db_pool';
import getEntryDataByID from '@/data/data_fetching/single/getEntryDataByID';

export default async function exportData(client=null) {
    let backupJSON = { backup: {
        entries: []
    }};
    const queryClient = client ?? await pool.connect();
    try {
        let queryString =
            `
            SELECT id FROM music_entries 
            `

        let queryValues = []
        const allEntryIds = (await queryClient.query(queryString, queryValues)).rows.map((entry)=>entry.id);

        for (const id of allEntryIds){
            backupJSON.backup.entries.push( await getEntryDataByID(id))
        }
        return backupJSON
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