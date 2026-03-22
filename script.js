/* === Utils (safe optional calls) === */
const safeCall = (fn, ...args) =>
  typeof fn === "function" ? fn(...args) : undefined;

/* === Dynamic word + emoji cycler with smooth fade, pauses when tab hidden === */
function setupWordCycler() {
  const wordEl = document.getElementById("word");
  const emojiEl = document.getElementById("emoji");
  if (!wordEl || !emojiEl) return;

  const items = [
    {
      word: "educating",
      emoji: "icons/book.png",
      gradient: "linear-gradient(90deg,#f2994a,#f2c94c)",
    },
    {
      word: "lifting",
      emoji: "icons/biceps.png",
      gradient: "linear-gradient(90deg,#56ccf2,#2f80ed)",
    },
    {
      word: "coding",
      emoji: "icons/laptop.png",
      gradient: "linear-gradient(90deg,#bb6bd9,#6dd5fa)",
    },
    {
      word: "exploring",
      emoji: "icons/globe.png",
      gradient: "linear-gradient(90deg,#43cea2,#185a9d)",
    },
    {
      word: "writing",
      emoji: "icons/memo.png",
      gradient: "linear-gradient(90deg,#f7971e,#ffd200)",
    },
    {
      word: "building",
      emoji: "icons/hammer_wrench.png",
      gradient: "linear-gradient(90deg,#c94b4b,#4b134f)",
    },
  ];

  let i = 0,
    timer = null;

  const applyItem = (item) => {
    wordEl.classList.add("is-fading");
    emojiEl.classList.add("is-fading");
    setTimeout(() => {
      wordEl.textContent = item.word;
      wordEl.style.backgroundImage = item.gradient;
      if (emojiEl.getAttribute("src") !== item.emoji) emojiEl.src = item.emoji;
      requestAnimationFrame(() => {
        wordEl.classList.remove("is-fading");
        emojiEl.classList.remove("is-fading");
      });
    }, 220);
  };

  const start = () => {
    if (timer) return;
    timer = setInterval(() => {
      i = (i + 1) % items.length;
      applyItem(items[i]);
    }, 4000);
  };
  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  // initial
  applyItem(items[i]);
  start();

  // Pause when tab is hidden (battery/perf win)
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  // Reduced motion: swap instantly
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stop();
  }
}

function setupSubscribeForm() {
  const form = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("email");
  const nextInput = document.getElementById("subscribe-next");
  const replyToInput = document.getElementById("subscribe-replyto");
  const statusEl = document.getElementById("form-status");

  if (!form || !emailInput || !nextInput || !replyToInput || !statusEl) return;

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("subscribed", "1");
  currentUrl.hash = "weekly-learnings";
  nextInput.value = currentUrl.toString();

  const syncReplyTo = () => {
    replyToInput.value = emailInput.value.trim();
  };

  emailInput.addEventListener("input", syncReplyTo);
  form.addEventListener("submit", syncReplyTo);

  const pageUrl = new URL(window.location.href);
  if (pageUrl.searchParams.get("subscribed") === "1") {
    statusEl.textContent =
      "Thanks for joining. Check your inbox, and if this is the first signup, confirm the activation email once.";
    pageUrl.searchParams.delete("subscribed");
    history.replaceState({}, "", `${pageUrl.pathname}${pageUrl.hash || ""}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeCall(window.generateBackground);
  if (typeof window.debounce === "function") {
    window.addEventListener(
      "resize",
      window.debounce(() => safeCall(window.generateBackground), 150)
    );
  } else {
    window.addEventListener("resize", () =>
      safeCall(window.generateBackground)
    );
  }
  setupWordCycler();
  setupSubscribeForm();
});
