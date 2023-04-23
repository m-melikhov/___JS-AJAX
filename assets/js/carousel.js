/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
class Carousel {
  constructor(p) {
    const settings = { ...{ containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true }, ...p };

    this.container = document.querySelector(settings.containerID);
    this.slidesItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('id', 'indicators-container');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }

    this.container.appendChild(indicators);

    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control control-pause">${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</span>`;
    const PREV = `<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('id', 'controls-container');
    controls.setAttribute('class', 'controls');

    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.appendChild(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
  }

  _initProps() {
    this.SLIDES_LENGTH = this.slidesItems.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

    this.currentSlide = 0;
    this.timerID = null;
    this.startPosX = null;
    this.endPosX = null;
  }

  _gotoNth(n) {
    this.slidesItems[this.currentSlide].classList.remove('active');
    this.indicatorItems[this.currentSlide].classList.remove('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slidesItems[this.currentSlide].classList.add('active');
    this.indicatorItems[this.currentSlide].classList.add('active');
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _pauseHandler() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.isPlaying = false;
      this.pauseBtn.innerHTML = this.FA_PLAY;
    }
  }

  _playHandler() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this._tick();
    }
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(this._gotoNext.bind(this), this.interval);
  }

  _indicate(e) {
    const { target } = e;

    if (target.classList.contains('indicator')) {
      this._pauseHandler();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_ARROW_LEFT) this._gotoPrev();
    if (e.code === this.CODE_ARROW_RIGHT) this._gotoNext();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));

    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  pausePlay() {
    return this.isPlaying ? this._pauseHandler() : this._playHandler();
  }

  prev() {
    this._pauseHandler();
    this._gotoPrev();
  }

  next() {
    this._pauseHandler();
    this._gotoNext();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
}

export default Carousel;
