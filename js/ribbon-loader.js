// Ribbon navigation HTML content
const ribbonHTML = `
<nav class="ribbon-nav">
  <div class="ribbon-doodles"></div>
  <div class="ribbon-inner">
    <ul class="ribbon-menu">
      <li><a href="index.html">Home</a></li>
      <li><a href="research.html">Research</a></li>
      <li><a href="publications.html">Publications</a></li>
      <li><a href="cv.pdf">CV</a></li>
      <li><a href="conference.html">Conferences/Workshops</a></li>
      <li><a href="teaching.html">Teaching</a></li>
      <li><a href="notesslides.html">Notes and slides</a></li>
      <li><a href="projects.html">Grants & Projects</a></li>
      <li><a href="mentoring.html">Mentoring</a></li>
      <li><a href="Collaborators.html">Collaborators</a></li>
    </ul>
  </div>
  <div class="ribbon-line">
    <div class="line line-1"></div>
    <div class="line line-2"></div>
  </div>
</nav>
`;

// Load ribbon navigation and apply active class based on current page
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded, starting ribbon loader...');
  // Get the current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  console.log('Current page path:', window.location.pathname);
  console.log('Current page filename:', currentPage);
  
  // Insert the ribbon at the top of the body
  document.body.insertAdjacentHTML('afterbegin', ribbonHTML);
  console.log('Inserted ribbon HTML into page');
      
      // Add active class to current page link
      const menuLinks = document.querySelectorAll('.ribbon-menu a');
      menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href.endsWith('/')) ||
            (currentPage === '' && href.endsWith('index.html'))) {
          link.classList.add('active');
        }
      });
      
      // Add mobile menu toggle functionality
      const menuToggle = document.createElement('button');
      menuToggle.className = 'ribbon-mobile-toggle';
      menuToggle.innerHTML = '☰';
      menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
      
      const ribbonNav = document.querySelector('.ribbon-nav');
      const ribbonInner = document.querySelector('.ribbon-inner');
      ribbonNav.insertBefore(menuToggle, ribbonInner);
      
      menuToggle.addEventListener('click', function() {
        ribbonNav.classList.toggle('menu-open');
      });
    });
