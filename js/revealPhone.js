(() => {
  const pills = document.querySelectorAll("[data-phone-reveal]");
  for (const pill of pills) {
    pill.addEventListener("click", (e) => {
      const revealed = pill.getAttribute("data-revealed") === "true";
      if (revealed) return;

      e.preventDefault();

      const p1 = pill.getAttribute("data-p1") || "";
      const p2 = pill.getAttribute("data-p2") || "";
      const p3 = pill.getAttribute("data-p3") || "";
      const raw = `${p1}${p2}${p3}`.replace(/\D/g, "");
      if (raw.length < 10) return;

      const normalized = raw.length === 11 && raw.startsWith("8") ? `7${raw.slice(1)}` : raw;
      const tel = `+${normalized}`;

      const a = normalized.replace(/^7/, "");
      const formatted = `+7 (${a.slice(0, 3)}) ${a.slice(3, 6)}-${a.slice(6, 8)}-${a.slice(8, 10)}`;

      const label = pill.querySelector("[data-phone-label]");
      if (label) label.textContent = formatted;

      pill.setAttribute("href", `tel:${tel}`);
      pill.removeAttribute("target");
      pill.setAttribute("rel", "nofollow");
      pill.setAttribute("data-revealed", "true");
    });
  }
})();
