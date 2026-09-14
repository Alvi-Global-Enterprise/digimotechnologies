(function () {
  var LINES = [
    {
      label: "Office 1",
      text: "10 Foxcombe, New Addington, Croydon, Surrey, CR0 9EX",
    },
    {
      label: "Office 2",
      text: "128 City Road, London, EC1V 2NX",
    },
    {
      label: "WhatsApp",
      text: "07462 217352",
      href: "https://wa.me/447462217352",
      external: true,
    },
    {
      label: "Call / Text",
      text: "07446 994824",
      href: "tel:+447446994824",
    },
    {
      label: "Call / Text",
      text: "07472 146427",
      href: "tel:+447472146427",
    },
    {
      label: "Company No.",
      text: "08364537",
    },
  ];
  var EMAIL = "info@digimotechnologies.com";
  var FB = "https://www.facebook.com/digitechlimited/";
  var IG = "https://www.instagram.com/digimotechnologies/";
  var MARK = "data-digimo-footer-info";
  var UI_VER = "v4";

  function textOf(el) {
    return ((el && el.textContent) || "").replace(/\s+/g, " ").trim();
  }

  function ensureStyle() {
    var style = document.getElementById("digimo-footer-info-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "digimo-footer-info-style";
      document.head.appendChild(style);
    }
    style.textContent =
      "[" + MARK + "]{display:flex;flex-direction:column;gap:10px;margin:0;padding:0;max-width:420px}" +
      "[" + MARK + "] .digimo-fi-title{margin:0 0 2px;color:rgba(255,255,255,.55);font-family:Manrope,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}" +
      "[" + MARK + "] .digimo-fi-row{display:grid;grid-template-columns:96px minmax(0,1fr);gap:10px;align-items:start}" +
      "[" + MARK + "] .digimo-fi-label{margin:0;color:rgba(255,255,255,.45);font-family:Manrope,sans-serif;font-size:12px;font-weight:600;line-height:1.45}" +
      "[" + MARK + "] .digimo-fi-value{margin:0;color:#fff;font-family:Manrope,sans-serif;font-size:13px;font-weight:500;line-height:1.45}" +
      "[" + MARK + "] .digimo-fi-value a{color:#fff!important;text-decoration:none}" +
      "[" + MARK + "] .digimo-fi-value a:hover{color:#c6ff4a!important}" +
      "[" + MARK + "] .digimo-footer-socials{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1)}" +
      "[" + MARK + "] .digimo-footer-socials a{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 14px;border:1px solid rgba(255,255,255,.18);border-radius:999px;color:#fff!important;font-family:Manrope,sans-serif;font-size:12px;font-weight:600;letter-spacing:.04em;text-decoration:none;background:rgba(255,255,255,.03);transition:border-color .2s ease,color .2s ease,background .2s ease}" +
      "[" + MARK + "] .digimo-footer-socials a:hover{border-color:#c6ff4a;color:#c6ff4a!important;background:rgba(198,255,74,.08)}" +
      "[data-digimo-footer-hide],[data-digimo-social-hide]{display:none!important}" +
      "@media (max-width:809px){[" +
      MARK +
      "]{max-width:100%}[" +
      MARK +
      "] .digimo-fi-row{grid-template-columns:1fr;gap:2px}}";
  }

  function isInVisitUs(el) {
    if (!el || !el.closest) return false;
    if (el.closest('[data-framer-name="Information"]')) return true;
    if (el.closest('[data-framer-name="Form"]')) return true;
    var root = el;
    for (var i = 0; i < 8 && root; i++) {
      var t = root.innerText || "";
      if (t.indexOf("Visit Us") !== -1 && t.indexOf("Subscribe to our newsletter") === -1) return true;
      root = root.parentElement;
    }
    return false;
  }

  function isFooterZone(el) {
    if (!el || isInVisitUs(el)) return false;
    var zone = el;
    for (var i = 0; i < 10 && zone; i++) {
      var t = zone.innerText || "";
      if (
        t.indexOf("Subscribe to our newsletter") !== -1 ||
        t.indexOf("Quick Links") !== -1 ||
        /Let's Collaborate/i.test(t)
      ) {
        return true;
      }
      zone = zone.parentElement;
    }
    return el.getBoundingClientRect().top > window.innerHeight * 0.55;
  }

  function findFooterSeed() {
    var nodes = document.querySelectorAll("a, p, span");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (isInVisitUs(el)) continue;
      var t = textOf(el);
      if (!t || t.length > 200) continue;
      if (
        /Foxcombe|Office\s*1|128\s*City\s*Road|Office\s*2|WhatsApp|07462|\+44\s*\(?744\)?\s*095\s*0062/i.test(
          t
        )
      ) {
        if (isFooterZone(el)) return el;
      }
    }
    return null;
  }

  function findContactColumn(seed) {
    var node = seed;
    for (var depth = 0; node && depth < 8; depth++) {
      var text = textOf(node);
      var hasAddress = /Foxcombe|City\s*Road|Office/i.test(text);
      var hasContact = /info@digimo|WhatsApp|Call|07462|Company|\+44/i.test(text);
      if (hasAddress && hasContact && node.querySelectorAll("p,div").length >= 2) return node;
      node = node.parentElement;
    }
    return seed.parentElement;
  }

  function hideOldLines(col, block) {
    col.querySelectorAll("p").forEach(function (p) {
      if (block.contains(p)) return;
      var t = textOf(p);
      if (!t) return;
      if (
        /Foxcombe|Office\s*[12]|128\s*City\s*Road|^United Kingdom$|info@digimo|WhatsApp|Call\s*\/\s*Text|Company|07462|07446|\+44\s*\(?744\)?\s*095\s*0062/i.test(
          t
        )
      ) {
        p.setAttribute("data-digimo-footer-hide", "");
      }
    });
  }

  function ensureSocials(wrap) {
    var box = wrap.querySelector(".digimo-footer-socials");
    if (!box) {
      box = document.createElement("div");
      box.className = "digimo-footer-socials";
      wrap.appendChild(box);
    }
    box.innerHTML =
      '<a href="' + FB + '" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="' + IG + '" target="_blank" rel="noopener">Instagram</a>';
  }

  function buildBlock() {
    var wrap = document.createElement("div");
    wrap.setAttribute(MARK, "");
    wrap.setAttribute("data-ui", UI_VER);

    var title = document.createElement("p");
    title.className = "digimo-fi-title";
    title.textContent = "Contact";
    wrap.appendChild(title);

    LINES.forEach(function (line) {
      var row = document.createElement("div");
      row.className = "digimo-fi-row";

      var label = document.createElement("p");
      label.className = "digimo-fi-label";
      label.textContent = line.label;

      var value = document.createElement("p");
      value.className = "digimo-fi-value";
      if (line.href) {
        var a = document.createElement("a");
        a.href = line.href;
        a.textContent = line.text;
        if (line.external) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        value.appendChild(a);
      } else {
        value.textContent = line.text;
      }

      row.appendChild(label);
      row.appendChild(value);
      wrap.appendChild(row);
    });

    var emailRow = document.createElement("div");
    emailRow.className = "digimo-fi-row";
    emailRow.innerHTML =
      '<p class="digimo-fi-label">Email</p>' +
      '<p class="digimo-fi-value"><a href="mailto:' +
      EMAIL +
      '">' +
      EMAIL +
      "</a></p>";
    wrap.appendChild(emailRow);

    ensureSocials(wrap);
    return wrap;
  }

  function complete(el) {
    if (!el) return false;
    if (el.getAttribute("data-ui") !== UI_VER) return false;
    var text = textOf(el);
    return (
      text.indexOf("10 Foxcombe") !== -1 &&
      text.indexOf("128 City Road") !== -1 &&
      text.indexOf("07462 217352") !== -1 &&
      text.indexOf("07446 994824") !== -1 &&
      text.indexOf("07472 146427") !== -1 &&
      text.indexOf("08364537") !== -1 &&
      !!el.querySelector(".digimo-footer-socials a[href*='facebook.com']") &&
      !!el.querySelector(".digimo-footer-socials a[href*='instagram.com']")
    );
  }

  function hideBrokenOriginalSocials() {
    document.querySelectorAll("a").forEach(function (a) {
      if (a.closest("[" + MARK + "]")) return;
      var href = (a.getAttribute("href") || "").toLowerCase();
      var label = textOf(a).toUpperCase();
      var isSocial =
        /twitter\.com|x\.com|linkedin\.com|youtube\.com|instagram\.com|facebook\.com/.test(href) ||
        /^(TWITTER|LINKEDIN|YOUTUBE|FACEBOOK|INSTAGRAM)$/.test(label);
      if (!isSocial || !isFooterZone(a)) return;

      a.setAttribute("data-digimo-social-hide", "");

      var container = a.closest('[class*="-container"]');
      if (container && container !== document.body) {
        var onlySocial = true;
        container.querySelectorAll("a").forEach(function (x) {
          if (x.closest("[" + MARK + "]")) return;
          var h = (x.getAttribute("href") || "").toLowerCase();
          var t = textOf(x).toUpperCase();
          if (
            !/twitter|linkedin|youtube|instagram|facebook|x\.com/.test(h) &&
            !/^(TWITTER|LINKEDIN|YOUTUBE|FACEBOOK|INSTAGRAM)$/.test(t)
          ) {
            onlySocial = false;
          }
        });
        if (onlySocial) container.setAttribute("data-digimo-social-hide", "");
      }

      var row = a.closest(".framer-jomly7, .framer-pyg2m4, .framer-c6cl4w");
      if (row) {
        var ok = true;
        row.querySelectorAll("a").forEach(function (x) {
          if (x.closest("[" + MARK + "]")) return;
          var h = (x.getAttribute("href") || "").toLowerCase();
          var t = textOf(x).toUpperCase();
          if (
            !/twitter|linkedin|youtube|instagram|facebook|x\.com/.test(h) &&
            !/^(TWITTER|LINKEDIN|YOUTUBE|FACEBOOK|INSTAGRAM)$/.test(t)
          ) {
            ok = false;
          }
        });
        if (ok) row.setAttribute("data-digimo-social-hide", "");
      }
    });
  }

  function syncFooter() {
    document.querySelectorAll("[" + MARK + "] [" + MARK + "]").forEach(function (nested) {
      var parent = nested.parentElement;
      if (!parent) return;
      while (nested.firstChild) parent.insertBefore(nested.firstChild, nested);
      nested.remove();
    });

    var seed = findFooterSeed();
    if (!seed) return;
    var col = findContactColumn(seed);
    if (!col || isInVisitUs(col)) return;

    var existingInTree = seed.closest && seed.closest("[" + MARK + "]");
    if (existingInTree) col = existingInTree.parentElement || col;

    var blocks = Array.prototype.slice.call(col.querySelectorAll("[" + MARK + "]"));
    if (col.hasAttribute && col.hasAttribute(MARK)) blocks.unshift(col);

    var keeper = null;
    blocks.forEach(function (b) {
      if (!keeper && complete(b)) keeper = b;
    });
    blocks.forEach(function (b) {
      if (keeper && b !== keeper) b.remove();
    });

    var existing = keeper || col.querySelector("[" + MARK + "]");
    if (existing && complete(existing)) {
      ensureSocials(existing);
      hideOldLines(col, existing);
      return;
    }

    var block = buildBlock();
    if (existing) existing.replaceWith(block);
    else if (col.firstChild) col.insertBefore(block, col.firstChild);
    else col.appendChild(block);
    hideOldLines(col, block);
  }

  function sync() {
    ensureStyle();
    syncFooter();
    hideBrokenOriginalSocials();
  }

  function start() {
    sync();
    window.addEventListener("load", function () {
      sync();
      setTimeout(sync, 500);
      setTimeout(sync, 1500);
    });
    setInterval(sync, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
