// Initialize ScrollMagic Controller
var controller = new ScrollMagic.Controller();

// Create a Scene
var scene = new ScrollMagic.Scene({
    triggerElement: "#trigger", // Element that triggers the scene
    duration: 300 // Duration of the scene
})
.setTween("#animate", {opacity: 0}) // Tween animation
.addIndicators() // Add indicators (optional)
.addTo(controller); // Add the scene to the controller

// Add additional scenes as needed
