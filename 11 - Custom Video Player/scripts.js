/* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Functions */
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    const newTime = video.currentTime + parseFloat(this.dataset.skip);
    video.currentTime = Math.max(Math.min(newTime, video.duration), 0);
}

function handleRangeUpdate(e) {
    video[e.target.name] = e.target.value;
}

function handleScrub(e) {
    video.currentTime = video.duration * e.offsetX / progress.clientWidth;
    updateProgressBarWidth();
}

function updateProgressBarWidth() {
    progressBar.style['flex-basis'] = `${Math.round(video.currentTime / video.duration * 100)}%`;
}

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgressBarWidth);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let scrubbing = false;
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', e => scrubbing && handleScrub(e));
progress.addEventListener('mousedown', () => scrubbing = true);
progress.addEventListener('mouseup', () => scrubbing = false);
