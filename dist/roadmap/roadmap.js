"use strict";
var roadmap = $("#roadmap");
var panel = $("#info-panel");
var isDragging = false;
var startX = 0;
var startY = 0;
var translateX = 0;
var translateY = 0;
var zoomSpeed = 0.1;
var scale = 1;
var zoomStep = 0.1;
var minScale = 0.5;
var maxScale = 2;
$('#zoom-in').on('click', function () {
    if (scale < maxScale) {
        scale += zoomStep;
        updateZoom();
    }
});
$('#zoom-out').on('click', function () {
    if (scale > minScale) {
        scale -= zoomStep;
        updateZoom();
    }
});
// Drag and move the roadmap
$(".roadmap-container").on("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    $(".roadmap-container").css("cursor", "grabbing");
});
$(document).on("mousemove", function (e) {
    if (isDragging) {
        var deltaX = e.clientX - startX;
        var deltaY = e.clientY - startY;
        translateX += deltaX;
        translateY += deltaY;
        startX = e.clientX;
        startY = e.clientY;
        updateTransform();
    }
});
$(document).on("mouseup", function () {
    isDragging = false;
    $(".roadmap-container").css("cursor", "grab");
});
// Zoom in and out with mouse wheel - NOT REALLY WORKING
// $(".roadmap-container").on("wheel", (e) => {
//   e.preventDefault();
//   const originalEvent = e.originalEvent as WheelEvent;
//   const mouseX = originalEvent.clientX - roadmap.offset().left; // X position relative to roadmap
//   const mouseY = originalEvent.clientY - roadmap.offset().top;  // Y position relative to roadmap
//   const delta = originalEvent.deltaY > 0 ? -zoomSpeed : zoomSpeed;
//   const newScale = Math.min(Math.max(scale + delta, 0.5), 2); // Clamp zoom between 0.5x and 2x
//   const scaleChange = newScale / scale; // How much the scale is changing
//   scale = newScale;
//   // Adjust translation to zoom towards the cursor position
//   translateX = mouseX - scaleChange * (mouseX - translateX);
//   translateY = mouseY - scaleChange * (mouseY - translateY);
//   updateTransform();
// });
function updateTransform() {
    roadmap.css("transform", "translate(".concat(translateX, "px, ").concat(translateY, "px) scale(").concat(scale, ")"));
}
// Display item details
$(".roadmap-item").on("click", function () {
    var title = $(this).data("title");
    var description = $(this).data("description");
    $("#info-title").text(title);
    $("#info-description").text(description);
});
// MOBILE VERSIOIN
// Touch Drag for Mobile
var isTouchDragging = false;
var touchStartX = 0;
var touchStartY = 0;
var touchOffsetX = 0;
var touchOffsetY = 0;
// Touch events for dragging
$("#roadmap-container").on('touchstart', function (e) {
    isTouchDragging = true;
    touchStartX = e.touches[0].clientX - touchOffsetX;
    touchStartY = e.touches[0].clientY - touchOffsetY;
});
$("#roadmap-container").on('touchmove', function (e) {
    if (isTouchDragging) {
        touchOffsetX = e.touches[0].clientX - touchStartX;
        touchOffsetY = e.touches[0].clientY - touchStartY;
        roadmap.css('transform', "translate(".concat(touchOffsetX, "px, ").concat(touchOffsetY, "px) scale(").concat(scale, ")"));
    }
});
$("#roadmap-container").on('touchend', function () {
    isTouchDragging = false;
});
// Pinch-to-Zoom for Mobile
var initialDistance = 0;
var initialScale = scale;
$("#roadmap-container").on('touchmove', function (e) {
    if (e.touches.length === 2) {
        // Get the distance between the two fingers
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        var distance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
        // If we have a valid starting distance, calculate the scaling
        if (initialDistance === 0) {
            initialDistance = distance;
        }
        else {
            var zoomFactor = distance / initialDistance;
            scale = initialScale * zoomFactor;
            // Constrain the scale value
            if (scale > maxScale)
                scale = maxScale;
            if (scale < minScale)
                scale = minScale;
            updateZoom();
        }
    }
});
$("#roadmap-container").on('touchend', function () {
    initialDistance = 0;
    initialScale = scale;
});
function updateZoom() {
    roadmap.css('transform', "scale(".concat(scale, ")"));
}
