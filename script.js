const toggleSun = document.getElementById('toggle-sun');
const toggleMoon = document.getElementById('toggle-moon');
const navLinks = document.querySelectorAll('nav a');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark'); // Set dark mode
  toggleSun.parentElement.classList.remove('hidden'); // Show sun icon
  toggleMoon.parentElement.classList.add('hidden'); // Hide moon icon
}

const toggleDarkMode = () => {
  body.classList.toggle('dark');

  // Update icons visibility based on current mode
  if (body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled'); // Save to localStorage
    toggleSun.parentElement.classList.remove('hidden'); // Show sun icon
    toggleMoon.parentElement.classList.add('hidden'); // Hide moon icon
  } else {
    localStorage.setItem('darkMode', 'disabled'); // Save to localStorage
    toggleSun.parentElement.classList.add('hidden'); // Hide sun icon
    toggleMoon.parentElement.classList.remove('hidden'); // Show moon icon
  }
};

const sections = document.querySelectorAll('section');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // Trigger when at least 50% of the section is visible
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);

    if (entry.isIntersecting) {
      // If the home section is in view
      if (entry.target.id === 'home') {
        // Remove active classes and icons from all links
        navLinks.forEach((item) => {
          item.classList.remove('active');
          const icon = item.querySelector('.active-icon');
          if (icon) {
            icon.remove(); // Remove the active icon
          }
        });
      } else {
        // For other sections, manage active classes and icons
        navLinks.forEach((item) => {
          item.classList.remove('active');
          const icon = item.querySelector('.active-icon');
          if (icon) {
            icon.remove(); // Remove the active icon
          }
        });

        // Add active class to the corresponding link
        link.classList.add('active');

        // Create and append the active icon to the corresponding link
        const activeIcon = document.createElement('i');
        activeIcon.classList.add(
          'fa-solid',
          'fa-circle-dot',
          'active-icon',
          'mx-2',
          'text-gray-500'
        );
        link.appendChild(activeIcon); // Append the icon to the link
      }
    }
  });
};

// Create an observer instance
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

// Add event listeners to both icons for dark mode
toggleSun.addEventListener('click', toggleDarkMode);
toggleMoon.addEventListener('click', toggleDarkMode);
