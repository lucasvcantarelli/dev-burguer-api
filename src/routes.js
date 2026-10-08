import { Router } from 'express';
import multer from 'multer';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';


const routes = new Router();

const upload = multer(multerConfig);

// Métodos HTTP - GET, POST, PUT, DELETE
/* 
POST -> CRIAR
PUT/PATCH -> ALTERAR
GET -> LISTAR, BUSCAR
DELETE -> DELETAR

*/



// Tipos de parâmetros 
// Rota para criar usuários : http://localhost:3001/users
routes.post('/users', UserController.store);

// Contexto de rota: http://localhost:3001/session
routes.post('/session', SessionController.store);

// Todas as rotas que estiver embaixo deste contexto vai ter o middleware auth
routes.use(authMiddleware);

// rota para criar produtos : http://localhost:3001/products
routes.post('/products', upload.single('file'), ProductController.store);

// Rota para listar os produtos   // Middleware para autenticação
routes.get('/products', ProductController.index);




export default routes; 