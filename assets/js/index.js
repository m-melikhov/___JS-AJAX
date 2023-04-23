/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import SwipeCarousel from './carousel-swipe.js';

const carousel = new SwipeCarousel({
  containerID: '#mySlider',
  slideID: '.item',
  interval: 1000,
  // isPlaying: false,
});

carousel.init();
