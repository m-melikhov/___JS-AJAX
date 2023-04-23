/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.slidesItems[0].parentElement;
  }

  _initListeners() {
    super._initListeners();

    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    this.startPosX = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.endPosx = e instanceof MouseEvent
      ? e.pageX
      : e.changedTouches[0].pageX;

    if (this.endPosx - this.startPosX > 100) this.prev();
    if (this.endPosx - this.startPos > -100) this.next();
  }
}

export default SwipeCarousel;
