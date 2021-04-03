import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'ecoleta',
      user: 'postgres',
      password: 'ecoletaapi',
      port: 5432,
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  }
}