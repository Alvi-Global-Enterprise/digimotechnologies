(function () {
  var rocket =
    '<svg viewBox="0 0 72 72" fill="none" aria-hidden="true">' +
    '<path d="M36 6c8 10 12 22 12 34 0 6-1.2 11.4-3.2 16H27.2C25.2 51.4 24 46 24 40 24 28 28 16 36 6Z" fill="#7cfa42"/>' +
    '<path d="M36 14c5 8 8 17 8 26 0 4-.7 7.8-1.9 11H29.9C28.7 47.8 28 44 28 40c0-9 3-18 8-26Z" fill="#00e571"/>' +
    '<circle cx="36" cy="34" r="6" fill="#9ad7ff"/>' +
    '<circle cx="36" cy="34" r="3.2" fill="#eef9ff"/>' +
    '<path d="M24 44c-6 2-11 7-12 14 7-1 13-5 16-11-2-1-3-2-4-3Z" fill="#7cfa42"/>' +
    '<path d="M48 44c6 2 11 7 12 14-7-1-13-5-16-11 2-1 3-2 4-3Z" fill="#7cfa42"/>' +
    '<path d="M33 56h6l-1 8h-4l-1-8Z" fill="#ffb347"/>' +
    '</svg>';

  var extras = [
    "UNLIMITED Revisions",
    "100% Satisfaction Guarantee",
    "100% Money Back Guarantee *"
  ];

  var catalog = [
    {
      id: "logo",
      label: "Logo Design",
      packages: [
        { name: "Bronze", price: 25, old: 50, rush: "+£50 / 24h", details: "3 concepts, 3 revisions, 2 designers, PNG/JPG, 24–48h" },
        { name: "Silver", price: 65, old: 130, rush: "+£50 / 24h", details: "5 concepts, 5 revisions, 4 designers, business card, favicon, all source formats" },
        { name: "Gold", price: 125, old: 250, rush: "+£90", details: "Unlimited concepts/revisions, 4 designers, letterhead + stationery, all formats" },
        { name: "Platinum", price: 175, old: 350, rush: "+£90", details: "Unlimited concepts/revisions, 5 designers, icon + stationery/invoice" },
        { name: "Diamond", price: 245, old: 490, rush: "+£90", details: "Unlimited concepts/revisions, social media design, 2 flyers/brochures" },
        { name: "Infinite", price: 495, old: 990, rush: "+£90", details: "Unlimited logo, 3-page custom website, social + Google Map integration" },
        { name: "Basic", price: 255, old: 210, rush: "+£90", details: "3 concepts, 2 designers, unlimited revisions, 48h" },
        { name: "Startup", price: 355, old: 710, rush: "+£90", details: "4 concepts, 3 designers, unlimited revisions, 48h" },
        { name: "Standard", price: 555, old: 1110, rush: "+£90", details: "Unlimited concepts, 4 designers, unlimited revisions, all formats" },
        { name: "3D", price: 555, old: 1110, rush: "+£90", details: "3 unique 3D concepts, VFX, rendering, multiple angles, unlimited revisions" }
      ]
    },
    {
      id: "website",
      label: "Website Design",
      packages: [
        { name: "Startup", price: 249, old: 400, rush: "+£30", details: "5-page website, stock photos, banners, slider, sitemap, 48–72h" },
        { name: "Professional", price: 599, old: 1199, rush: "+£60", details: "10 pages, CMS/admin panel, stock images, banners, social page designs" },
        { name: "Elite", price: 999, old: 1999, rush: "+£90", details: "Up to 15 pages, responsive, forms, optional booking/payment, social integration" },
        { name: "Silver", price: 1599, old: 3199, rush: "+£90", details: "15–20 pages, custom WP/PHP, CMS, responsive, domain, advanced integrations" },
        { name: "Business", price: 2499, old: 4999, rush: "+£90", details: "15–20 pages + custom dev, CMS, video, voice-over, script, SEO meta" },
        { name: "Automated-Interactive", price: 4999, old: 9999, rush: "+£90", details: "Unlimited pages, custom CMS, automation, hosting, LMS/conferencing features" },
        { name: "Custom CRM", price: 6999, old: 13999, rush: "+£90", details: "Unlimited pages + custom CRM, analytics, sales/marketing automation, enterprise modules" }
      ]
    },
    {
      id: "ecommerce",
      label: "Ecommerce",
      packages: [
        { name: "Brand E-Commerce", price: 499, old: 999, rush: "+£30", details: "Up to 50 products, CMS, mini cart, payments, product search" },
        { name: "Beginner", price: 999, old: 1999, rush: "+£30", details: "Up to 15 pages, 100 products, 7 categories, cart, inventory, hosting" },
        { name: "Corporate", price: 1799, old: 3599, rush: "+£30", details: "Unlimited pages/products/categories, CMS, cart, inventory, 3-year hosting" },
        { name: "Elite", price: 3694, old: 7388, rush: "+£30", details: "Logo/branding + ecommerce, unlimited products/categories, gateway, multi-currency" },
        { name: "Custom Marketplace", price: 6999, old: 14000, rush: "+£30", details: "Marketplace, inventory, CRM, seller profiles, analytics, rewards modules" },
        { name: "Automated-Interactive", price: 9999, old: 19998, rush: "+£30", details: "Automated ecommerce, supplier/shipping APIs, warehouse/inventory automation" },
        { name: "Custom CRM-ERP", price: 15000, old: 30000, rush: "+£30", details: "Ecommerce + CRM + ERP, finance, HR, analytics, enterprise integrations" }
      ]
    },
    {
      id: "branding",
      label: "Branding",
      packages: [
        { name: "Startup", price: 49, old: 99, rush: "+£30", details: "2 stationery sets, fax template, print-ready formats, unlimited revisions" },
        { name: "Classic", price: 129, old: 259, rush: "+£60", details: "Stationery, flyer, bi/tri-fold brochure, unlimited revisions" },
        { name: "Premium", price: 199, old: 399, rush: "+£90", details: "Stationery, packaging, T-shirt design, unlimited revisions" },
        { name: "Unlimited", price: 294, old: 499, rush: "+£90", details: "Stationery, menu card, T-shirt, banner" },
        { name: "Complete Branding", price: 999, old: 1989, rush: "+£90", details: "Unlimited logo + website, 6 designers, responsive site, full stationery/social assets" }
      ]
    },
    {
      id: "seo",
      label: "SEO",
      packages: [
        { name: "Startup", price: 499, old: 898, rush: "+£90", details: "5 keywords, off-site SEO, links, analysis, content/blog work, reporting" },
        { name: "Identity", price: 849, old: 1698, rush: "+£90", details: "10 keywords, on/off-page SEO, technical optimization, analytics setup" },
        { name: "Elite", price: 1549, old: 3098, rush: "+£90", details: "20 keywords + broader technical/on-page/off-page work" },
        { name: "Professional", price: 2149, old: 4298, rush: "+£90", details: "30 keywords + advanced/full SEO activities" }
      ]
    },
    {
      id: "video",
      label: "Video Animation",
      packages: [
        { name: "Startup", price: 499, old: 998, rush: "+£90", details: "30 sec, script, storyboard, illustrations, voice-over, revisions" },
        { name: "Delux", price: 899, old: 1798, rush: "+£90", details: "60 sec HD 1080, script, storyboard, voice-over" },
        { name: "Platinum", price: 1199, old: 2398, rush: "+£90", details: "90 sec HD 1080" },
        { name: "Diamond", price: 1399, old: 2798, rush: "+£90", details: "120 sec HD, character animation, 2D/3D elements" },
        { name: "Startup 3D", price: 1799, old: 3598, rush: "+£90", details: "30 sec 3D, modeling, rigging, lighting, rendering, VFX" },
        { name: "Advance 3D", price: 2199, old: 4398, rush: "+£90", details: "60 sec 3D, broadcast-quality production, modeling/VFX" }
      ]
    },
    {
      id: "combo",
      label: "Combo Packages",
      packages: [
        { name: "Basic", price: 499, old: 998, rush: "+£90", details: "Logo + stationery + 5-page responsive website + social designs" },
        { name: "Startup", price: 449, old: 898, rush: "+£90", details: "5-page logo/web/social combination" },
        { name: "Professional", price: 1399, old: 2799, rush: "+£90", details: "Unlimited logo, branding collateral, dynamic site, social integration" },
        { name: "Corporate", price: 1999, old: 3999, rush: "+£90", details: "Branding + unlimited-page ecommerce, unlimited products, inventory/payments" },
        { name: "Elite", price: 2999, old: 5999, rush: "+£90", details: "Custom PHP, dashboard, CMS, optional booking/payment, admin panel" }
      ]
    },
    {
      id: "content",
      label: "Content Writing",
      packages: [
        { name: "Article", price: 55, old: 220, rush: "+£30", details: "300 words/page, professional writers" },
        { name: "Creative", price: 55, old: 220, rush: "+£30", details: "250 words/page, industry-specific writers" },
        { name: "Blog", price: 55, old: 220, rush: "+£30", details: "250 words/page" },
        { name: "Infographics", price: 220, old: 155, rush: "+£30", details: "120 words/infographic" }
      ]
    },
    {
      id: "social",
      label: "Social Media",
      packages: [
        { name: "Small Business", price: 355, old: 1420, rush: "+£90", details: "3 posts/week per network, FB/Twitter/Instagram/Google+, content + optimization" },
        { name: "Medium Business", price: 555, old: 2220, rush: "+£90", details: "5 posts/week, copy/design, ads, reputation, accounts, engagement/replies" }
      ]
    },
    {
      id: "cv",
      label: "CV Writing",
      packages: [
        { name: "Basic / Entry Level", price: 35, old: 49, rush: "24–48h", details: "CV formatting, basic content optimization, ATS-friendly, 1 revision, PDF + Word" },
        { name: "Standard / Professional", price: 55, old: 70, rush: "24h", details: "Professional CV writing, ATS keywords, cover letter, 2 revisions, modern layout" },
        { name: "Premium / Executive", price: 90, old: 120, rush: "12–24h", details: "Executive CV, LinkedIn optimization, ATS + HR content, unlimited revisions, premium design" }
      ]
    }
  ];

  var activeId = "branding";
  var slideIndex = 0;

  function money(n) {
    return "£" + Number(n).toLocaleString("en-GB");
  }

  function rushText(pkg, categoryId) {
    var rush = pkg.rush || "";
    if (categoryId === "cv") {
      return "Delivery: " + rush;
    }
    var m = rush.match(/£([\d,]+)\s*(?:\/\s*(.+))?/);
    if (!m) return rush ? "Add on: " + rush : "";
    var extra = m[2] ? m[2].replace(/h$/i, " Hours") : "24-48 Hours";
    return "Add on: £" + m[1] + " for " + extra + " Rush Delivery";
  }

  function features(details) {
    var items = String(details || "")
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    extras.forEach(function (extra) {
      var has = items.some(function (item) {
        return item.toLowerCase().indexOf(extra.toLowerCase().replace(" *", "")) !== -1;
      });
      if (!has) items.push(extra);
    });
    return items;
  }

  function cardHtml(pkg, category) {
    var title = pkg.name.split("/")[0].trim();
    return (
      '<article class="px-card">' +
        '<div class="px-card__head">' + pkg.name.toUpperCase() + "</div>" +
        '<div class="px-card__body">' +
          '<div class="px-card__icon">' + rocket + "</div>" +
          '<h3 class="px-card__title">' + title.toUpperCase() + "</h3>" +
          '<div class="px-card__price-row">' +
            '<div class="px-card__price"><b>£</b>' + Number(pkg.price).toLocaleString("en-GB") +
              '<span class="px-card__old">' + money(pkg.old) + "</span></div>" +
            '<div class="px-card__rush">' + rushText(pkg, category.id) + "</div>" +
          "</div>" +
          "<ul class=\"px-card__features\">" +
            features(pkg.details).map(function (item) { return "<li>" + item + "</li>"; }).join("") +
          "</ul>" +
        "</div>" +
        '<a class="px-card__cta" href="/contact">ORDER NOW</a>' +
      "</article>"
    );
  }

  function visibleCount() {
    if (window.matchMedia("(max-width: 809px)").matches) return 1;
    if (window.matchMedia("(max-width: 1100px)").matches) return 2;
    return 3;
  }

  function maxIndex(total) {
    return Math.max(0, total - visibleCount());
  }

  function applySlide(root, total) {
    var track = root.querySelector(".px-track");
    var viewport = root.querySelector(".px-viewport");
    var prev = root.querySelector(".px-nav--prev");
    var next = root.querySelector(".px-nav--next");
    var dots = root.querySelectorAll(".px-dot");
    if (!track || !viewport) return;
    var vis = visibleCount();
    var max = maxIndex(total);
    if (slideIndex > max) slideIndex = max;
    if (slideIndex < 0) slideIndex = 0;
    var gap = 22;
    var width = Math.max(220, (viewport.clientWidth - gap * (vis - 1)) / vis);
    track.querySelectorAll(".px-card").forEach(function (card) {
      card.style.flex = "0 0 " + width + "px";
      card.style.maxWidth = width + "px";
    });
    track.style.transform = "translateX(" + (-slideIndex * (width + gap)) + "px)";
    if (prev) prev.disabled = slideIndex <= 0 || total <= vis;
    if (next) next.disabled = slideIndex >= max || total <= vis;
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === slideIndex);
    });
    if (prev && next) {
      prev.style.display = total <= vis ? "none" : "";
      next.style.display = total <= vis ? "none" : "";
    }
  }

  function render(root) {
    var category = catalog.filter(function (c) { return c.id === activeId; })[0] || catalog[0];
    var total = category.packages.length;
    var max = maxIndex(total);
    var dots = "";
    for (var i = 0; i <= max; i++) {
      dots += '<button type="button" class="px-dot' + (i === slideIndex ? " is-active" : "") + '" data-slide="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }
    root.innerHTML =
      '<div class="digimo-pricing-home__inner">' +
        '<div class="digimo-pricing-home__intro" style="width:100%;text-align:center">' +
          '<p class="digimo-pricing-home__eyebrow" style="text-align:center">Pricing</p>' +
          '<h2 style="width:100%;max-width:none;text-align:center;margin:0 auto">Flexible pricing packages.</h2>' +
        "</div>" +
        '<div class="digimo-pricing-home__layout">' +
          '<aside class="digimo-pricing-home__cats">' +
            catalog.map(function (c) {
              return '<button type="button" class="digimo-pricing-home__cat' +
                (c.id === activeId ? " is-active" : "") +
                '" data-cat="' + c.id + '">' + c.label + "</button>";
            }).join("") +
          "</aside>" +
          '<div class="px-carousel">' +
            '<button type="button" class="px-nav px-nav--prev" aria-label="Previous packages">‹</button>' +
            '<div class="px-viewport"><div class="px-track">' +
              category.packages.map(function (pkg) { return cardHtml(pkg, category); }).join("") +
            "</div></div>" +
            '<button type="button" class="px-nav px-nav--next" aria-label="Next packages">›</button>' +
            (max > 0 ? '<div class="px-dots">' + dots + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</div>";
    requestAnimationFrame(function () { applySlide(root, total); });
  }

  function bind(root) {
    root.addEventListener("click", function (e) {
      var cat = e.target.closest(".digimo-pricing-home__cat");
      if (cat) {
        activeId = cat.getAttribute("data-cat");
        slideIndex = 0;
        render(root);
        return;
      }
      var category = catalog.filter(function (c) { return c.id === activeId; })[0] || catalog[0];
      var total = category.packages.length;
      if (e.target.closest(".px-nav--next")) {
        slideIndex = Math.min(maxIndex(total), slideIndex + 1);
        applySlide(root, total);
        return;
      }
      if (e.target.closest(".px-nav--prev")) {
        slideIndex = Math.max(0, slideIndex - 1);
        applySlide(root, total);
        return;
      }
      var dot = e.target.closest(".px-dot");
      if (dot) {
        slideIndex = Number(dot.getAttribute("data-slide")) || 0;
        applySlide(root, total);
      }
    });
    window.addEventListener("resize", function () {
      var category = catalog.filter(function (c) { return c.id === activeId; })[0];
      if (category) applySlide(root, category.packages.length);
    });
  }

  function mount() {
    document.querySelectorAll('[data-framer-name="CTA"]').forEach(function (cta) {
      var prev = cta.previousElementSibling;
      if (prev && prev.classList && prev.classList.contains("digimo-pricing-home")) prev.remove();
    });

    var faq = document.querySelector('[data-framer-name="Section - FAQ"]');
    var root = document.getElementById("pricing-root");
    var existing = document.querySelector(".digimo-pricing-home");

    function place(section) {
      if (root && section.parentNode !== root) {
        root.appendChild(section);
      } else if (!root && faq && faq.parentNode && section.nextElementSibling !== faq) {
        faq.parentNode.insertBefore(section, faq);
      }
    }

    if (existing) {
      place(existing);
      return;
    }

    var section = document.createElement("section");
    section.className = "digimo-pricing-home";
    section.id = "pricing";
    section.setAttribute("data-framer-name", "Section - Pricing");
    render(section);
    bind(section);

    if (root) {
      root.appendChild(section);
    } else if (faq && faq.parentNode) {
      faq.parentNode.insertBefore(section, faq);
    } else {
      document.body.appendChild(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  var obs = new MutationObserver(mount);
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () {
    obs.disconnect();
    mount();
  }, 8000);
})();
