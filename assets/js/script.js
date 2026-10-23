
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const libraryContainer = document.getElementById("bibliotecaRecursos");
  const categoryFilter = document.getElementById("filtroCategoria");
  const orderSelect = document.getElementById("ordenRecursos");
  const filterStatus = document.getElementById("resultadoFiltro");

  const catalogPath = "assets/documentos/catalogo.json";

  const normalizeText = (text = "") =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es")
      .trim();

  let resources = [];
  let catalogLoaded = false;
  let catalogError = false;

  const showMessage = (container, message) => {
    if (!container) return;

    container.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    container.appendChild(paragraph);
  };

  const createResourceCard = (resource) => {
    const card = document.createElement("article");
    const availability = resource.disponibilidad || "Pendiente";
    
    let statusClass = "status-pending";
    
    if (availability === "Disponible") {
        statusClass = "status-available";
    } else if (availability === "Próximamente") {
        statusClass = "status-upcoming";
    }
    
    card.className = `resource-card ${statusClass}`;

    const icon = document.createElement("span");
    icon.className = "resource-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = resource.tipo === "PDF" ? "PDF" : "WEB";
    card.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = resource.titulo || "Recurso sin título";
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = resource.descripcion || "";
    card.appendChild(description);

    const category = document.createElement("p");
    category.textContent =
      `Categoría: ${resource.categoria || "Sin categoría"}`;
    card.appendChild(category);

    const statusBadge = document.createElement("span");
    statusBadge.className = `status-badge ${statusClass}`;
    statusBadge.textContent = availability;
    card.appendChild(statusBadge);
    
    if (
      resource.ruta &&
      availability === "Disponible"
    ) {
      const link = document.createElement("a");
      link.className = "card-link";
      link.href = resource.ruta;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir documento →";
      card.appendChild(link);
    }

    return card;
  };

  const renderLibrary = () => {
    if (!libraryContainer) return;

    const selectedCategory = categoryFilter?.value || "todas";

    const filteredResources =
      selectedCategory === "todas"
        ? resources
        : resources.filter(
            (resource) =>
              normalizeText(resource.categoria) ===
              normalizeText(selectedCategory)
          );

    libraryContainer.replaceChildren();

    if (filteredResources.length === 0) {
      showMessage(
        libraryContainer,
        "No hay recursos registrados en esta categoría."
      );
    } else {
      filteredResources.forEach((resource) => {
        libraryContainer.appendChild(createResourceCard(resource));
      });
    }

    if (filterStatus) {
      filterStatus.textContent =
        `Mostrando ${filteredResources.length} de ${resources.length} recursos.`;
    }
  };

  const renderSearchResults = (query) => {
    if (!searchResults) return;

    searchResults.replaceChildren();

    if (!query.trim()) {
      showMessage(
        searchResults,
        "Escribe una palabra clave para buscar recursos."
      );
      return;
    }

    if (catalogError || !catalogLoaded) {
      showMessage(
        searchResults,
        "No fue posible cargar el catálogo. Intenta nuevamente más tarde."
      );
      return;
    }

    const normalizedQuery = normalizeText(query);

    const matches = resources.filter((resource) => {
      const searchableText = normalizeText([
        resource.titulo,
        resource.categoria,
        resource.descripcion,
        resource.tipo,
        resource.disponibilidad
      ].join(" "));

      return searchableText.includes(normalizedQuery);
    });

    if (matches.length === 0) {
      showMessage(
        searchResults,
        "No encontramos resultados. Prueba con otra palabra clave."
      );
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent = `Resultados encontrados: ${matches.length}`;
    searchResults.appendChild(heading);

    const list = document.createElement("ul");

    matches.forEach((resource) => {
      const item = document.createElement("li");

      const title = document.createElement("strong");
      title.textContent = resource.titulo || "Recurso sin título";
      item.appendChild(title);

      const description = document.createElement("p");
      description.textContent = resource.descripcion || "";
      item.appendChild(description);

      const status = document.createElement("p");
      status.textContent =
        `Categoría: ${resource.categoria || "Sin categoría"} · ` +
        `Estado: ${resource.disponibilidad || "Sin información"}`;
      item.appendChild(status);

      if (
        resource.ruta &&
        resource.disponibilidad === "Disponible"
      ) {
        const link = document.createElement("a");
        link.href = resource.ruta;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Abrir documento →";
        item.appendChild(link);
      }

      list.appendChild(item);
    });

    searchResults.appendChild(list);
  };

  const loadCatalog = async () => {
    try {
      const response = await fetch(catalogPath);

      if (!response.ok) {
        throw new Error("No fue posible cargar el catálogo.");
      }

      const catalog = await response.json();

      if (!Array.isArray(catalog.recursos)) {
        throw new Error("El catálogo no contiene una lista válida.");
      }

      resources = catalog.recursos;
      catalogLoaded = true;

      renderLibrary();
    } catch (error) {
      catalogError = true;
      console.error("Error al cargar el catálogo:", error);

      showMessage(
        libraryContainer,
        "No fue posible cargar la biblioteca documental."
      );

      if (filterStatus) {
        filterStatus.textContent =
          "No fue posible cargar los recursos.";
      }
    }
  };

  if (categoryFilter) {
    categoryFilter.addEventListener("change", renderLibrary);
    if (orderSelect) {
    orderSelect.addEventListener("change", renderLibrary);
    }
  }

  if (searchForm && searchInput && searchResults) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderSearchResults(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
      if (!searchInput.value.trim()) {
        searchResults.replaceChildren();
      }
    });
  }

  loadCatalog();
});
