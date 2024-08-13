import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_APP_POCKETURL as string;
const db = new PocketBase(url);

export default db;