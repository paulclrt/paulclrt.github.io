const video = document.getElementById('custom-video');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const muteUnmuteButton = document.getElementById('mute-unmute');
const volumeControl = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen');



const PlayButton = `<svg fill="#ffffff" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 58.752 58.752" xml:space="preserve">
<g>
	<path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
		c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
		c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
		c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
		c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
		C49.663,29.47,49.611,29.561,49.524,29.612z"/>
</g>
</svg>`
const PauseButton = `<svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"/></svg>`
const SoundOn = `<svg width="800px" fill="#ffffff" height="800px" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const SoundOff = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="#ffffff" clip-rule="evenodd" d="M14 3.00001C14 1.07799 11.5532 0.262376 10.4 1.8L6.5 7H4C2.34315 7 1 8.34315 1 10V14C1 15.6569 2.34315 17 4 17H6.49356L10.3878 22.3049C11.5313 23.8627 14 23.0539 14 21.1214V3.00001ZM8.1 8.2L12 3V21.1214L8.10581 15.8165C7.72901 15.3032 7.13031 15 6.49356 15H4C3.44772 15 3 14.5523 3 14V10C3 9.44772 3.44772 9 4 9H6.5C7.12951 9 7.72229 8.70361 8.1 8.2Z" fill="#ffffff"/>
<path d="M21.2929 8.57094C21.6834 8.18041 22.3166 8.18042 22.7071 8.57094C23.0976 8.96146 23.0976 9.59463 22.7071 9.98515L20.7603 11.9319L22.7071 13.8787C23.0976 14.2692 23.0976 14.9024 22.7071 15.2929C22.3166 15.6834 21.6834 15.6834 21.2929 15.2929L19.3461 13.3461L17.3994 15.2929C17.0088 15.6834 16.3757 15.6834 15.9852 15.2929C15.5946 14.9023 15.5946 14.2692 15.9852 13.8787L17.9319 11.9319L15.9852 9.98517C15.5946 9.59464 15.5946 8.96148 15.9852 8.57096C16.3757 8.18043 17.0088 8.18043 17.3994 8.57096L19.3461 10.5177L21.2929 8.57094Z" fill="#ffffff"/>
</svg>`
const FullScreenButton = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 2C2.89543 2 2 2.89543 2 4V8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8V4H8C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2H4Z" fill="#ffffff"/>
<path d="M20 2C21.1046 2 22 2.89543 22 4V8C22 8.55228 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V4H16C15.4477 4 15 3.55228 15 3C15 2.44772 15.4477 2 16 2H20Z" fill="#ffffff"/>
<path d="M20 22C21.1046 22 22 21.1046 22 20V16C22 15.4477 21.5523 15 21 15C20.4477 15 20 15.4477 20 16V20H16C15.4477 20 15 20.4477 15 21C15 21.5523 15.4477 22 16 22H20Z" fill="#ffffff"/>
<path d="M2 20C2 21.1046 2.89543 22 4 22H8C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20H4V16C4 15.4477 3.55228 15 3 15C2.44772 15 2 15.4477 2 16V20Z" fill="#ffffff"/>
</svg>`



// Toggle play/pause
playPauseButton.addEventListener('click', () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseButton.innerHTML = PauseButton;
  } else {
    video.pause();
    playPauseButton.innerHTML = PlayButton;
  }
});

const progressBarContainer = document.getElementById('progress-bar-container');
const progressBarFilled = document.getElementById('progress-bar-filled');

// Update the filled portion of the progress bar and tooltip
video.addEventListener('timeupdate', () => {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBarFilled.style.width = `${progressPercentage}%`;
  currentTimeDisplay.textContent = formatTime(video.currentTime);
});

let isDragging = false; // Track if the user is dragging the progress bar

// Start dragging
progressBarContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  updateVideoTime(e); // Update the video time immediately
});

// Dragging
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateVideoTime(e); // Update video time while dragging
  }
});

// Stop dragging
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
  }
});

// Function to update video time based on mouse position
function updateVideoTime(e) {
  const progressRect = progressBarContainer.getBoundingClientRect();
  const offsetX = Math.min(Math.max(e.clientX - progressRect.left, 0), progressRect.width);
  const percentage = offsetX / progressRect.width;
  video.currentTime = video.duration * percentage;

  // Update the progress bar width and tooltip position
  progressBarFilled.style.width = `${percentage * 100}%`;
  progressTooltip.style.left = `${offsetX}px`;
  progressTooltip.textContent = formatTime(video.currentTime);
  progressTooltip.style.opacity = 1;
}

// Hide tooltip on mouseleave
progressBarContainer.addEventListener('mouseleave', () => {
  if (!isDragging) {
    progressTooltip.style.opacity = 0;
  }
});


progressBar.addEventListener('input', () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
});

// Display duration
video.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(video.duration);
});

// Mute/unmute
muteUnmuteButton.addEventListener('click', () => {
  video.muted = !video.muted;
  muteUnmuteButton.innerHTML = video.muted ? SoundOff : SoundOn;
});

// // Volume control
// volumeControl.addEventListener('input', () => {
//   video.volume = volumeControl.value;
// });

// Fullscreen
fullscreenButton.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

// Helper function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
