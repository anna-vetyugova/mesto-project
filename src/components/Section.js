export class Section{
  #renderer;
  #containerSelector;

  constructor(renderer, containerSelector){
    this.#renderer = renderer;
    this.#containerSelector = document.querySelector(containerSelector);
  }

  addItem(elementNoded, position) {
    switch (position) {
      case "append": 
          this.#containerSelector.append(elementNoded); break;
      case "prepend": 
          this.#containerSelector.prepend(elementNoded); break;
      default: console.error('Невалидное значение для параметра position!'); break;
    }
  }

  renderItems(items) {
    items.forEach(item => {
      this.#renderer( item , 'append' );
    })
  }
} 