import express from 'express';

const routes = express.Router();

routes.get('/users', (request, response) => {
  return response.json({ message: "placeholder" });
});

export default routes;
