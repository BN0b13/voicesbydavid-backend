import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const uploadThemes = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'themes')});
const uploadWelcome = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'welcome')});

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import RoleController from '../controllers/RoleController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const configurationController = new ConfigurationController();
const messageController = new MessageController();
const roleController = new RoleController();
const themeController = new ThemeController();
const visitController = new VisitController();
const userController = new UserController();
const welcomeController = new WelcomeController();

// Configuration

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));

// Contact

router.get('/contact', AdminTokenVerifier, HandleErrors(messageController.getMessages));
router.get('/contact/:id', AdminTokenVerifier, HandleErrors(messageController.getMessageById));

router.patch('/contact', AdminTokenVerifier, HandleErrors(messageController.updateMessage));

// Login

router.post('/login', HandleErrors(userController.adminLogin));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Themes

router.post('/themes', AdminTokenVerifier, uploadThemes.array("files"), HandleErrors(themeController.create));

router.get('/themes', AdminTokenVerifier, HandleErrors(themeController.getThemes));

router.patch('/themes/colors', AdminTokenVerifier, HandleErrors(themeController.updateThemeColorScheme));

// Users

router.post('/admin', AdminTokenVerifier, HandleErrors(userController.createAdmin));
router.get('/admin', AdminTokenVerifier, HandleErrors(userController.getAdmin));

router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));
router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getUserById));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));

// Welcome

router.post('/welcome/images', AdminTokenVerifier, uploadWelcome.array('files'), HandleErrors(welcomeController.postWelcomeImage));

router.patch('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.updateWelcomeImageById));

router.delete('/welcome/images/:id', AdminTokenVerifier, HandleErrors(welcomeController.deleteWelcomeImageById));
router.delete('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.deleteImagesAndFilesById));

export default router;