
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchForm || !searchInput || !searchResults) {
    return;
  }

  const resourceCards = Array.from(
    document.querySelectorAll(
      ".resource-card, .resource-grid article, .hero-panel .panel-item"
    )
  );

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value
      .trim()
      .toLocaleLowerCase("es");

    searchResults.replaceChildren();

    if (!query) {
      searchResults.textContent =
        "Escribe una palabra clave para buscar recursos.";
      return;
    }

    const matches = resourceCards.filter((card) =>
      card.textContent.toLocaleLowerCase("es").includes(query)
    );

    if (matches.length === 0) {
      searchResults.textContent =
        "No encontramos coincidencias. Intenta con otra palabra clave.";
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent =
      `Resultados encontrados: ${matches.length}`;

    searchResults.appendChild(heading);

    const resultList = document.createElement("ul");

    matches.forEach((card) => {
      const item = document.createElement("li");
      const link = card.querySelector("a[href]");
      const title = card.querySelector("h2, h3, h4");

      if (link) {
        const resultLink = document.createElement("a");
        resultLink.href = link.href;
        resultLink.textContent =
          title?.textContent.trim() ||
          link.textContent.trim() ||
          "Consultar recurso";

        item.appendChild(resultLink);
      } else {
        item.textContent =
          title?.textContent.trim() ||
          card.textContent.trim().slice(0, 120);
      }

      resultList.appendChild(item);
    });

    searchResults.appendChild(resultList);
  });
});
