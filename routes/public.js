import express from 'express';
const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import ReelController from '../controllers/ReelController.js';
import TestimonialController from '../controllers/TestimonialController.js';
import ThemeController from '../controllers/ThemeController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const configurationController = new ConfigurationController();
const messageController = new MessageController();
const reelController = new ReelController();
const testimonialController = new TestimonialController();
const themeController = new ThemeController();
const visitController = new VisitController();
const welcomeController = new WelcomeController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Configuration

router.get('/configuration', HandleErrors(configurationController.getPublicConfiguration));

// Contact

router.post('/contact', HandleErrors(messageController.create));

// Reels

router.get('/reels', HandleErrors(reelController.getReels));
router.get('/reels/video', HandleErrors(reelController.getVideoReels));
router.get('/reels/video/:id', HandleErrors(reelController.streamVideoById));

// Testimonials

router.get('/testimonials', HandleErrors(testimonialController.getTestimonials));

// Themes

router.get('/theme', HandleErrors(themeController.getTheme));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));


// Welcome

router.get('/welcome/images', HandleErrors(welcomeController.getWelcomeImages));
router.get('/welcome/content', HandleErrors(welcomeController.getWelcomeContent));

export default router;