const eventForm        = document.getElementById("eventForm");
const eventNameInput   = document.getElementById("eventName");
const eventDateInput   = document.getElementById("eventDate");
const eventTimeInput   = document.getElementById("eventTime");
const eventPriorityInput = document.getElementById("eventPriority");
const eventDescInput   = document.getElementById("eventDescription");

const addBtn           = document.getElementById("add-btn");
const clearAllBtn      = document.getElementById("clearAllBtn");
const eventList        = document.getElementById("eventList");
const eventCountEl     = document.getElementById("eventCount");
const filterBtns       = document.querySelectorAll(".filter-btn");

let events = [];
let activeFilter = "all";

// ---- CREATE CARD ----
function createEventCard(eventData, index) {
  const card = document.createElement("div");
  card.className = `event-card priority-${eventData.priority}`;
  card.dataset.index = index;
  card.dataset.priority = eventData.priority;

  const dateStr = eventData.date
    ? new Date(eventData.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short", month: "short", day: "numeric", year: "numeric"
      })
    : "No date";

  const timeStr = eventData.time ? ` · ${eventData.time}` : "";

  card.innerHTML = `
    <div class="card-top">
      <span class="priority-badge ${eventData.priority}">${eventData.priority}</span>
      <button class="delete-btn" title="Delete event">✕</button>
    </div>
    <div class="card-title">${escapeHTML(eventData.name)}</div>
    <div class="card-date">${dateStr}${timeStr}</div>
    ${eventData.description
      ? `<div class="card-description">${escapeHTML(eventData.description)}</div>`
      : ""}
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.style.transition = "opacity 0.3s, transform 0.3s";
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
    setTimeout(() => {
      events.splice(Number(card.dataset.index), 1);
      renderEvents();
    }, 300);
  });

  return card;
}

// ---- RENDER ----
function renderEvents() {
  eventList.innerHTML = "";

  const filtered = activeFilter === "all"
    ? events
    : events.filter(e => e.priority === activeFilter);

  updateCount();

  if (filtered.length === 0) {
    eventList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">◇</div>
        <p>${events.length === 0 ? "No events yet.<br />Add your first one." : "No events match this filter."}</p>
      </div>`;
    return;
  }

  filtered.forEach((ev, i) => {
    const realIndex = events.indexOf(ev);
    const card = createEventCard(ev, realIndex);
    card.style.animationDelay = `${i * 60}ms`;
    eventList.appendChild(card);
  });
}

function updateCount() {
  const n = events.length;
  eventCountEl.textContent = n === 0 ? "No events" : `${n} event${n > 1 ? "s" : ""}`;
}

// ---- ADD EVENT ----
addBtn.addEventListener("click", () => {
  const name = eventNameInput.value.trim();
  const date = eventDateInput.value;

  if (!name) { shake(eventNameInput); return; }
  if (!date)  { shake(eventDateInput); return; }

  const eventData = {
    name,
    date,
    time: eventTimeInput.value,
    priority: eventPriorityInput.value,
    description: eventDescInput.value.trim()
  };

  events.unshift(eventData);
  renderEvents();
  eventForm.reset();

  // quick flash success on button
  addBtn.style.background = "linear-gradient(135deg, #6bcb77, #3a9e4a)";
  setTimeout(() => {
    addBtn.style.background = "";
  }, 600);
});

// ---- CLEAR ALL ----
clearAllBtn.addEventListener("click", () => {
  if (events.length === 0) return;
  if (confirm("Clear all events?")) {
    events = [];
    renderEvents();
  }
});

// ---- FILTERS ----
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderEvents();
  });
});

// ---- UTILS ----
function shake(el) {
  el.style.animation = "none";
  el.offsetHeight; // reflow
  el.style.animation = "shake 0.4s ease";
  el.focus();
  el.addEventListener("animationend", () => { el.style.animation = ""; }, { once: true });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

// ---- SHAKE KEYFRAME (injected) ----
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-6px); }
    80%      { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ---- INIT ----
renderEvents();
