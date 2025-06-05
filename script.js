// Animate path and fade out Section1 on Scroll

// Listen for scroll events
window.addEventListener('scroll', () => {
  // Get the section to fade out
  const section1 = document.getElementById('section1');

  // fade out starts at 80% 
  const fadeOutStart = window.innerHeight * 0.8;

  // Get length scrolled 
  const scrollY = window.scrollY;

  // Get the dotted SVG path element
  const path = document.getElementById("dotted-path");

  // Get total length of the path (used to control animation)
  const totalLength = path.getTotalLength();

  // Maximum scrollable distance on the page
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Map scroll position to path reveal length
  const drawLength = totalLength * (scrollY / maxScroll);

  // Update stroke to animate the path drawing based on scroll
  path.style.strokeDashoffset = totalLength - drawLength;

  // Fade out section1
  if (scrollY > fadeOutStart) {
    // Start fading out (0 is fully visible, 1 is fully transparent)
    const fadeAmount = Math.min((scrollY - fadeOutStart) / 300, 1);
    section1.style.opacity = 1 - fadeAmount;
  } else {
    // make section fully visible if not beyond fadeOutStart
    section1.style.opacity = 1;
  }
});


//Load Top Invasive Species Cards

// Fetch species data from the json file
fetch('data/top_species.json')
  .then(res => res.json()) // Convert response to json
  .then(data => {
    const container = document.getElementById('species-container');

    // Duplicate the species list to create a loop
    const speciesList = [...data, ...data];

    // For each species, create a card element
    speciesList.forEach(species => {
      const card = document.createElement('div');
      card.className = 'species-card'; // Add class for styling

      // Set the content of the card with species data
      card.innerHTML = `
        <img src="${species.Image_Link}" alt="${species.Common_Name}">
        <div style="font-size: 0.6rem; margin-bottom: 6px; color: #aaa;">
          ${species.Image_Credit || 'Image: Wikimedia Commons'}
        </div>
        <strong style="font-size: 30px; color: #FF6500;">${species.Number}</strong><br>
        <h2>${species.Common_Name || 'Unknown'}</h2>
        <em>${species.Species}</em>
        <em>Phylum: ${species.Phylum}</em>
        <em>${species.Common_name_classification}</em><br>
        Invasive in <span style="font-size: 18px; color: #FF6500;">${species.Num_invasive}</span> countries
      `;

      // Add the card to the container
      container.appendChild(card);
    });

    // Get the wrapper that scrolls the cards
    const wrapper = document.querySelector('.species-cards-wrapper');
    const cards = document.querySelectorAll('.species-card');

    // Pause scrolling animation when user hovers on any card
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        wrapper.style.animationPlayState = 'paused';
      });
      card.addEventListener('mouseleave', () => {
        wrapper.style.animationPlayState = 'running';
      });
    });
  });