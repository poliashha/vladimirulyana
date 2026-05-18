const scriptURL =
  "https://script.google.com/macros/s/AKfycbwISPr92y_8-GXWpCMFfF4yf6TBgNcNtHTIcG1JJdkDqwYWHvQXKIjyxIzdXFmWEzuI/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
  const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "отправка...";
  const drinksString = drinks.join(", ");
  // Преобразуем массив в строку с разделителем (например, запятая)

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("presence", formData.get("presence"));
  newFormData.append("one", formData.get("one")|| "-");
  newFormData.append("car", formData.get("car") || "-");
  newFormData.append("drinks", drinksString);
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

const button = document.querySelector(".button");
const mapbutton = document.querySelector(".map-button");
button.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});
mapbutton.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

mapbutton.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});

document.addEventListener("DOMContentLoaded", function () {
  const hearts = document.querySelectorAll(".heart");
  const timigBlock = document.querySelector(".timig");

  let animationStarted = false;

  if (!timigBlock) return;

  // Создаём наблюдатель за прокруткой с порогом 20% (0.2)
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        // Когда блок появляется на 20% в зоне видимости
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;

          // Поочередно активируем каждое сердечко
          hearts.forEach((heart, index) => {
            setTimeout(() => {
              heart.classList.add("visible");
            }, index * 400);
          });

          // Отключаем наблюдение
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  // Начинаем следить за блоком
  observer.observe(timigBlock);

  // Дополнительная проверка: если блок уже виден при загрузке
  const rect = timigBlock.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const visiblePercentage =
    (Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)) / rect.height;

  if (visiblePercentage >= 0.2 && !animationStarted) {
    animationStarted = true;

    hearts.forEach((heart, index) => {
      setTimeout(() => {
        heart.classList.add("visible");
      }, index * 400);
    });

    observer.unobserve(timigBlock);
  }
});

function startCountdown(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("timer").style.display = "none";
      document.getElementById("datetime").textContent = "Мы стали семьей!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

const newYear = new Date(2026, 6, 17, 14, 40, 0).getTime();
startCountdown(newYear);

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

