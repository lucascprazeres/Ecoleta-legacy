import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Rota de usuários');

  //  JSON

  response.json([
    'Lucas',
    'Cleiton',
    'Robson',
    'Daniel'
  ]);
});

app.listen(3333, () => {
  console.log('Server avaliable on http://localhost:3333/')
});