export class Card {
  #name; #link; #likes; #ownerId; #cardId;
  #templateElement;
  #cardElement;
  #handleCardClick;
  #profileUserId;
  #cardTemplateLikeCounter;
  #cardTemplateLikeButton;
  #cardTemplatePhoto;
  #cardTemplateText;
  #cardTemplateDeleteIcon;
  #handleLikeButton;
  #handleDeleteIcon
  constructor( { name, link, likes, owner, _id }, profileUserId, handleCardClick, handleLikeButton, handleDeleteIcon, templateElement ) {
    this.#name = name;
    this.#link = link;
    this.#likes = likes;
    this.#ownerId = owner._id;
    this.#cardId = _id;
    this.#profileUserId = profileUserId;

    this.#templateElement = templateElement;
    this.#handleCardClick = handleCardClick;
    this.#handleLikeButton = handleLikeButton;
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
    this.#cardTemplateDeleteIcon = this.#cardElement.querySelector('.card__trash');

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

  #setEventListeners(){
    this.#cardTemplateLikeButton.addEventListener('click', () => {
      this.#handleLikeButton(this, this.#cardId, this.#cardTemplateLikeButton.classList.contains('card__like_active')); 
    });
    // обработчик для открытия попапа 
    this.#cardTemplatePhoto.addEventListener('click', () => {
      this.#handleCardClick(this.#name, this.#link);
    });

    if (this.#ownerId != this.#profileUserId) {
      this.#cardTemplateDeleteIcon.classList.add('card__trash_hidden');
    }
    else {
      this.#cardTemplateDeleteIcon.addEventListener('click', (evt) => {
        this.#handleDeleteIcon(this, this.#cardElement, this.#cardId);
      });
    }
  }

  updateLikeButtonStatus(data){
    this.#cardTemplateLikeButton.classList.toggle('card__like_active');
    this.#cardTemplateLikeCounter.textContent = data.likes.length;
    if(this.#cardTemplateLikeCounter.textContent === '0'){
      this.#cardTemplateLikeCounter.classList.add('card__like-counter_hidden');
    }
    else this.#cardTemplateLikeCounter.classList.remove('card__like-counter_hidden');
  }

  deletedCard(cardItemContainer){
    cardItemContainer.remove();
    cardItemContainer = '';
  }

  generate() {
    this.#cardElement = this.#getTemplate();
    this.#setTemplateData();
    this.#setEventListeners(); 
    return this.#cardElement;
  }

}