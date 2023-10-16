import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const uploadAudio = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'categories')});
const uploadCategories = multer({ dest: path.join(__dirname, '..', 'public', 'audio', 'reels')});
const uploadSections = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'sections')});
const uploadTestimonials = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'testimonials')});
const uploadThemes = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'themes')});
const uploadVideos = multer({ dest: path.join(__dirname, '..', 'public', 'video', 'reels')});

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CategoryController from '../controllers/CategoryController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import ReelController from '../controllers/ReelController.js';
import RoleController from '../controllers/RoleController.js';
import SectionController from '../controllers/SectionController.js';
import TestimonialController from '../controllers/TestimonialController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';

const categoryController = new CategoryController();
const configurationController = new ConfigurationController();
const messageController = new MessageController();
const reelController = new ReelController();
const roleController = new RoleController();
const sectionController = new SectionController();
const testimonialController = new TestimonialController();
const themeController = new ThemeController();
const visitController = new VisitController();
const userController = new UserController();

// Categories

router.post('/categories', AdminTokenVerifier, uploadCategories.array('files'), HandleErrors(categoryController.create));

router.patch('/categories', AdminTokenVerifier, HandleErrors(categoryController.updateCategoryById));
router.patch('/categories/images/thumbnail', AdminTokenVerifier, uploadCategories.array('files'), HandleErrors(categoryController.addThumbnail));

router.delete('/categories', AdminTokenVerifier, HandleErrors(categoryController.deleteCategoryById));

// Configurations

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));
router.get('/configuration/public', AdminTokenVerifier, HandleErrors(configurationController.getPublicConfiguration));

router.patch('/configuration/public/social-media', AdminTokenVerifier, HandleErrors(configurationController.updatePublicSocialMedia));

// Contacts

router.get('/contact', AdminTokenVerifier, HandleErrors(messageController.getMessages));
router.get('/contact/:id', AdminTokenVerifier, HandleErrors(messageController.getMessageById));

router.patch('/contact', AdminTokenVerifier, HandleErrors(messageController.updateMessage));

// Reels

router.post('/reels/video', AdminTokenVerifier, uploadVideos.array("files"), HandleErrors(reelController.createVideo));
router.post('/reels/youtube', AdminTokenVerifier, HandleErrors(reelController.createYoutubeReel));

router.get('/reels/all/:id', AdminTokenVerifier, HandleErrors(reelController.getReelById));

router.patch('/reels/activate', AdminTokenVerifier, HandleErrors(reelController.activateReel));
router.patch('/reels/youtube', AdminTokenVerifier, HandleErrors(reelController.updateYoutubeReel));

router.delete('/reels', AdminTokenVerifier, HandleErrors(reelController.deleteReelById));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Sections

router.post('/sections/images', AdminTokenVerifier, uploadSections.array('files'), HandleErrors(sectionController.postSectionImage));

router.get('/sections', HandleErrors(sectionController.getSections));

router.patch('/sections', AdminTokenVerifier, HandleErrors(sectionController.updateSection));
router.patch('/sections/images', AdminTokenVerifier, HandleErrors(sectionController.updateSectionImageById));

router.delete('/sections/images', AdminTokenVerifier, HandleErrors(sectionController.deleteSectionImages));

// Testimonials

router.post('/testimonials', AdminTokenVerifier, uploadTestimonials.array("files"), HandleErrors(testimonialController.create));

router.get('/testimonials/:id', AdminTokenVerifier, HandleErrors(testimonialController.getTestimonialById));

router.patch('/testimonials', AdminTokenVerifier, uploadTestimonials.array("files"), HandleErrors(testimonialController.updateTestimonial));

router.delete('/testimonials', AdminTokenVerifier, HandleErrors(testimonialController.deleteTestimonialById));
router.delete('/testimonials/image', AdminTokenVerifier, HandleErrors(testimonialController.deleteTestimonialImage));

// Themes

router.post('/themes', AdminTokenVerifier, uploadThemes.array("files"), HandleErrors(themeController.create));

router.get('/themes', AdminTokenVerifier, HandleErrors(themeController.getThemes));

router.patch('/themes/colors', AdminTokenVerifier, HandleErrors(themeController.updateThemeColorScheme));

// Users

router.post('/admin', AdminTokenVerifier, HandleErrors(userController.createAdmin));
router.post('/login', HandleErrors(userController.adminLogin));

router.get('/admin', AdminTokenVerifier, HandleErrors(userController.getAdmin));
router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));
router.get('/user', AdminTokenVerifier, HandleErrors(userController.getUser));
router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getUserById));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));
router.patch('/user/update-password', AdminTokenVerifier, HandleErrors(userController.updateAccountPassword));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));

export default router;