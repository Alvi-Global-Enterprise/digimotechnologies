(function () {
  // Contact page "Visit Us" info only
  if (!/\/contact\/?$/i.test(location.pathname.replace(/\\/g, "/"))) return;

  var EMAIL = "info@digimotechnologies.com";
  var LINES = [
    { text: "Office 1: 10 Foxcombe, New Addington, Croydon, Surrey, CR0 9EX", icon: "MapPin" },
    { text: "Office 2: 128 City Road, London, EC1V 2NX", icon: "MapPin" },
    { text: EMAIL, href: "mailto:" + EMAIL, icon: "Envelope" },
    {
      text: "WhatsApp: 07462 217352",
      href: "https://wa.me/447462217352",
      external: true,
      icon: "Phone",
    },
    { text: "Call/Text: 07446 994824", href: "tel:+447446994824", icon: "Phone" },
    { text: "Company Number: 08364537", icon: "Phone" },
  ];

  var MARK = "data-digimo-contact-info";

  function textOf(el) {
    return ((el && el.textContent) || "").replace(/\s+/g, " ").trim();
  }

  function ensureStyle() {
    if (document.getElementById("digimo-contact-info-style")) return;
    var style = document.createElement("style");
    style.id = "digimo-contact-info-style";
    style.textContent =
      "[" + MARK + "]{display:flex;flex-direction:column;gap:14px;width:100%}" +
      "[" + MARK + "] .digimo-ci-row{display:flex;align-items:flex-start;gap:12px;width:100%}" +
      "[" + MARK + "] .digimo-ci-icon{flex:0 0 20px;width:20px;height:20px;margin-top:2px;color:#fff;opacity:.9}" +
      "[" + MARK + "] .digimo-ci-text{flex:1;min-width:0;color:#fff;font-family:Manrope,sans-serif;font-size:14px;font-weight:500;line-height:1.5}" +
      "[" + MARK + "] .digimo-ci-text a{color:inherit;text-decoration:none}" +
      "[" + MARK + "] .digimo-ci-text a:hover{opacity:.85}" +
      '[data-framer-name="Information"] > :not([' + MARK + "]){display:none!important}";
    document.head.appendChild(style);
  }

  function iconSvg(name) {
    if (name === "Envelope") {
      return '<svg class="digimo-ci-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.56l82.06,75.55a8,8,0,0,0,11.88,0L216,74.56V192Z"></path></svg>';
    }
    if (name === "Phone") {
      return '<svg class="digimo-ci-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-20.18-10.31-36.93-27.06-47.24-47.3l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L88.43,33.86A16,16,0,0,0,73.08,24.3L26.09,36.6A16,16,0,0,0,16,52C16,146.87,109.13,240,204,240a16,16,0,0,0,15.4-10.09l12.3-47A16,16,0,0,0,222.37,158.46Z"></path></svg>';
    }
    return '<svg class="digimo-ci-icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path></svg>';
  }

  function findInfoBox() {
    var box = document.querySelector('[data-framer-name="Information"]');
    if (box) return box;
    var headings = document.querySelectorAll("h1,h2,h3,h4");
    for (var i = 0; i < headings.length; i++) {
      if (textOf(headings[i]) === "Visit Us") {
        var parent = headings[i].parentElement;
        if (!parent) continue;
        if (parent.nextElementSibling) return parent.nextElementSibling;
        return parent.parentElement;
      }
    }
    return null;
  }

  function build() {
    var wrap = document.createElement("div");
    wrap.setAttribute(MARK, "");
    LINES.forEach(function (line) {
      var row = document.createElement("div");
      row.className = "digimo-ci-row";
      row.innerHTML = iconSvg(line.icon || "MapPin");
      var text = document.createElement("div");
      text.className = "digimo-ci-text";
      if (line.href) {
        var a = document.createElement("a");
        a.href = line.href;
        a.textContent = line.text;
        if (line.external) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        text.appendChild(a);
      } else {
        text.textContent = line.text;
      }
      row.appendChild(text);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function isComplete(t) {
    return (
      t.indexOf("Office 1:") !== -1 &&
      t.indexOf("Office 2:") !== -1 &&
      t.indexOf("WhatsApp: 07462 217352") !== -1 &&
      t.indexOf("Call/Text: 07446 994824") !== -1 &&
      t.indexOf("Company Number: 08364537") !== -1 &&
      t.indexOf(EMAIL) !== -1
    );
  }

  function sync() {
    ensureStyle();
    var box = findInfoBox();
    if (!box) return;

    box.querySelectorAll("[data-digimo-footer-info]").forEach(function (n) {
      n.remove();
    });

    var existing = box.querySelector("[" + MARK + "]");
    if (existing && isComplete(textOf(existing)) && !existing.querySelector("[" + MARK + "]")) {
      return;
    }

    var block = build();
    if (existing) existing.replaceWith(block);
    else box.appendChild(block);
  }

  function start() {
    sync();
    window.addEventListener("load", function () {
      sync();
      setTimeout(sync, 400);
      setTimeout(sync, 1200);
    });
    setInterval(sync, 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
