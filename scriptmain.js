$(function () { // wait for document ready
  
    var controller = new ScrollMagic.Controller();
  
    var horizontalSlide = new TimelineMax()
    // animate panels
    .to("#js-slideContainers", 1,   {x: "-20%"})	
    .to("#js-slideContainers", 1,   {x: "-40%"})
   
   
  
  
    // create scene to pin and link animation
    new ScrollMagic.Scene({
      triggerElement: "#js-wrappers",
      triggerHook: "onLeave",
      duration: "200%"
    })
      .setPin("#js-wrappers")
      .setTween(horizontalSlide)
      //.addIndicators() // add indicators (requires plugin)
      .addTo(controller);
    
    
    
  });

  "use strict";   
  gsap.registerPlugin(ScrollTrigger);
  jQuery(document).ready(function($){
    let tl = gsap.timeline({pause:true,});
    tl.to(".endsection figure img",{
      rotationY: 180,
    }).pause();
    
    ScrollTrigger.create({
       trigger: ".endsection",
       // pin:true,
   
      animation: tl,
      scrub:1.5,
      
    })
    
  });
