# Image Carousel / Slider

A responsive, accessible image slider component built with vanilla HTML5, CSS3 transitions, and JavaScript.

---

## Deliverables Met
- **5 slides**: Integrated with high-resolution image cards and captions.
- **Next & Previous controls**: Smooth forward and backward slide controls.
- **Auto-rotation with hover pause**: Switches slides every 4 seconds and pauses automatically when hovering over the container.
- **Slide indicators**: Interactive pagination dots that highlight active slide and allow jump-to navigation.
- **Keyboard navigation**: Left and Right arrow key support.

---

## Technical Approach

### 1. State Management & DOM Indexing
- The component maintains single-source-of-truth state: `currentIndex` (initialized to `0`).
- Rather than manipulating individual element display styles, the sliding mechanism uses CSS `transform: translateX(-${currentIndex * 100}%)` on a unified track. This ensures GPU-accelerated, performant animations.

### 2. Modulo Arithmetic for Infinite Wrapping
To prevent index out-of-bounds and provide infinite looping:
- **Next Slide**: `(currentIndex + 1) % totalSlides`
- **Previous Slide**: `(currentIndex - 1 + totalSlides) % totalSlides`
  Adding `totalSlides` ensures non-negative numbers in JavaScript when wrapping backwards from slide `0` to slide `4`.

### 3. Timer & Hover Lifecycle
- Automatic rotation is initialized using `setInterval(nextSlide, 4000)`.
- **Hover handling**: `mouseenter` clears the interval using `clearInterval()`, and `mouseleave` re-triggers the interval.
- **Manual override**: When a user clicks Next, Prev, or an Indicator, the timer resets so slides do not unexpectedly switch immediately following user interaction.

---

## Outcome
- **Performance**: High frame-rate transitions via CSS `transform` and `will-change`.
- **User Experience**: Intuitive controls, indicators with responsive state, and pause-on-hover to avoid disrupting users when viewing content.
- **Accessibility**: Includes ARIA labels, semantic buttons, and keyboard controls.