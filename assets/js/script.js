
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchForm || !searchInput || !searchResults) {
    return;
  }

  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es")
      .trim();

  const resourceCards = Array.from(
    document.querySelectorAll(".resource-card")
  );

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = normalizeText(searchInput.value);
    searchResults.replaceChildren();

    if (!query) {
      searchResults.textContent =
        "Escribe una palabra clave para buscar recursos.";
      searchInput.focus();
      return;
    }

    const matches = resourceCards.filter((card) =>
      normalizeText(card.textContent).includes(query)
    );

    if (matches.length === 0) {
      const message = document.createElement("p");
      message.textContent =
        "No encontramos resultados. Prueba con otra palabra clave.";
      searchResults.appendChild(message);
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent =
      `Resultados encontrados: ${matches.length}`;

    searchResults.appendChild(heading);

    const resultList = document.createElement("ul");

    matches.forEach((card) => {
      const item = document.createElement("li");
      const title = card.querySelector("h2, h3, h4");
      const description = card.querySelector("p");
      const link = card.matches("a[href]")
        ? card
        : card.querySelector("a[href]");

      const resultTitle = document.createElement("strong");
      resultTitle.textContent =
        title?.textContent.trim() || "Recurso del portal";

      if (link) {
        const resultLink = document.createElement("a");
        resultLink.href = link.href;
        resultLink.target = link.target || "_self";

        if (link.target === "_blank") {
          resultLink.rel = "noopener noreferrer";
        }

        resultLink.appendChild(resultTitle);
        item.appendChild(resultLink);
      } else {
        item.appendChild(resultTitle);
      }

      if (description) {
        const detail = document.createElement("p");
        detail.textContent = description.textContent.trim();
        item.appendChild(detail);
      }

      resultList.appendChild(item);
    });

    searchResults.appendChild(resultList);
  });

  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim()) {
      searchResults.replaceChildren();
    }
  });
});
