// ---------------------------------------------------- //
// ARTICLE DATA FOR INSIGHTS MODAL                      //
// ---------------------------------------------------- //
const articlesData = {
  "art-1": {
    title: "Scaling Beyond the Series B Chasm",
    category: "Strategy",
    date: "June 18, 2026",
    readTime: "5 min read",
    content: `
      <p>Scaling a technology venture past the Series B mark introduces structural challenges that many executive teams fail to anticipate. During the Seed and Series A phases, organizational success is driven largely by agile collaboration, heroics, and product-market search. However, as the headcount passes 100, these ad-hoc structures break down.</p>
      <p>Our analysis of over 50 scale-ups shows that the primary failure mode is not a lack of product demand, but rather "operational drag"—the compounding friction of poor communication hierarchy, loosely defined board duties, and fragmented database platforms.</p>
      <h2>Establishing the Scaling Blueprint</h2>
      <p>To cross the chasm, leadership must transition from generalist founders to specialist managers. This requires:</p>
      <ul>
        <li>Implementing centralized KPI dashboards that align engineering milestones directly with sales projections.</li>
        <li>Structuring formal advisory sub-committees (compensation, governance, and audit) early to avoid governance gridlocks later.</li>
        <li>Codifying operational runbooks to ensure repeatability in scaling departments.</li>
      </ul>
      <p>By preparing these frameworks prior to capital injection, companies can deploy fresh Series B funds directly into scale rather than waste them on internal fire-fighting.</p>
    `
  },
  "art-2": {
    title: "Ethical Auditing in AI Architectures",
    category: "Governance",
    date: "May 29, 2026",
    readTime: "8 min read",
    content: `
      <p>As corporate entities deploy machine learning algorithms to automate operational workflows—ranging from hiring screens to risk management matrices—board members face a new class of fiduciary risk: algorithmic bias and liability.</p>
      <p>Regulators worldwide are tightening compliance standards. A board that cannot explain how its enterprise decision engines arrived at a specific conclusion may find itself legally exposed. Algorithmic governance is no longer just a technical checkbox; it is a core legal concern.</p>
      <h2>The Algorithmic Governance Protocol</h2>
      <p>Boards must establish formal AI Audit Committees consisting of independent technology advisors and legal counsel. This committee's role includes:</p>
      <ul>
        <li>Validating training datasets for historical bias and imbalances.</li>
        <li>Enforcing "Explainable AI" (XAI) models where machine decisions directly impact human outcomes.</li>
        <li>Conducting regular algorithmic stress tests to simulate worst-case scenarios and malicious edge cases.</li>
      </ul>
      <p>Through proactive governance, corporate boards can foster innovation while insulating the organization from catastrophic regulatory backlash.</p>
    `
  },
  "art-3": {
    title: "Decentralized Capital & Board Duty",
    category: "Market Trends",
    date: "April 14, 2026",
    readTime: "6 min read",
    content: `
      <p>The integration of decentralized finance protocols and digital custody strategies into traditional corporate balance sheets is no longer theoretical. As treasury managers seek yield in a volatile macroeconomic climate, the board’s duty of care expands to cover decentralized networks.</p>
      <p>However, navigating these integrations requires balancing the potential upside against severe operational, security, and custody risks.</p>
      <h2>Fiduciary Checklist for Treasury Integration</h2>
      <p>Before board approval is granted for treasury deployment into digital networks, the following frameworks must be in place:</p>
      <ul>
        <li>Multi-signature custody setups that prevent single-point-of-failure key loss or rogue employee withdrawals.</li>
        <li>Real-time automated compliance filters (KYC/AML) built directly into decentralized nodes.</li>
        <li>Explicit limits on treasury allocation sizes to protect overall solvency from extreme network drawdowns.</li>
      </ul>
      <p>Only with clear protocols can the board safely steward digital assets while satisfying their traditional fiduciary obligations.</p>
    `
  }
};

// ---------------------------------------------------- //
// STATE MANAGEMENT                                     //
// ---------------------------------------------------- //
let selectedDate = null;
let selectedTime = null;
let currentMonth = 6; // July (0-indexed: 6 is July)
let currentYear = 2026;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ---------------------------------------------------- //
// DOM ELEMENTS                                         //
// ---------------------------------------------------- //
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const navbarSearch = document.getElementById("navbar-search");
  
  const articleModal = document.getElementById("article-modal");
  const modalClose = document.getElementById("modal-close");
  const modalContentBody = document.getElementById("modal-content-body");

  const filterBtns = document.querySelectorAll(".filter-btn");
  const insightCards = document.querySelectorAll(".insight-card");

  const timelineItems = document.querySelectorAll(".timeline-item");

  const prevMonthBtn = document.getElementById("cal-prev-month");
  const nextMonthBtn = document.getElementById("cal-next-month");
  const monthYearLabel = document.getElementById("calendar-current-month");
  const daysGrid = document.getElementById("calendar-days-grid");
  const slotsContainer = document.getElementById("slots-container");

  const dateInput = document.getElementById("booking-date-input");
  const timeInput = document.getElementById("booking-time-input");
  const bookingForm = document.getElementById("advisory-booking-form");
  const successToast = document.getElementById("success-toast");

  const prevEndorsement = document.getElementById("carousel-prev");
  const nextEndorsement = document.getElementById("carousel-next");
  const endorsementsTrack = document.getElementById("endorsements-track");

  // ---------------------------------------------------- //
  // MOBILE NAVIGATION MENU                               //
  // ---------------------------------------------------- //
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove("open");
    }
  });

  // ---------------------------------------------------- //
  // INTERACTIVE NAV SEARCH                               //
  // ---------------------------------------------------- //
  navbarSearch.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();

    // 1. Filter Timeline Milestones
    timelineItems.forEach(item => {
      const keywords = item.getAttribute("data-keywords").toLowerCase();
      const content = item.innerText.toLowerCase();
      
      if (term === "" || keywords.includes(term) || content.includes(term)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    // 2. Filter Insights Articles
    insightCards.forEach(card => {
      const content = card.innerText.toLowerCase();
      if (term === "" || content.includes(term)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // ---------------------------------------------------- //
  // INSIGHTS CATEGORY FILTERS                            //
  // ---------------------------------------------------- //
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      insightCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ---------------------------------------------------- //
  // INSIGHTS MODAL (READ ARTICLE)                        //
  // ---------------------------------------------------- //
  window.openArticle = (id) => {
    const article = articlesData[id];
    if (!article) return;

    modalContentBody.innerHTML = `
      <span class="insight-cat" style="display:inline-block; margin-bottom:12px;">${article.category}</span>
      <h1 class="section-title" style="font-size:2.2rem; margin-bottom:16px;">${article.title}</h1>
      <div class="modal-meta">
        <span>Published: ${article.date}</span>
        <span>&bull;</span>
        <span>${article.readTime}</span>
      </div>
      <div class="modal-text">
        ${article.content}
      </div>
    `;

    articleModal.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  modalClose.addEventListener("click", () => {
    articleModal.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable background scroll
  });

  // Close modal when clicking outside contents
  articleModal.addEventListener("click", (e) => {
    if (e.target === articleModal) {
      articleModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // ---------------------------------------------------- //
  // TESTIMONIALS SLIDER                                  //
  // ---------------------------------------------------- //
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll(".endorsements-slide").length;

  const updateSlidePosition = () => {
    endorsementsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  nextEndorsement.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  });

  prevEndorsement.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  });

  // Auto-advance endorsement slide every 8s
  let endorsementInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  }, 8000);

  // Clear auto-advance on manual interaction
  const resetEndorsementTimer = () => {
    clearInterval(endorsementInterval);
    endorsementInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlidePosition();
    }, 8000);
  };
  prevEndorsement.addEventListener("click", resetEndorsementTimer);
  nextEndorsement.addEventListener("click", resetEndorsementTimer);

  // ---------------------------------------------------- //
  // CUSTOM CALENDAR WIDGET ENGINE                        //
  // ---------------------------------------------------- //
  const renderCalendar = (month, year) => {
    // Clear previous date elements (keeping labels)
    const labels = Array.from(daysGrid.querySelectorAll(".calendar-day-label"));
    daysGrid.innerHTML = "";
    labels.forEach(label => daysGrid.appendChild(label));

    monthYearLabel.innerText = `${monthNames[month]} ${year}`;

    // Get first day of month and number of days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    // Render blank placeholders for days before day 1
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement("div");
      daysGrid.appendChild(emptyDiv);
    }

    // Render days
    const today = new Date();
    for (let day = 1; day <= numberOfDays; day++) {
      const button = document.createElement("button");
      button.type = "button";
      button.innerText = day;
      button.classList.add("calendar-date");

      const dateObj = new Date(year, month, day);

      // Past dates are disabled
      if (dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        button.classList.add("disabled");
      }

      // Highlight current selected date
      if (selectedDate && 
          selectedDate.getDate() === day && 
          selectedDate.getMonth() === month && 
          selectedDate.getFullYear() === year) {
        button.classList.add("selected");
      }

      // Highlight actual current day
      if (today.getDate() === day && 
          today.getMonth() === month && 
          today.getFullYear() === year) {
        button.classList.add("today");
      }

      button.addEventListener("click", () => {
        document.querySelectorAll(".calendar-date").forEach(d => d.classList.remove("selected"));
        button.classList.add("selected");
        selectedDate = new Date(year, month, day);
        
        // Format: YYYY-MM-DD
        const monthString = String(month + 1).padStart(2, '0');
        const dayString = String(day).padStart(2, '0');
        dateInput.value = `${year}-${monthString}-${dayString}`;
        
        // Auto-scroll slightly down to slots if needed
        slotsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });

      daysGrid.appendChild(button);
    }
  };

  renderCalendar(currentMonth, currentYear);

  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // ---------------------------------------------------- //
  // TIME SLOTS SELECTION                                 //
  // ---------------------------------------------------- //
  const slots = document.querySelectorAll(".time-slot");
  slots.forEach(slot => {
    slot.addEventListener("click", () => {
      if (slot.classList.contains("disabled")) return;

      slots.forEach(s => s.classList.remove("selected"));
      slot.classList.add("selected");

      selectedTime = slot.getAttribute("data-time");
      timeInput.value = slot.innerText;
    });
  });

  // ---------------------------------------------------- //
  // BOOKING FORM SUBMISSION                              //
  // ---------------------------------------------------- //
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("booking-name").value.trim();
    const email = document.getElementById("booking-email").value.trim();
    const org = document.getElementById("booking-org").value.trim();
    const msg = document.getElementById("booking-message").value.trim();

    // Custom Validation
    if (!name || !email || !org || !msg || !selectedDate || !selectedTime) {
      alert("Please fill in all details, select a date and an available time slot from the calendar.");
      return;
    }

    // Success State
    const submitBtn = document.getElementById("form-submit-btn");
    submitBtn.innerText = "Booking Session...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show Success Toast
      successToast.classList.add("show");

      // Reset form fields
      bookingForm.reset();
      selectedDate = null;
      selectedTime = null;
      document.querySelectorAll(".calendar-date").forEach(d => d.classList.remove("selected"));
      document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
      dateInput.value = "";
      timeInput.value = "";

      // Restore submit button
      submitBtn.innerText = "Request Advisory Slot";
      submitBtn.disabled = false;

      // Hide success toast after 5 seconds
      setTimeout(() => {
        successToast.classList.remove("show");
      }, 5000);
    }, 1500);
  });

  // ---------------------------------------------------- //
  // SCROLLSPY (ACTIVE NAV ANCHOR HIGHLIGHT)              //
  // ---------------------------------------------------- //
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
