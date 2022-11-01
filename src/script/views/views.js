export default class viewsParent {
  _data;
  _parentElement;

  renderEventHandler(handler) {
    ["hashchange", "load"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  renderResults(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this.clearFields();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clearFields() {
    this._parentElement.innerHTML = "";
  }
}
