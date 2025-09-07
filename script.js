/* === Dynamic word + emoji cycler with smooth fade === */
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

  let i = 0;

  function applyItem(item) {
    // fade out
    wordEl.classList.add("is-fading");
    emojiEl.classList.add("is-fading");

    // after fade, swap content, then fade back in
    setTimeout(() => {
      wordEl.textContent = item.word;
      wordEl.style.backgroundImage = item.gradient;
      emojiEl.src = item.emoji;

      // allow browser to paint new content before removing fade class
      requestAnimationFrame(() => {
        wordEl.classList.remove("is-fading");
        emojiEl.classList.remove("is-fading");
      });
    }, 220); // match CSS transition duration
  }

  // initial render
  applyItem(items[i]);

  // rotate every 4s
  setInterval(() => {
    i = (i + 1) % items.length;
    applyItem(items[i]);
  }, 4000);
}

/* Run both: background + cycler */
document.addEventListener("DOMContentLoaded", () => {
  // your existing generateBackground() + resize listener should already be here
  if (typeof generateBackground === "function") generateBackground();
  if (typeof debounce === "function")
    window.addEventListener("resize", debounce(generateBackground, 150));
  setupWordCycler();
});
