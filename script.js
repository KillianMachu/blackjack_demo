document.addEventListener("DOMContentLoaded", (event) => {
  gsap.config({ nullTargetWarn: false });
  gsap.registerPlugin(ScrollTrigger)
  //chips fall
  var warp = document.getElementById("machine")

  var total = 50;
  var w = window.innerWidth
  var h = window.innerHeight;

  var imageUrls = [
    'img/chips/10.svg',
    'img/chips/25.svg',
    'img/chips/50.svg',
    'img/chips/100.svg',
    'img/chips/500.svg',
    'img/chips/1000.svg'
  ];

  function chipsFall() {
    for (i = 0; i < total; i++) {
      var token = document.createElement('div');
      var randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]
      gsap.set(token, { attr: { class: 'token' }, background: `url(${randomImageUrl})`, x: R(0, w), y: R(-200, -150) });
      warp.appendChild(token);
      animm(token);
    }
  }

  function animm(elm) {
    gsap.to(elm, R(3, 8), { y: h + 100, ease: Linear.easeNone, delay: 0 });
    gsap.to(elm, R(4, 8), { x: '+=100', rotationZ: R(0, 180), yoyo: true, ease: Sine.easeInOut });
    gsap.to(elm, R(2, 8), { rotationX: R(0, 360), rotationY: R(0, 360), yoyo: true, ease: Sine.easeInOut, delay: -5 });
  };

  function R(min, max) { return min + Math.random() * (max - min) };

  //counter
  var counter = [0, 0, 0];
  // Initialisation des compteurs
  var node0 = [document.querySelector("#node00"), document.querySelector("#node10"), document.querySelector("#node20")];
  var node1 = [document.querySelector("#node01"), document.querySelector("#node11"), document.querySelector("#node21")];
  var pairs = ["#node00, #node01", "#node10, #node11", "#node20, #node21"]

  function count(counterIndex) {
    if (counter[counterIndex] < 7) {
      counter[counterIndex]++;
      node1[counterIndex].textContent = counter[counterIndex];
      gsap.to(pairs[counterIndex], 0.1, {
        y: "-=200",
        onComplete: function () {
          if (counterIndex === 2 && counter[counterIndex] == 7) {
            animateLights();
            chipsFall();
            setTimeout(() => {
              loadPage()
            }, 2000)
          } else {
            swapNodes(counterIndex)
          }
        }
      });
    }
    else (count(counterIndex + 1))
  }

  function swapNodes(counterIndex) {
    node0[counterIndex].textContent = counter[counterIndex];
    gsap.set(pairs[counterIndex], { y: "+=200", onComplete: function () { count(counterIndex) } });
  }

  count(0);

  let tlLights = gsap.timeline();

  function animateLights() {
    tlLights.to("#Lights1, #Lights2", { filter: "brightness(2)", repeat: -1, duration: .3 });
  }

  //blink

  var blinkText = document.getElementsByClassName("danger");

  function blink() {
    gsap.to(blinkText, 0.3, {
      autoAlpha: 0,
      delay: 0.3,
      onComplete: function () {
        gsap.to(blinkText, 0.3, {
          autoAlpha: 1,
          delay: 0.3,
          onComplete: blink
        });
      }
    });
  }
  blink();

  function removeElement(element) {
    if (typeof (element) === "string") {
      element = document.querySelector(element);
    }
    return function () {
      element.parentNode.removeChild(element);
    };
  }

  var tlDisclaimer = gsap.timeline({ paused: true });

  var tlContent = gsap.timeline({ paused: true });

  //disclaimer
  tlDisclaimer.from("#disclaimer>.popup", {
    x: -100,
    autoAlpha: 0,
    ease: Power1.easeInOut
  })
    .addPause()
    .to("#disclaimer>.popup", { y: "+=50", duration: .15 })
    .to("#disclaimer>.popup", { y: "-=1000" })
    .call(removeElement("#disclaimer"))
    .call(function () { tlContent.play() })

  function loadPage() {
    document.querySelector("#machine").parentNode.removeChild(document.querySelector("#machine"));
    tlDisclaimer.play();
  }

  let tlDisclaimerN = gsap.timeline({ paused: true, repeat: 1 });
  tlDisclaimerN
    .to("#disclaimer>.popup", 0.05, { x: -10, y: -5, ease: Power0.easeNone })
    .to("#disclaimer>.popup", 0.05, { x: 10, y: 5, ease: Power0.easeNone })
    .to("#disclaimer>.popup", 0.05, { x: 0, y: 0, ease: Power0.easeNone });

  //remove disclaimer
  function removeDisclaimer() {
    if (document.getElementById('disclaimerCheck').checked) {
      tlDisclaimer.resume()
      document.body.classList.remove('blockScroll');
    } else {
      tlDisclaimerN.restart();
      document.querySelector(".check").classList.add("checkN")
    }
  }

  window.removeDisclaimer = removeDisclaimer

  // burger menu

  function toggleMenu() {
    const header = document.querySelector('.head>header');
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
      header.classList.toggle('show-nav')
    })
  }
  toggleMenu()

  // end burger menu

  // load content


  tlContent.from(".head>header", {
    y: -100,
    autoAlpha: 0,
    ease: Power1.easeInOut, clearProps: 'all'
  })
    .from(".head>span", {
      y: -100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    }, 0)
    .from(".head>h1", {
      x: -100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    })
    .from(".head>h2", {
      x: -100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    })
    .from(".regles", {
      x: +100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    })
    .from(".regles>.chip50", 1.5, {
      right: 0,
      rotateZ: 180 * 2,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    })
    .from(".regles>.diamond", 1.5, {
      left: 0,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    }, "-=1.5")
    .from(".icon", {
      y: 100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    })

    // game anims

    let game0 = gsap.timeline({paused: true})
    game0.from(".game:nth-child(1)>.dealer>div>img",{
      y: -100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all',
      stagger: .5,
    }, .5)
    .from(".game:nth-child(1)>.player>div>img",{
      y: 100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all',
      stagger: .5,
    })

    let game1 = gsap.timeline({paused: true})
    game1.from(".game:nth-child(2)>.player>div>img:nth-child(3)",{
      y: 100,
      autoAlpha: 0,
      ease: Power1.easeInOut, clearProps: 'all'
    }, .5)

    function flipCard() {
      setTimeout(() => {
        document.querySelector('.card-click').classList.add(`flipped`)
      }, 500);
    }

    let game2 = gsap.timeline({paused: true})
    game2.from(".game:nth-child(3)>.dealer>div.card:nth-child(2)",{
      x:0
    })
    .call(flipCard)

    const games = [game0, game1, game2]

    function cardsAnim(){
      if(currentSlideIndex < games.length){
        games[currentSlideIndex].restart();
      }
    }

    // game section appear

  gsap.from("#gameSection",{
    scrollTrigger: {
      trigger: "#gameSection",
      start: "top 70%",
    },
    x: -100,
    autoAlpha: 0,
    ease: Power1.easeInOut, clearProps: 'all',
    onComplete: function (){
      game0.play()
    }
  })

  const prevBtn = document.querySelector(".up");
  const nextBtn = document.querySelector(".down");
  const sliderContainer = document.querySelector(".sliderContainer");
  const dotsContainer = document.getElementById('dots');

  let currentSlideIndex = 0;

  prevBtn.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      goToSlide(currentSlideIndex);
      cardsAnim()
      if(currentSlideIndex+1 == 2){
        document.querySelector('.card-click').classList.remove(`flipped`)
      }
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlideIndex < sliderContainer.children.length - 1) {
      currentSlideIndex++;
      goToSlide(currentSlideIndex);
      cardsAnim()
    }
  });

  for (let i = 0; i < sliderContainer.children.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);

    if (i === 0) {
      dot.classList.add('active');
    }
  }

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
    });
  });

  function goToSlide(index) {
    sliderContainer.style.transform = `translateY(-${index * 100}vh)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === sliderContainer.children.length - 1;
  }
});


  
  
