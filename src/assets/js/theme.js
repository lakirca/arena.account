"use strict";
var demoMode = function () {
  var e, t, a, o, l, n, r, s, i = document.querySelector("#popoverDemo"),
    c = document.querySelector("#demoForm"),
    d = document.querySelector("#topnav1"),
    u = document.querySelector("#topbar"),
    f = document.querySelector("#sidebar"),
    h = document.querySelector("#sidebarSmall"),
    p = document.querySelector("#sidebarUser"),
    b = document.querySelector("#sidebarSmallUser"),
    g = document.querySelector("#sidebarSizeContainer"),
    v = document.querySelectorAll('input[name="navPosition"]'),
    m = document.querySelectorAll('[class^="container"]'),
    y = document.querySelector("#stylesheetLight"),
    C = document.querySelector("#stylesheetDark"),
    S = {
      showPopover: !localStorage.getItem("dashkitShowPopover") || localStorage.getItem("dashkitShowPopover"),
      colorScheme: localStorage.getItem("dashkitColorScheme") ? localStorage.getItem("dashkitColorScheme") : "light",
      navPosition: localStorage.getItem("dashkitNavPosition") ? localStorage.getItem("dashkitNavPosition") : "sidenav",
      navColor: localStorage.getItem("dashkitNavColor") ? localStorage.getItem("dashkitNavColor") : "default",
      sidebarSize: localStorage.getItem("dashkitSidebarSize") ? localStorage.getItem("dashkitSidebarSize") : "base"
    };

  function k(e) {
    "topnav" == e ? $(g).collapse("hide") : $(g).collapse("show")
  }

  function A(e) {
    e && e.setAttribute("style", "display: none !important")
  }
  return i,
    function () {
      for (var e = window.location.search.substring(1).split("&"), t = 0; t < e.length; t++) {
        var a = e[t].split("="),
          o = a[0],
          l = a[1];
        "colorScheme" != o && "navPosition" != o && "navColor" != o && "sidebarSize" != o || (localStorage.setItem("dashkit" + o.charAt(0).toUpperCase() + o.slice(1), l), S[o] = l)
      }
    }(), "light" == (e = S.colorScheme) ? (y.disabled = !1, C.disabled = !0, e = "light") : "dark" == e && (y.disabled = !0, C.disabled = !1, e = "dark"),
    function (e) {
      if (d && u && f && h && p && b)
        if ("topnav" == e) {
          A(u), A(f), A(h);
          for (var t = 0; t < m.length; t++) m[t].classList.remove("container-fluid"), m[t].classList.add("container")
        } else if ("combo" == e) {
          A(d), A(p), A(b);
          for (t = 0; t < m.length; t++) m[t].classList.remove("container"), m[t].classList.add("container-fluid")
        } else if ("sidenav" == e) {
          A(d), A(u);
          for (t = 0; t < m.length; t++) m[t].classList.remove("container"), m[t].classList.add("container-fluid")
        }
    }(S.navPosition), t = S.navColor, f && h && d && ("default" == t ? (f.classList.add("navbar-light"), h.classList.add("navbar-light"), d.classList.add("navbar-light")) : "inverted" == t ? (f.classList.add("navbar-dark"), h.classList.add("navbar-dark"), d.classList.add("navbar-dark")) : "vibrant" == t && (f.classList.add("navbar-dark", "navbar-vibrant"), h.classList.add("navbar-dark", "navbar-vibrant"), d.classList.add("navbar-dark", "navbar-vibrant"))), "base" == (a = S.sidebarSize) ? A(h) : "small" == a && A(f), o = c, l = S.colorScheme, n = S.navPosition, r = S.navColor, s = S.sidebarSize, $(o).find('[name="colorScheme"][value="' + l + '"]').closest(".btn").button("toggle"), $(o).find('[name="navPosition"][value="' + n + '"]').closest(".btn").button("toggle"), $(o).find('[name="navColor"][value="' + r + '"]').closest(".btn").button("toggle"), $(o).find('[name="sidebarSize"][value="' + s + '"]').closest(".btn").button("toggle"), k(S.navPosition), document.body.style.display = "block", c && (c.addEventListener("submit", function (e) {
      var t, a, o, l, n;
      e.preventDefault(), a = (t = c).querySelector('[name="colorScheme"]:checked').value, o = t.querySelector('[name="navPosition"]:checked').value, l = t.querySelector('[name="navColor"]:checked').value, n = t.querySelector('[name="sidebarSize"]:checked').value, localStorage.setItem("dashkitColorScheme", a), localStorage.setItem("dashkitNavPosition", o), localStorage.setItem("dashkitNavColor", l), localStorage.setItem("dashkitSidebarSize", n), window.location = window.location.pathname
    }), [].forEach.call(v, function (e) {
      e.parentElement.addEventListener("click", function () {
        k(e.value)
      })
    })), !0
}();
