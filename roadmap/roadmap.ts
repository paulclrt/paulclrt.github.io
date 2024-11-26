declare const $ : JQueryStatic;


const roadmap = $("#roadmap");
const panel = $("#info-panel");


let isDragging = false;
let startX = 0; 
let startY = 0; 
let translateX = 0; 
let translateY = 0; 

const zoomSpeed = 0.1;
let scale = 1;
const zoomStep = 0.1;
const minScale = 0.5;
const maxScale = 2;


$('#zoom-in').on('click', () => {
  if (scale < maxScale) {
    scale += zoomStep;
    updateZoom();
  }
});

$('#zoom-out').on('click', () => {
  if (scale > minScale) {
    scale -= zoomStep;
    updateZoom();
  }
});

// Drag and move the roadmap
$(".roadmap-container").on("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  $(".roadmap-container").css("cursor", "grabbing");
});

$(document).on("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    translateX += deltaX;
    translateY += deltaY;

    startX = e.clientX;
    startY = e.clientY;

    updateTransform();
  }
});

$(document).on("mouseup", () => {
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
  roadmap.css(
    "transform",
    `translate(${translateX}px, ${translateY}px) scale(${scale})`
  );
}


// Display item details
$(".roadmap-item").on("click", function () {
  const title = $(this).data("title");
  const description = $(this).data("description");
  $("#info-title").text(title);
  $("#info-description").text(description);
});






// MOBILE VERSIOIN

// Touch Drag for Mobile
let isTouchDragging = false;
let touchStartX = 0;
let touchStartY = 0;
let touchOffsetX = 0;
let touchOffsetY = 0;
// Touch events for dragging
$("#roadmap-container").on('touchstart', (e) => {
    isTouchDragging = true;
    touchStartX = e.touches[0].clientX - touchOffsetX;
    touchStartY = e.touches[0].clientY - touchOffsetY;
});
$("#roadmap-container").on('touchmove', (e) => {
    if (isTouchDragging) {
        touchOffsetX = e.touches[0].clientX - touchStartX;
        touchOffsetY = e.touches[0].clientY - touchStartY;
        roadmap.css('transform', `translate(${touchOffsetX}px, ${touchOffsetY}px) scale(${scale})`);
    }
});
$("#roadmap-container").on('touchend', () => {
    isTouchDragging = false;
});
// Pinch-to-Zoom for Mobile
let initialDistance = 0;
let initialScale = scale;
$("#roadmap-container").on('touchmove', (e) => {
    if (e.touches.length === 2) {
        // Get the distance between the two fingers
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        // If we have a valid starting distance, calculate the scaling
        if (initialDistance === 0) {
            initialDistance = distance;
        } else {
            const zoomFactor = distance / initialDistance;
            scale = initialScale * zoomFactor;
            // Constrain the scale value
            if (scale > maxScale) scale = maxScale;
            if (scale < minScale) scale = minScale;
            updateZoom();
        }
    }
});

$("#roadmap-container").on('touchend', () => {
    initialDistance = 0;
    initialScale = scale;
});


function updateZoom() {
  roadmap.css('transform', `scale(${scale})`);
}