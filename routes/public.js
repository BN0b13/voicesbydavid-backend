import express from 'express';
const router = express.Router();

import { HandleErrors } from '../middleware/errorHandler.js';

import CategoryController from '../controllers/CategoryController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import ReelController from '../controllers/ReelController.js';
import SectionController from '../controllers/SectionController.js';
import TestimonialController from '../controllers/TestimonialController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';

const categoryController = new CategoryController();
const configurationController = new ConfigurationController();
const messageController = new MessageController();
const reelController = new ReelController();
const sectionController = new SectionController();
const testimonialController = new TestimonialController();
const themeController = new ThemeController();
const userController = new UserController();
const visitController = new VisitController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Categories

router.get('/categories', HandleErrors(categoryController.getCategories));

// Configurations

router.get('/configuration/social-media', HandleErrors(configurationController.getPublicConfigurationSocialMedia));

// Contacts

router.post('/contact', HandleErrors(messageController.create));

// Reels

router.get('/reels', HandleErrors(reelController.getReels));
router.get('/reels/audio/:filename', HandleErrors(reelController.getAudioReelByFilename));
router.get('/reels/video/:filename', HandleErrors(reelController.getVideoReelByFilename));

// Sections

router.get('/sections/welcome', HandleErrors(sectionController.getWelcomeSection));
router.get('/sections/about', HandleErrors(sectionController.getAboutSection));

// Testimonials

router.get('/testimonials', HandleErrors(testimonialController.getTestimonials));

// Themes

router.get('/theme', HandleErrors(themeController.getTheme));

// Users

router.get('/user/reset-password-token/verify/:token', HandleErrors(userController.verifyUserResetPasswordToken));

router.post('/user/reset-password', HandleErrors(userController.initiatePasswordReset));

router.post('/user/reset-password/token', HandleErrors(userController.completePasswordReset));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));

export default router;