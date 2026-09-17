const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {

  const open = nav.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", open);

  menuBtn.textContent = open ? "×" : "☰";

});


document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.textContent = "☰";

  });

});



const themeBtn = document.querySelector("#themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const light =
    document.body.classList.contains("light");

  localStorage.setItem(
    "ml-mind-theme",
    light ? "light" : "dark"
  );

  themeBtn.textContent = light ? "☾" : "☼";

});


if (
  localStorage.getItem("ml-mind-theme") === "light"
) {

  document.body.classList.add("light");

  themeBtn.textContent = "☾";

}



const filters =
  document.querySelectorAll(".filter");

const cards =
  document.querySelectorAll(".algorithm-card");

const searchInput =
  document.querySelector("#searchInput");

const noResults =
  document.querySelector("#noResults");

let currentFilter = "all";


function filterAlgorithms() {

  const query =
    searchInput.value.trim().toLowerCase();

  let visible = 0;

  cards.forEach(card => {

    const typeMatch =
      currentFilter === "all" ||
      card.dataset.type === currentFilter;

    const textMatch =
      card.dataset.name.includes(query);

    const show =
      typeMatch && textMatch;

    card.style.display =
      show ? "flex" : "none";

    if (show) {
      visible++;
    }

  });

  noResults.style.display =
    visible ? "none" : "block";

}


filters.forEach(button => {

  button.addEventListener("click", () => {

    filters.forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    currentFilter =
      button.dataset.filter;

    filterAlgorithms();

  });

});


searchInput.addEventListener(
  "input",
  filterAlgorithms
);



const modal =
  document.querySelector("#modal");

const modalTitle =
  document.querySelector("#modalTitle");

const modalText =
  document.querySelector("#modalText");

const modalEyebrow =
  document.querySelector("#modalEyebrow");


const algorithmInfo = {

  "Linear Regression":
    "Linear Regression learns a relationship between input features and a continuous target. It is a useful starting point for understanding prediction, error, and optimization.",

  "Logistic Regression":
    "Logistic Regression is commonly used for classification. It converts a linear combination of features into a probability using the logistic function.",

  "Decision Tree":
    "A Decision Tree recursively splits data using feature-based rules. The goal is to create groups that are increasingly useful for prediction.",

  "Random Forest":
    "Random Forest combines predictions from many decision trees. Each tree sees a varied view of the data, helping the ensemble reduce sensitivity to individual trees.",

  "Support Vector Machine":
    "A Support Vector Machine searches for a separating boundary with a large margin. Kernels can extend the method to nonlinear decision boundaries.",

  "K-Means":
    "K-Means partitions observations into K groups. It repeatedly assigns points to nearby centroids and then updates those centroids.",

  "PCA":
    "Principal Component Analysis transforms data into directions of maximum variance. It is often used for dimensionality reduction and visualization.",

  "Neural Network":
    "A Neural Network uses layers of weighted transformations and nonlinear activation functions. During training, its parameters are adjusted to reduce a loss."

};


function openModal(
  title,
  text,
  label = "ML CONCEPT"
) {

  modalTitle.textContent = title;

  modalText.textContent = text;

  modalEyebrow.textContent = label;

  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

}


function closeModal() {

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}



document.querySelectorAll(".learn-btn")
.forEach(button => {

  button.addEventListener("click", () => {

    const name =
      button.dataset.algo;

    openModal(
      name,
      algorithmInfo[name],
      "ML CONCEPT"
    );

  });

});



const projectInfo = {

  "House Price Predictor":
    "Start with a tabular housing dataset. Clean missing values, inspect correlations, engineer useful features, train a regression model, and evaluate it with an appropriate regression metric.",

  "Spam Detector":
    "Build a text classification pipeline: clean messages, convert text into numerical features, train a classifier, then inspect precision, recall, and false positives.",

  "Customer Segments":
    "Standardize customer features, explore their distributions, choose a reasonable number of clusters, fit K-Means, and interpret the resulting customer groups."

};


document.querySelectorAll(".project-btn")
.forEach(button => {

  button.addEventListener("click", () => {

    const name =
      button.dataset.project;

    openModal(
      name,
      projectInfo[name],
      "PROJECT LAB"
    );

  });

});



document.querySelectorAll(".term")
.forEach(button => {

  button.addEventListener("click", () => {

    const title =
      button.querySelector("b").textContent;

    openModal(
      title,
      button.dataset.definition,
      "GLOSSARY"
    );

  });

});



document.querySelector("#closeModal")
.addEventListener(
  "click",
  closeModal
);


modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeModal();
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});



const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav a"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              "#" + entry.target.id
            );

          });

        }

      });

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach(section =>
  observer.observe(section)
);


document.querySelector("#year")
.textContent = new Date().getFullYear();
