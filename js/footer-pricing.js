(function () {
  var pricingHref = "/pricing";

  function isCustomFooter() {
    return !!document.querySelector("footer .foot-links a[href$='pricing'], footer .foot-links a[href$='pricing.html'], footer .foot-links a[href$='/pricing']");
  }

  function footerLink(hrefEnds) {
    var found = null;
    document.querySelectorAll('a[href$="' + hrefEnds + '"]').forEach(function (a) {
      if (a.id === "digimo-footer-pricing") return;
      if (a.closest("#digimo-footer-pricing-row")) return;
      if (a.closest('[data-framer-name="Nav Links"]')) return;
      if (a.closest("header")) return;
      var r = a.getBoundingClientRect();
      if (r.width > 8 && r.height > 8) found = a;
    });
    return found;
  }

  function commonParent(a, b) {
    var seen = [];
    for (var n = a; n; n = n.parentElement) seen.push(n);
    for (var m = b; m; m = m.parentElement) {
      if (seen.indexOf(m) !== -1) return m;
    }
    return null;
  }

  function rowOf(parent, el) {
    var n = el;
    while (n && n.parentElement !== parent) n = n.parentElement;
    return n;
  }

  function removeInjectedRow() {
    var row = document.getElementById("digimo-footer-pricing-row");
    if (row && row.parentNode) row.parentNode.removeChild(row);
    var ql = document.getElementById("digimo-footer-ql");
    if (ql && ql.parentNode) ql.parentNode.removeChild(ql);
  }

  function ensureStyle() {
    var style = document.getElementById("digimo-footer-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "digimo-footer-style";
      document.head.appendChild(style);
    }
    style.textContent =
      ".framer-1m6gk1u,[data-digimo-ql]{overflow:visible!important}" +
      ".framer-1m6s7op,[data-digimo-pricing-host]{padding-bottom:0em!important;position:relative!important}" +
      ".framer-1m6s7op::after,[data-digimo-pricing-host]::after{content:\"PRICING\";display:block;margin-top:10px;color:#fff;text-transform:uppercase;font-family:Manrope,sans-serif;font-size:13px;font-weight:600;line-height:2em;letter-spacing:0;pointer-events:none}" +
      "[data-digimo-pricing-host][data-digimo-pricing-hover]::after,.framer-1m6s7op[data-digimo-pricing-hover]::after{color:#d89128}" +
      "#digimo-footer-host{position:absolute;left:0;top:0;width:100%;height:0;overflow:visible;pointer-events:none;z-index:9999}" +
      "#digimo-footer-pricing{position:absolute;display:none;opacity:0;pointer-events:auto}";
  }

  function ensureHost() {
    var host = document.getElementById("digimo-footer-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "digimo-footer-host";
      document.body.appendChild(host);
    }
    var link = document.getElementById("digimo-footer-pricing");
    if (!link) {
      link = document.createElement("a");
      link.id = "digimo-footer-pricing";
      link.href = pricingHref;
      link.textContent = "Pricing";
      link.setAttribute("aria-label", "Pricing");
      host.appendChild(link);
      link.addEventListener("mouseenter", function () {
        var hostRow = document.querySelector("[data-digimo-pricing-host],.framer-1m6s7op");
        if (hostRow) hostRow.setAttribute("data-digimo-pricing-hover", "");
      });
      link.addEventListener("mouseleave", function () {
        document.querySelectorAll("[data-digimo-pricing-hover]").forEach(function (el) {
          el.removeAttribute("data-digimo-pricing-hover");
        });
      });
    } else if (link.parentNode !== host) {
      host.appendChild(link);
    }
    return { host: host, link: link };
  }

  function sync() {
    removeInjectedRow();
    ensureStyle();
    var parts = ensureHost();
    var link = parts.link;
    var host = parts.host;

    if (isCustomFooter()) {
      link.style.display = "none";
      return;
    }

    var services = footerLink("/services") || footerLink("services");
    var contact = footerLink("/contact") || footerLink("contact");
    if (!services || !contact) return;

    var parent = commonParent(services, contact);
    if (!parent) return;
    parent.setAttribute("data-digimo-ql", "");

    var svcRow = rowOf(parent, services);
    if (svcRow) svcRow.setAttribute("data-digimo-pricing-host", "");

    var sr = services.getBoundingClientRect();
    var hr = host.getBoundingClientRect();
    var line = Math.max(22, Math.ceil(sr.height));

    link.href = pricingHref;
    link.style.display = "block";
    link.style.top = sr.bottom + 10 - hr.top + "px";
    link.style.left = sr.left - hr.left + "px";
    link.style.height = line + "px";
    link.style.width = Math.max(70, Math.ceil(sr.width), 86) + "px";
  }

  function start() {
    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("load", function () {
      sync();
      setTimeout(sync, 400);
    });
    setInterval(sync, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
