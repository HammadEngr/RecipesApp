import viewsParent from "./views.js";

class searchResultsView extends viewsParent {
  _parentElement = document.querySelector(".results");
  _search = document.querySelector(".search");

  getQuery() {
    return this._search.querySelector(".search__field").value;
  }

  clickedRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const el = e.target.closest(".preview");
      const elId = el.dataset.id;
      handler(elId);
    });
  }

  searchSubmit(handler) {
    this._search
      .querySelector(".search__btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        handler();
      });
  }

  // _generateMarkup() {
  //   return this._data.map((res) => markup.renderResults(res, false)).join("");
  // }

  _generateMarkup() {
    return this._data
      .map((res) => {
        return `
        <li class="preview" data-id="${res.id}">
        <figure class="preview__fig">
          <img src="${res.image}" alt="" />
        </figure>
        <div class="preview__data">
          <h3 class="preview__name">
            ${res.title}
          </h3>
          <p class="preview__author">${
            res.publisher ? res.publisher : "pretty woman"
          }</p>
          <div class="preview__user-generated">
            <svg>
              <path
                d="M21 21v-2c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464h-8c-1.38 0-2.632 0.561-3.536 1.464s-1.464 2.156-1.464 3.536v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.829 0.335-1.577 0.879-2.121s1.292-0.879 2.121-0.879h8c0.829 0 1.577 0.335 2.121 0.879s0.879 1.292 0.879 2.121v2c0 0.552 0.448 1 1 1s1-0.448 1-1zM17 7c0-1.38-0.561-2.632-1.464-3.536s-2.156-1.464-3.536-1.464-2.632 0.561-3.536 1.464-1.464 2.156-1.464 3.536 0.561 2.632 1.464 3.536 2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536zM15 7c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121 0.335-1.577 0.879-2.121 1.292-0.879 2.121-0.879 1.577 0.335 2.121 0.879 0.879 1.292 0.879 2.121z"
                ></path>
            </svg>
          </div>
        </div>
      </li>
      `;
      })
      .join("");
  }
}

export default new searchResultsView();
