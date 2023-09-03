import express from 'express';
import AppController from '../controllers/AppController.js';
import AuthController from '../controllers/AuthContoller.js';
import UsersController from '../controllers/UsersController.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// app router
router.get('/', authenticate, AppController.getHome);


// auth router
router.post('/auth/signup', AuthController.signup);

router.post('/auth/login', AuthController.logIn);


// users controller
router.get('/users', UsersController.getAllUsers);

export default router;
