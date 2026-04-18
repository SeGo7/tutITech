(function () {
  var pills = document.querySelectorAll("[data-phone-reveal]");

  function startsWithEight(value) {
    return value && value.charAt(0) === "8";
  }

  for (var i = 0; i < pills.length; i += 1) {
    (function (pill) {
      pill.addEventListener("click", function (e) {
        var revealed = pill.getAttribute("data-revealed") === "true";
        if (revealed) {
          return;
        }

        e.preventDefault();

        var p1 = pill.getAttribute("data-p1") || "";
        var p2 = pill.getAttribute("data-p2") || "";
        var p3 = pill.getAttribute("data-p3") || "";
        var raw = (p1 + p2 + p3).replace(/\D/g, "");
        if (raw.length < 10) {
          return;
        }

        var normalized = raw;
        if (raw.length === 11 && startsWithEight(raw)) {
          normalized = "7" + raw.slice(1);
        }

        var tel = "+" + normalized;
        var a = normalized.replace(/^7/, "");
        var formatted = "+7 (" + a.slice(0, 3) + ") " + a.slice(3, 6) + "-" + a.slice(6, 8) + "-" + a.slice(8, 10);

        var label = pill.querySelector("[data-phone-label]");
        if (label) {
          label.textContent = formatted;
        }

        pill.setAttribute("href", "tel:" + tel);
        pill.removeAttribute("target");
        pill.setAttribute("rel", "nofollow");
        pill.setAttribute("data-revealed", "true");
      });
    })(pills[i]);
  }
})();
