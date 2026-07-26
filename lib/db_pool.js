import { Pool } from 'pg';

export const pool = new Pool(
    {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        port: process.env.POSTGRES_PORT
    }
);

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database', err);
        return;
    }
    console.log('Connected to the database');
    // Release the client back to the pool
    release();
});
