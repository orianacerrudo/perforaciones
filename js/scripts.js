// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// cotizacion de precios
function cotizarPrecio() {
  const metrosSeleccionados = document.getElementById("metrosSeleccionados");
  const selectedValue = metrosSeleccionados.value;

  // Mapa de precios
  const precios = {
    20: 400000,
    30: 600000,
    40: 800000,
    50: 1000000,
    60: 1200000,
    70: 1400000,
    80: 1600000,
    90: 1800000,
    100: 2000000,
  };

  const precioTotal = precios[selectedValue] || 0;
  const resultadoNulo = document.getElementById("precioTotal");
  if (precioTotal === 0) {
    resultadoNulo.innerText = "";
  } else {
    resultadoNulo.innerText = `Total aproximado: $${precioTotal.toLocaleString()}`;
  }
}

// email
(function () {
  emailjs.init("pGc0BhT_ChjzdBhPS");
})();

$(document).ready(function () {
  $("#jobApplicationForm").on("submit", function (e) {
    e.preventDefault();

    // Validar campos aquí antes de enviar el correo
    var firstName = $("#first-name").val().trim();
    var lastName = $("#last-name").val().trim();
    var email = $("#email").val().trim();
    var phone = $("#phone").val().trim();
    var profession = $("#profession").val().trim();

    // Validación de formato de correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $("#responseMessage").html(
        '<div class="alert alert-danger">Por favor, ingrese un correo electrónico válido.</div>'
      );
      return;
    }

    // Validación de campo de teléfono (opcional)
    if (phone !== "" && !/^\d+$/.test(phone)) {
      $("#responseMessage").html(
        '<div class="alert alert-danger">Por favor, ingrese solo números en el campo de teléfono.</div>'
      );
      return;
    }

    // Validación de campos vacíos
    if (
      firstName === "" ||
      lastName === "" ||
      profession === "" ||
      phone === ""
    ) {
      $("#responseMessage").html(
        '<div class="alert alert-danger">Por favor, complete todos los campos del formulario.</div>'
      );
      return;
    }

    const templateParams = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      profession: profession,
    };

    // Envío del correo electrónico si todos los campos están llenos y el correo es válido
    emailjs.send("service_gzf9sro", "template_q13mg3l", templateParams).then(
      function (response) {
        $("#responseMessage").html(
          '<div class="alert alert-success">Formulario enviado con éxito.</div>'
        );
      },
      function (error) {
        $("#responseMessage").html(
          '<div class="alert alert-danger">Hubo un error al enviar el formulario.</div>'
        );
      }
    );
  });
});
