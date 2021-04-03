import knex from 'knex';

const knexfile = require('../../knexfile');

const connection = knex(knexfile.development);

export default connection;
