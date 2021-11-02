let animationIsFinished = false
let timeoutId

const collageItems = [
  {class: '.collage-item-1', direction: 'down', delay: 0},
  {class: '.collage-item-2', direction: 'down', delay: 0.05},
  {class: '.collage-item-3', direction: 'right', delay: 0},
  {class: '.collage-item-4', direction: 'down', delay: 0},
  {class: '.collage-item-5', direction: 'right', delay: 0},
  {class: '.collage-item-6', direction: 'right', delay: 0},
  {class: '.collage-item-7', direction: 'up', delay: 0},
  {class: '.collage-item-8', direction: 'right', delay: 0.1},
  {class: '.collage-item-9', direction: 'left', delay: 0.1},
  {class: '.collage-item-10', direction: 'down', delay: 0},
  {class: '.collage-item-11', direction: 'right', delay: 0.2},
  {class: '.collage-item-12', direction: 'down', delay: 0.2},
  {class: '.collage-item-13', direction: 'up-down', delay: 0.2},
  {class: '.collage-item-14', direction: 'up', delay: 0.2}
]

new fullpage('#fullpage', {
  anchors: [
    'first', 'second', 'third', 'fourth'
  ],

  afterLoad: function(origin, destination, direction) {
    // Первоначальная анимация первого слайда
    if(origin.index == 0) {
      fadeIn('.home-hero-collage__content .title', 10, 0.6, 0.3)
      fadeIn('.home-hero-collage__content .subtitle', 10, 0.4, 0.5)
      fadeDarkOverlay()
      collageItems.forEach((item) => {
        animateImg(item.class, item.direction, item.delay)
      })
    }

    // Анимация первого слайда при переходе со второго
    if (origin.index == 1 && direction == 'up') {
      fadeIn('.home-hero-collage__content .title', 10, 0.6, 0.3)
      fadeIn('.home-hero-collage__content .subtitle', 10, 0.4, 0.5)
      fadeDarkOverlay()
      collageItems.forEach((item) => {
        animateImg(item.class, item.direction, item.delay)
      })
    }

	  // Анимация второго слайда при переходе с третьего
    if(origin.index == 2 && direction == 'up') {
      if (animationIsFinished === false) { 
        let width = document.querySelector('.transition-slide').offsetWidth

        
        document.querySelector('.section--second').classList.remove('section--second__hide-bg')

        setTimeout(() => { 
          document.querySelector('.section--second .nav-overlay').classList.remove('nav-overlay--hidden')
        }, 400); 
        
        gsap.to('.transition-slide', {
          x: width,
          ease: Power2.easeInOut,
          duration: 0.6
        })
      }

      clearTimeout(timeoutId); 
      timeoutId = setTimeout(function() { 
        animationIsFinished = true;
        fullpage_api.moveTo('second'); 
          setTimeout(() => { 
            animationIsFinished = false; 
        }, 200); 
      }, 800); 
      
      return animationIsFinished; 
    }
	},

  onLeave: function(origin, destination, direction){

    // Скрытие первого слайда при переходе на второй
		if(origin.index == 0 && direction =='down'){
      if (animationIsFinished === false) { 
        fadeOut('.home-hero-collage__content .title')
        fadeOut('.home-hero-collage__content .subtitle')
        showSidebar()
        collageItems.forEach((item) => {
          animateImgReverse(item.class, item.direction, item.delay)
        })
      }
      
      clearTimeout(timeoutId); 
      timeoutId = setTimeout(function(){ 
        animationIsFinished = true;
        fullpage_api.moveTo('second'); 
        setTimeout(() => { 
          
          animationIsFinished = false; 
          let items = document.getElementsByClassName("collage-item")
          Array.prototype.forEach.call(items, (item) => {
            item.removeAttribute('style')
            item.children[0].removeAttribute('style')
            showDarkOverlay()
          });
        }, 800); 
      }, 800); 

      return animationIsFinished; 
		}

    // Скрытие второго слайда при переходе на первый
		if(origin.index == 1 && direction == 'up'){
      if (animationIsFinished === false) { 
        hideSidebar()
      } 
		}

    // Скрытие второго слайда при переходе на третий
    if(origin.index == 1 && direction == 'down'){
      if (animationIsFinished === false) { 
        let width = document.querySelector('.transition-slide').offsetWidth
        document.querySelector('.section--second .nav-overlay').classList.add('nav-overlay--hidden')
        document.querySelector('.section--second').classList.add('section--second__hide-bg')
        gsap.to('.transition-slide', {
          x: -width,
          ease: Power2.In,
          duration: 0.8
        })
      } 
          
      clearTimeout(timeoutId); 
      timeoutId = setTimeout(function(){ 
        animationIsFinished = true;
        fullpage_api.moveTo('third'); 
        setTimeout(() => { 
          animationIsFinished = false; 
        }, 200); 
      }, 800); 

      return animationIsFinished; 
		}
	}
});


// Анимация появления и скрытия сбоковой панели
function showSidebar() {
  gsap.to('.sidebar', {
    x: 100,
    duration: 0.8,
    ease: Power2.easeInOut
  })
}

function hideSidebar() {
    gsap.to('.sidebar', {
    x: -100,
    ease: Power2.easeInOut,
    duration: 0.4
  })
}

function animateImg(objectClass, directionFrom, delay) {
    let objWidth = document.querySelector(objectClass).offsetWidth
    let objHeight = document.querySelector(objectClass).offsetHeight
    let objChild = objectClass +' .' + document.querySelector(objectClass + ' .collage-item-inner').className

    switch (directionFrom) {
      case 'up':
        gsap.from(objectClass, {
          y: objHeight,
          ease: "power3.inOut",
          duration: 0.6,
          delay
        })
            
        gsap.from(objChild, {
          y: -objHeight,
          ease: "power3.inOut",
          duration: 0.6,
          delay
        })
        break;

      case 'down':
        gsap.from(objectClass, {
          height: 0,
          ease: "power3.inOut",
          duration: 0.6,
          delay
        })
        break;

        case 'left':
          gsap.from(objectClass, {
            x: objWidth,
            ease: "power3.inOut",
            duration: 0.6,
            delay
          })
            
          gsap.from(objChild, {
            x: -objWidth,
            ease: "power3.inOut",
            duration: 0.6,
            delay
          })
          break;

        case 'right':
          gsap.from(objectClass, {
            width: 0,
            ease: "power3.inOut",
            duration: 0.6,
            delay
          })
          break;
        
        case 'up-down':
          gsap.from(objectClass, {
            height: 0,
            width: objWidth / 2,
            ease: "power3.inOut",
            duration: 0.6,
            delay
          })
          break;
    
        default:
          break;
    }
}


function animateImgReverse(objectClass, directionFrom, delay) {
    let objWidth = document.querySelector(objectClass).offsetWidth
    let objHeight = document.querySelector(objectClass).offsetHeight
    let objChild = objectClass +' .' + document.querySelector(objectClass + ' .collage-item-inner').className

    switch (directionFrom) {
        case 'up':
            gsap.to(objectClass, {
                y: objHeight,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })
            
              gsap.to(objChild, {
                y: -objHeight,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })

              setTimeout(() => { 
                gsap.to(objectClass, {
                  y: 0,
                  ease: "power3.inOut",
                  duration: 0.3,
                  delay
                })
              
                gsap.to(objChild, {
                  y: 0,
                  ease: "power3.inOut",
                  duration: 0.3,
                  delay
                })
            }, 2000); 
              
            break;

        case 'down':
            gsap.to(objectClass, {
                height: 0,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })
            break;

        case 'left':
            

            gsap.to(objectClass, {
                x: -objWidth,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })
            
              gsap.to(objChild, {
                x: objWidth,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })

              setTimeout(() => { 
                gsap.to(objectClass, {
                  x: 0,
                  ease: "power3.inOut",
                  duration: 0.3,
                  delay
                })
              
                gsap.to(objChild, {
                  x: 0,
                  ease: "power3.inOut",
                  duration: 0.3,
                  delay
                })
            }, 2000); 
            break;

        case 'right':
            gsap.to(objectClass, {
                width: 0,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })
            break;
        
        case 'up-down':
            gsap.to(objectClass, {
                height: 0,
                width: objWidth / 2,
                ease: "power3.inOut",
                duration: 0.3,
                delay
              })
            break;
    
        default:
            break;
    }
}


function fadeDarkOverlay() {
  gsap.to('.home-hero-collage .overlay', {
    opacity: 0,
    ease: "power3.inOut",
    duration: 0.3,
    delay: 0.15
  })
}


function showDarkOverlay() {
  gsap.to('.home-hero-collage .overlay', {
    opacity: 1,
    ease: "power3.inOut",
    duration: 0.3,
    delay: 0.15
  })
}

function fadeIn(objClass, distance = 10, duration = 0.4, delay = 0) {
  gsap.from(objClass, {
    opacity: 0,
    y: distance,
    ease: "power3.in",
    duration,
    delay
  })
}

function fadeOut(objClass, distance = 10, duration = 0.4, delay = 0) {
  gsap.to(objClass, {
    opacity: 0,
    y: distance,
    ease: "power3.out",
    duration,
    delay
  })

  setTimeout(() => { 
    gsap.to(objClass, {
      opacity: 1,
      y: 0,
    })
}, 2000); 
}