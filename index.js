const mensual = document.getElementById("mensual");
    const anual = document.getElementById("anual");

    mensual.addEventListener("click", () => {
      mensual.classList.add("active");
      anual.classList.remove("active");
    });

    anual.addEventListener("click", () => {
      anual.classList.add("active");
      mensual.classList.remove("active");
    });