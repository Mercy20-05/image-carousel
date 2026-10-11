// Carousel State
let currentIndex = 0;
const slideIntervalTime = 4000; // 4 seconds auto-rotation
let slideTimer = null;

// DOM Elements
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.querySelectorAll(".dot");
const carouselContainer = document.querySelector(".carousel-container");

const totalSlides = slides.length;

/**
 * Updates track position and indicator states based on currentIndex
 */
function updateCarousel() {
  // Translate the track horizontally based on current index
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active dot indicator
  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

/**
 * Moves to the next slide with index wrap-around using modulo
 */
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

/**
 * Moves to the previous slide with index wrap-around
 */
function prevSlide() {
  // Adding totalSlides prevents negative values before modulo
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

/**
 * Jumps directly to a targeted index
 */
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

/**
 * Starts automatic slide rotation
 */
function startAutoSlide() {
  if (!slideTimer) {
    slideTimer = setInterval(nextSlide, slideIntervalTime);
  }
}

/**
 * Clears and pauses the automatic rotation timer
 */
function pauseAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = null;
}

/**
 * Resets the rotation timer on manual user interaction
 */
function resetTimer() {
  pauseAutoSlide();
  startAutoSlide();
}

// Event Listeners: Navigation Controls
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetTimer();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetTimer();
});

// Event Listeners: Dot Indicators
indicators.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const targetIndex = Number(e.target.dataset.index);
    goToSlide(targetIndex);
    resetTimer();
  });
});

// Auto-rotation pause on hover
carouselContainer.addEventListener("mouseenter", pauseAutoSlide);
carouselContainer.addEventListener("mouseleave", startAutoSlide);

// Keyboard accessibility (Left/Right Arrow keys)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    resetTimer();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    resetTimer();
  }
});

// Initialize on page load
startAutoSlide();