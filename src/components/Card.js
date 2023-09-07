export class Card {
  #name; #link; #likes; #ownerId; #cardId;
  #templateElement;
  #cardElement;
  #handleLikeButton;
  #handleCardClick;
  #handleDeleteIcon;
  #profileUserId;
  #cardTemplateLikeCounter;
  #cardTemplateLikeButton;
  #cardTemplatePhoto;
  #cardTemplateText;
  constructor( { name, link, likes, owner, _id }, profileUserId, handleLikeButton, handleCardClick, handleDeleteIcon, templateElement ) {
    this.#name = name;
    this.#link = link;
    this.#likes = likes;
    this.#ownerId = owner._id;
    this.#cardId = _id;
    this.#profileUserId = profileUserId;

    this.#templateElement = templateElement;
    this.#handleLikeButton = handleLikeButton;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteIcon = handleDeleteIcon;
  }
  #getTemplate() {
    return this.#templateElement.content.querySelector('.card').cloneNode(true);
  }
  #setTemplateData(){
    this.#cardTemplatePhoto = this.#cardElement.querySelector('.card__photo');
    this.#cardTemplateText = this.#cardElement.querySelector('.card__text');
    this.#cardTemplateLikeButton = this.#cardElement.querySelector('.card__like');
    this.#cardTemplateLikeCounter = this.#cardElement.querySelector('.card__like-counter');

    this.#cardTemplatePhoto.src = this.#link;
    this.#cardTemplatePhoto.alt = this.#name;
    this.#cardTemplateText.textContent = this.#name;
    this.#cardTemplateLikeCounter.textContent = this.#likes.length;

    if (this.#likes.length > 0) {
      this.#likes.forEach((item) => {
        if (item._id === this.#profileUserId) {
          this.#cardTemplateLikeButton.classList.add('card__like_active');
        }
      }) 
    } else {
      this.#cardTemplateLikeCounter.classList.add('card__like-counter_hidden'); 
      this.#cardTemplateLikeCounter.textContent = 0;
    }
  }

  #setEventListeners(evt){
    this.#cardTemplateLikeButton.addEventListener('click', evt => {
      this.#handleLikeButton(this, this.#cardId, this.#cardTemplateLikeButton, this.#cardTemplateLikeCounter); 
    });
    // обработчик для открытия попапа 
    this.#cardTemplatePhoto.addEventListener('click', evt => {
      this.#handleCardClick(this.#name, this.#link);
    });
  }
  updateLikeButtonStatus(data){
    this.#cardTemplateLikeButton.classList.toggle('card__like_active')
    this.#cardTemplateLikeCounter.textContent = data.likes.length;
  }
  deletedCard(cardItemContainer){
    cardItemContainer.remove();
    cardItemContainer = '';
  }
  generate() {
    this.#cardElement = this.#getTemplate();
    this.#setTemplateData();
    this.#handleDeleteIcon(this, this.#cardId, this.#ownerId, this.#cardElement.querySelector('.card__trash'));
    this.#setEventListeners(); 
    return this.#cardElement;
  }

}