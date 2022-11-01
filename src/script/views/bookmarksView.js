import viewsParent from "./views.js";
class bookmarks extends viewsParent {
  _parentElement = document.querySelector(".search");
  _bookmarksDiv = document.querySelector(".bookmarks");
  _bookmarkShowBtn = document.querySelector(".bookmark__btn");
  // _bookmarkRender = document.querySelector(".preview");

  toggleHandler() {
    this._bookmarksDiv.classList.toggle("bookmarks--active");
  }

  toggleBookmarks() {
    this._bookmarkShowBtn.addEventListener(
      "click",
      this.toggleHandler.bind(this)
    );
  }

  clickedRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".preview");
      if (!btn) return;
      const elId = btn.dataset.id;
      handler(elId);
    });
  }
}
export default new bookmarks();
