document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  //start page
  var warp = document.getElementById("disclaimer")

  var total = 30;
  var w = window.innerWidth
  var h = window.innerHeight;

  var imageUrls = [
    'img/chips/10.svg',
    'img/chips/25.svg',
    'img/chips/50.svg',
    'img/chips/100.svg',
    'img/chips/500.svg',
    'img/chips/1000.svg',
    // Ajoutez autant d'URLs que nécessaire
  ];

  for (i = 0; i < total; i++) {
    var token = document.createElement('div');
    var randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]
    gsap.set(token, { attr: { class: 'token' }, background:`url(${randomImageUrl})`, x: R(0, w), y: R(-200, -150)});
    warp.appendChild(token);
    animm(token);
  }

  function animm(elm){   
    gsap.to(elm,R(3,8),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:0});
    gsap.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
    gsap.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
  };
 
 function R(min,max) {return min+Math.random()*(max-min)};

 //blink

 var blinkText = document.getElementsByClassName("danger");

function blink() {
	gsap.to(blinkText, 0.3, {
		autoAlpha: 0,
		delay: 0.3,
		onComplete: function() {
			gsap.to(blinkText, 0.3, {
				autoAlpha: 1,
				delay: 0.3,
				onComplete: blink
			});
		}
	});
}
blink();

var tl = tl = gsap.timeline()

//appear disclaimer
tl.from("#disclaimer>*:not(.token)",{
  x:-100,
  autoAlpha: 0,
  ease: Power1.easeInOut,
  stagger: 0.5
})



//counter
console.clear();
var counter = 0;
var n0 = document.querySelector("#node0");
var n1 = document.querySelector("#node1");

function count() {
  if (counter < 10) {
    counter++;
    n1.textContent = counter;
    gsap.to("#node0, #node1", 0.9, {
      y: "-=400",
      delay: 0.25,
      ease: Power3.easeInOut,
      onComplete: swapNodes
    });
  }
}

function swapNodes() {
  n0.textContent = counter;
  gsap.set("#node0, #node1", { y: "+=400", onComplete: countDown });
}

count();

});