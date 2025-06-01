// Animate timeline items on scroll (run once)
const timelineItems = document.querySelectorAll('.points-div');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => observer.observe(item));

// Scroll event handler
window.addEventListener('scroll', () => {
  const section1 = document.getElementById('section1');
  const fadeOutStart = window.innerHeight * 0.8;
  const scrollY = window.scrollY;

  const path = document.getElementById("dotted-path");
  const totalLength = path.getTotalLength();
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Map scroll to path length
  const drawLength = totalLength * (scrollTop / maxScroll);

  // Animate stroke dash offset to "reveal" the path
  path.style.strokeDashoffset = totalLength - drawLength;

  // Fade out section1 on scroll past fadeOutStart
  if (scrollY > fadeOutStart) {
    const fadeAmount = Math.min((scrollY - fadeOutStart) / 200, 1);
    section1.style.opacity = 1 - fadeAmount;
  } else {
    section1.style.opacity = 1;
  }
});
  
// species-scroll
fetch('data/top_species.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('species-container');

    // Add species cards twice for seamless scrolling loop
    const speciesList = [...data, ...data];

    speciesList.forEach(species => {
      const card = document.createElement('div');
      card.className = 'species-card';

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
      Invasive in <span style="font-size: 18px; color: #FF6500;">${species.Num_invasive} </span>countries
    `;

      container.appendChild(card);
    });
    
    const wrapper = document.querySelector('.species-cards-wrapper');
    const cards = document.querySelectorAll('.species-card');

    cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        wrapper.style.animationPlayState = 'paused';
    });
    card.addEventListener('mouseleave', () => {
        wrapper.style.animationPlayState = 'running';
    });
    });
  });
