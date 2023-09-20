import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64e9db283526d4680d7e');

export const account = new Account(client);

export default client;