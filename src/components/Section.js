export default class Section {
    #renderItems;
    #renderer;
    #container;
    
    constructor({ items, renderer }, containerSelector) {
      this.#renderedItems = items;
      this.#renderer = renderer;
      this.#container = document.querySelector(containerSelector);
    }
  
    addItem(element) {
      this.#container.append(element);
    }
  
    renderItems() {
      this.#renderItems.forEach(item => {
        this.#renderer(item);
      });
    }
  }