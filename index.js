// tg-webapp/index.js
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

// простое хранилище в браузере
const STORAGE_KEY = "workouts_v1";

function loadWorkouts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveWorkouts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addWorkoutFlow() {
  const text = prompt("Введите тренировку (пример: Грудь + жим 3×10, 60кг)");
  if (!text) return;

  const workouts = loadWorkouts();
  workouts.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date: todayISO(),
    text: text.trim(),
    createdAt: Date.now(),
  });
  saveWorkouts(workouts);

  alert("Сохранено ✅");
}

// 👉 КНОПКА: ищем по тексту на странице и вешаем обработчик
function wireAddButton() {
  const buttons = Array.from(document.querySelectorAll("button, .btn, a"));
  const addBtn = buttons.find((el) =>
    (el.innerText || "").toLowerCase().includes("добавить")
  );
  if (!addBtn) return false;

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addWorkoutFlow();
  });

  return true;
}

// пробуем сразу + через небольшую задержку (если DOM дорисовывается)
wireAddButton();
setTimeout(wireAddButton, 300);

console.log("WebApp ready ✅");
