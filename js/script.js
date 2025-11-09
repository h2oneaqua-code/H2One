// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

// Order Form Validation
const orderForm = document.getElementById("orderForm")
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const fullName = document.getElementById("fullName").value.trim()
    const email = document.getElementById("email").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const company = document.getElementById("company").value.trim()
    const bottleSize = document.getElementById("bottleSize").value
    const bottleColor = document.getElementById("bottleColor").value
    const capType = document.getElementById("capType").value
    const material = document.getElementById("material").value
    const quantity = document.getElementById("quantity").value
    const timeline = document.getElementById("timeline").value

    // Validation
    if (!fullName) {
      alert("Please enter your full name")
      return
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    if (!isValidPhone(phone)) {
      alert("Please enter a valid phone number")
      return
    }

    if (!company) {
      alert("Please enter your company name")
      return
    }

    if (!bottleSize || !bottleColor || !capType || !material || !quantity || !timeline) {
      alert("Please complete all required fields")
      return
    }

    if (quantity < 100) {
      alert("Minimum order is 100 units")
      return
    }

    // Form is valid - show success message
    displaySuccessMessage()
    orderForm.reset()
  })
}

// Contact Form Validation
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("contactName").value.trim()
    const email = document.getElementById("contactEmail").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    if (!name) {
      alert("Please enter your name")
      return
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    if (!subject) {
      alert("Please enter a subject")
      return
    }

    if (!message) {
      alert("Please enter a message")
      return
    }

    // Form is valid - show success message
    displayContactSuccessMessage()
    contactForm.reset()
  })
}

// Email Validation Helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone Validation Helper
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-+$$$$]{10,}$/
  return phoneRegex.test(phone)
}

// Display Success Message
function displaySuccessMessage() {
  const successMessage = document.getElementById("successMessage")
  if (successMessage) {
    successMessage.style.display = "block"
    setTimeout(() => {
      successMessage.style.display = "none"
    }, 5000)
  }
}

// Display Contact Success Message
function displayContactSuccessMessage() {
  const successMessage = document.getElementById("contactSuccessMessage")
  if (successMessage) {
    successMessage.style.display = "block"
    setTimeout(() => {
      successMessage.style.display = "none"
    }, 5000)
  }
}

// Update active nav link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentLocation = location.pathname.split("/").pop() || "index.html"
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentLocation || (href === "index.html" && currentLocation === "")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  let deferredPrompt
  const installPrompt = document.getElementById("installPrompt")

  // Detect if app can be installed
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event for later use
    deferredPrompt = e

    // Only show on mobile devices
    if (window.innerWidth <= 768) {
      showInstallPrompt()
    }
  })

  function showInstallPrompt() {
    // Create and show install prompt
    if (!document.getElementById("pwaInstallBanner")) {
      const banner = document.createElement("div")
      banner.id = "pwaInstallBanner"
      banner.className = "pwa-install-banner"
      banner.innerHTML = `
        <div class="pwa-install-content">
          <div class="pwa-install-text">
            <h3>Install H2One</h3>
            <p>Add H2One to your home screen for quick access</p>
          </div>
          <div class="pwa-install-buttons">
            <button class="pwa-install-yes">Install</button>
            <button class="pwa-install-no">Not Now</button>
          </div>
        </div>
      `

      // Add styles
      const style = document.createElement("style")
      style.textContent = `
        .pwa-install-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #0052a3 0%, #1e7bc4 100%);
          color: white;
          padding: 20px;
          z-index: 9999;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .pwa-install-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        
        .pwa-install-text h3 {
          color: white;
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }
        
        .pwa-install-text p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 0.9rem;
        }
        
        .pwa-install-buttons {
          display: flex;
          gap: 10px;
        }
        
        .pwa-install-yes,
        .pwa-install-no {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        .pwa-install-yes {
          background-color: white;
          color: #0052a3;
        }
        
        .pwa-install-yes:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }
        
        .pwa-install-no {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .pwa-install-no:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 600px) {
          .pwa-install-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .pwa-install-buttons {
            width: 100%;
          }
          
          .pwa-install-yes,
          .pwa-install-no {
            flex: 1;
          }
        }
      `
      document.head.appendChild(style)
      document.body.appendChild(banner)

      // Handle install button
      document.querySelector(".pwa-install-yes").addEventListener("click", async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt()
          const { outcome } = await deferredPrompt.userChoice
          console.log("[v0] User response to PWA install:", outcome)
          deferredPrompt = null
          banner.remove()
        }
      })

      // Handle "Not Now" button
      document.querySelector(".pwa-install-no").addEventListener("click", () => {
        banner.remove()
        // Don't show again for 7 days
        localStorage.setItem("h2oneInstallDismissed", Date.now())
      })
    }
  }

  // Check if previously dismissed (only show every 7 days)
  const dismissed = localStorage.getItem("h2oneInstallDismissed")
  if (dismissed && Date.now() - Number.parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
    // Don't show
  }

  // Listen for successful app installation
  window.addEventListener("appinstalled", () => {
    console.log("[v0] PWA installed successfully")
    deferredPrompt = null
  })
})

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
    }
  })
})
