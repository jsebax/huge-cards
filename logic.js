var container = document.querySelector('.container'),
  card = document.querySelector('#card'),
  front = document.querySelector('.front'),
  layers = [].slice.call(document.querySelectorAll('div[class*="layer-"]')),
  shine = document.querySelector('.shine'),
  huge = document.querySelector('#huge'),
  values = document.querySelector('#values-list ul'),
  message = document.querySelector('.message'),
  w = window.innerWidth,
  h = window.innerHeight,
  isFront = true;

window.addEventListener('mousemove', parallaxEffect);

var timelineLeft = new TimelineMax({paused: true, onComplete: function() {
  timelineValues.play(0);
}});
timelineLeft
  .to(card, 0.3, { rotationZ: -.5, x: '-60%', yoyo: true,  repeat: 1, ease: Power1.easeInOut}, 'flip')
  .to(card, 0.6, { rotationY: -180, ease: Power0.easeNone}, 'flip')
  ;


var timelineRight = new TimelineMax({paused: true, onComplete: function() {
  container.addEventListener('mousedown', flipCard);
  timelineValues.pause(0);
}});
timelineRight
  .to(card, 0.3, { rotationZ: -.5, x: '60%', yoyo: true,  repeat: 1, ease: Power1.easeInOut}, 'flip')
  .to(card, 0.6, {rotationY: -360, ease: Power0.easeNone}, 'flip')
  ;

var timelineValues = new TimelineMax({paused: true, delay: .5, onComplete: function() {
  container.addEventListener('mousedown', flipCard);
}});
timelineValues
  .from(huge, 1.5, {opacity: 0, ease: Power2.easeOut}, 'start')
  .staggerFrom(values.children, 1, {opacity: 0, x: '-=100', ease: Power2.easeOut}, .3, 'start+=.5')
  .from(message, 1, {opacity: 0, scale: 0, ease: Back.easeOut.config(1.7)}, '-=.5')
  ;

container.addEventListener('mousedown', flipCard);
function flipCard() {
  container.removeEventListener('mousedown', flipCard);
  if(isFront) {
    timelineLeft.play(0);
    isFront = false;
  } else {
    timelineRight.play(0);
    isFront = true;
  }
}

function parallaxEffect(e) {
  var offsetX = 0.5 - e.screenX / w,
    offsetY = 0.5 - e.screenY / h,
    offsetPoster = front.getAttribute('data-offset'),
    transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)',
    dy = e.screenY - h / 2,
    dx = e.screenX - w / 2,
    theta = Math.atan2(dy, dx),
    angle = theta * 180 / Math.PI - 90;

  if(angle < 0) {
    angle = angle + 360;
  }

  shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.screenY / h + ') 0%,rgba(255,255,255,0) 80%)';

  front.style.transform = transformPoster;

  layers.forEach(function(element) {
    var offsetLayer = element.getAttribute('data-offset') || 0,
      transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

      element.style.transform = transformLayer;
  });
}
