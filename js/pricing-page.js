(function () {
  if (!document.body || !document.body.hasAttribute("data-digimo-pricing-page")) return;

  var PLACEHOLDER_ID = "pricing-root";
  var done = false;

  function isNav(el) {
    var text = (el.innerText || "").replace(/\s+/g, " ");
    return /Home\s+About\s+Services\s+Contact/.test(text) && el.getBoundingClientRect().height < 220;
  }

  function isFooter(el) {
    var text = el.innerText || "";
    return /Built by professionals|08364537|info@digimotechnologies\.com|Company Number/i.test(text);
  }

  function findRoot() {
    return document.querySelector("#main > div");
  }

  function ensurePlaceholder(root) {
    var existing = document.getElementById(PLACEHOLDER_ID);
    if (existing) return existing;

    var wrap = document.createElement("div");
    wrap.id = PLACEHOLDER_ID;
    wrap.setAttribute("data-digimo-pricing-shell", "");

    var kids = Array.prototype.slice.call(root.children).filter(function (el) {
      return el.tagName !== "STYLE";
    });

    var footer = null;
    kids.forEach(function (el) {
      if (isFooter(el)) {
        footer = el;
        return;
      }
      if (isNav(el)) return;
      el.style.setProperty("display", "none", "important");
      el.setAttribute("data-digimo-pricing-hidden", "");
    });

    if (footer && footer.parentNode === root) {
      root.insertBefore(wrap, footer);
    } else {
      root.appendChild(wrap);
    }
    return wrap;
  }

  function mountShell() {
    var root = findRoot();
    if (!root) return false;

    var kids = Array.prototype.slice.call(root.children).filter(function (el) {
      return el.tagName !== "STYLE";
    });
    var hasNav = kids.some(isNav);
    var hasFooter = kids.some(isFooter);
    if (!hasNav || !hasFooter) return false;

    ensurePlaceholder(root);
    document.title = "Pricing | Digimo Tech";
    done = true;
    return true;
  }

  function tick() {
    if (done) return;
    mountShell();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tick);
  } else {
    tick();
  }

  var obs = new MutationObserver(function () {
    tick();
    if (done) obs.disconnect();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () {
    obs.disconnect();
    tick();
  }, 10000);
})();
