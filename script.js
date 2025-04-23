document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM е зареден");

    // Взимане на всички необходими елементи
    const eventForm = document.getElementById("eventForm");
    const eventType = document.getElementById("eventType");
    const customEventType = document.getElementById("customEventType");
    const addGuestBtn = document.getElementById("addGuest");
    const guestList = document.getElementById("guestList");
    const loginBtn = document.getElementById("login-btn");
    const profileIcon = document.getElementById("profile-icon");
    const searchIcon = document.querySelector(".search-icon");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector(".search-input");
    const slides = document.querySelectorAll(".slide");
    const revealElements = document.querySelectorAll(".step, .about-section, .contact-section");

    // Лог за проверка на елементите
    console.log({
        eventForm, eventType, customEventType, addGuestBtn, guestList,
        loginBtn, profileIcon, searchIcon, searchContainer, slides
    });

    // === СЪБИТИЕ: Промяна на типа събитие ===
    if (eventType && customEventType) {
        eventType.addEventListener("change", function () {
            if (eventType.value === "Друго") {
                customEventType.style.display = "block";
                customEventType.required = true;
            } else {
                customEventType.style.display = "none";
                customEventType.required = false;
                customEventType.value = "";
            }
        });
    }

    // === СЪБИТИЕ: Добавяне на гост ===
    if (addGuestBtn && guestList) {
        addGuestBtn.addEventListener("click", function () {
            const newGuestInput = document.createElement("input");
            newGuestInput.type = "text";
            newGuestInput.className = "guest-name";
            newGuestInput.placeholder = "Име на гост";
            guestList.appendChild(newGuestInput);
        });
    }

    // === СЪБИТИЕ: Записване на събитие ===
    if (eventForm) {
        eventForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("eventName").value;
            let type = eventType.value;
            if (type === "Друго") {
                type = customEventType.value;
            }
            const date = document.getElementById("eventDate").value;
            const location = document.getElementById("eventLocation").value;
            const description = document.getElementById("eventDescription").value;

            const guests = [];
            document.querySelectorAll(".guest-name").forEach(input => {
                if (input.value.trim() !== "") {
                    guests.push(input.value.trim());
                }
            });

            if (name && type && date && location && description) {
                const newEvent = { name, type, date, location, description, guests };
                let events = JSON.parse(localStorage.getItem("events")) || [];
                events.push(newEvent);
                localStorage.setItem("events", JSON.stringify(events));

                alert("Събитието е запазено успешно!");
                eventForm.reset();
                customEventType.style.display = "none";
                guestList.innerHTML = '<input type="text" class="guest-name" placeholder="Име на гост">';
            } else {
                alert("Моля, попълнете всички полета!");
            }
        });
    } else {
        console.error("Липсва елемент: eventForm");
    }

    // === СЛАЙДЕР ===
    if (slides.length > 0) {
        let slideIndex = 0;

        function showSlides() {
            slides.forEach(slide => slide.classList.remove("active"));

            slideIndex++;
            if (slideIndex > slides.length) slideIndex = 1;

            slides[slideIndex - 1].classList.add("active");
            setTimeout(showSlides, 3500);
        }

        setTimeout(showSlides, 500);
    }

    // === ТЪРСАЧКА ===
    if (searchIcon && searchContainer && searchInput) {
        searchIcon.addEventListener("click", function () {
            searchContainer.classList.toggle("active");

            if (searchContainer.classList.contains("active")) {
                searchInput.focus();
            }
        });
    } else {
        console.error("Липсва елемент за търсачка.");
    }

    // === БЪДЕЩИ ФУНКЦИИ: Плавни анимации, скрол и др. могат да се добавят тук ===
});

document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger-menu");
    const navLinks = document.querySelector(".nav-links");
  
    burger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  });

  

  document.getElementById('start-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Спира стандартното презареждане
    document.getElementById('start-section').scrollIntoView({ behavior: 'smooth' });
});


document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");
  
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("show");
      if (searchInput.classList.contains("show")) {
        searchInput.focus();
      }
    });
  });

  


  document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");
  
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("show");
      if (searchInput.classList.contains("show")) {
        searchInput.focus();
      }
    });
  
    // Слайдшоу логика
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
  
    function showSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove("active");
      });
  
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }
  
    // Стартира слайдшоу на всеки 5 секунди
    setInterval(showSlides, 5000);
  });

  

  document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");
  
    searchIcon.addEventListener("click", function () {
      searchInput.classList.toggle("show");
    });
  
    // Скриване при клик извън търсачката
    document.addEventListener("click", function (e) {
      if (!searchInput.contains(e.target) && !searchIcon.contains(e.target)) {
        searchInput.classList.remove("show");
      }
    });
  });
  
