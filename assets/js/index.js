// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to handle video frame scrolling
function scrollVideo() {
  const video = document.getElementById("video");
  const videoDuration = video.duration;
  // Create a ScrollTrigger instance for the video
  ScrollTrigger.create({
    trigger: ".section1",
    start: "top top",
    end: "bottom top", // Pin until the end of the section
    pin: true,
    // markers: true,
    pinSpacing: false,
    scrub: true,
    onUpdate: (self) => {
      const scrollProgress = self.progress; // Progress of the scroll
      const videoCurrentTime = videoDuration * scrollProgress;
      video.currentTime = videoCurrentTime;
    },
  });
}

// Initialize video once it's loaded
document
  .getElementById("video")
  .addEventListener("loadedmetadata", scrollVideo);

const panelsNumber = document.querySelectorAll(".panel").length;
console.log(panelsNumber);

console.log(innerWidth);

function getXPercent() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < 1300) {
    return -0.738 * (window.innerWidth / panelsNumber); // Example value for small screens
  } else if (viewportWidth <= 1600) {
    return -0.57 * (window.innerWidth / panelsNumber); // Example value for medium screens
  }
  else{
    return -0.5 * (window.innerWidth / panelsNumber);
  }
}

function createScrollTrigger() {
  console.log("createScrollTrigger called");
  const xPercent = getXPercent();
  console.log(`xPercent = ${xPercent}`);
  gsap.to(".section2", {
    xPercent: xPercent,
    ease: "none",
    scrollTrigger: {
      trigger: ".section2",
      start: "top top",
      end: () => "+=9000",
      pin: true,
      scrub: true,
      anticipatePin: 1,
    },
  });
}

createScrollTrigger();

window.addEventListener("resize", function () {
  console.log("resize happened");
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  createScrollTrigger();
  ScrollTrigger.refresh();
});
