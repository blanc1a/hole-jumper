const hole = document.querySelector(".hole");
const cat = document.querySelector(".cat");
const shadow = document.querySelector(".shadow");

const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 0.5 });

tl.from(hole, { scale: 0, repeat: 1, yoyo: true })
  //instead of adding a tween for closing the hole, we just put in a repeat and yoyo effect
  //BUT bc of the repeat, the tween doubled it's duration => the next animation ends before this one has finished and is 0.2sec long
  .fromTo(cat, { y: 300, scaleY: 2 }, { y: -110, scaleY: 1 }, 0.2)
  //150px to bottom and -160px to top => y = 0 at the top of the cat img
  //we want to start this animation at time of 0.2sec (absolute position parameter)
  //scaleY: 1 is the default, so it goes from scaleY: 2 to default 1 => should look like it stretched the cat out of the hole bc the img get's elonguated BUT this makes the img taller, so we have to put it down a little bit more
  .to(cat, { y: 0, ease: "power1.in" }, ">")
  //important to find the right ease! => here the power1.in makes that the cat falls more naturally
  //by using ">" we say that the tween should start directly at the end of the previous tween => important bc of the timeline of the first 2 tweens and otherwise the hole would close before the last tween would have ended
  .to(cat, {
    scaleY: 0.8,
    //sets vertical scale of the el to 0.8 => shrinks to 80% of its original height
    scaleX: 1.2,
    //sets the horizontal scale of the el to 1.2 => expands to 120% of its original width
    duration: 0.2,
    transformOrigin: "50% 100%",
    //sets the origin point for the transformation => transformation will originate from the bottom center of the element
    repeat: 1,
    yoyo: true,
  })
  .to(shadow, { opacity: 1, duration: 0.2 }, 0.7)
  //0.7 bc the shadow should be visible as soon as the hole closes and we have to consider that the hole has also an repeat animation
  .to(shadow, { scaleX: 0.7, ease: "power1.in" }, ">");
