// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  html.setAttribute("data-theme", "dark");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeToggle.innerHTML =
    newTheme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
});

// Animated Counter for Statistics
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  };

  updateCounter();
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Animate counters when they come into view
      const statValue = entry.target.querySelector(".stat-value");
      if (statValue && !statValue.classList.contains("animated")) {
        statValue.classList.add("animated");
        animateCounter(statValue);
      }
    }
  });
}, observerOptions);

// Observe stat cards
document.querySelectorAll(".stat-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
  }

  lastScroll = currentScroll;
});

// Add parallax effect to hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add interactive hover effects to info cards
document.querySelectorAll(".info-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-12px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.animation = "fadeInUp 0.8s ease-out 0.3s forwards";
  }

  // Add loading animation to workflow cards
  const workflowCards = document.querySelectorAll(".workflow-card");
  workflowCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 500 + index * 100);
  });
});

// Pattern icons for hero background (using Font Awesome icons)
document.addEventListener("DOMContentLoaded", () => {
  const patternLeaf = document.querySelector(".pattern-leaf");
  const patternNodes = document.querySelector(".pattern-nodes");
  const patternTruck = document.querySelector(".pattern-truck");

  if (patternLeaf) {
    patternLeaf.innerHTML = '<i class="fas fa-leaf"></i>';
  }
  if (patternNodes) {
    patternNodes.innerHTML = '<i class="fas fa-project-diagram"></i>';
  }
  if (patternTruck) {
    patternTruck.innerHTML = '<i class="fas fa-truck"></i>';
  }
});

// Add number formatting helper
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Enhanced illustration for impact section
document.addEventListener("DOMContentLoaded", () => {
  const illustration = document.querySelector(".community-illustration");
  if (illustration) {
    // Add animated elements
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";

    // Add some decorative circles
    for (let i = 0; i < 10; i++) {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const r = Math.random() * 30 + 10;
      circle.setAttribute("cx", x + "%");
      circle.setAttribute("cy", y + "%");
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "#34C759");
      circle.setAttribute("opacity", "0.1");
      circle.style.animation = `float ${
        15 + Math.random() * 10
      }s infinite ease-in-out`;
      circle.style.animationDelay = `${Math.random() * 5}s`;
      svg.appendChild(circle);
    }

    illustration.appendChild(svg);
  }
});
