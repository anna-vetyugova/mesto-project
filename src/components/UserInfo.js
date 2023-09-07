export class UserInfo {
  #profileName;
  #profileDescription;
  #profileAvatar;

  constructor(profileNameSelector, profileDescriptionSelector, profileAvatarSelector) {
    this.#profileName = profileNameSelector;
    this.#profileDescription = profileDescriptionSelector;
    this.#profileAvatar = profileAvatarSelector;
  }

  getUserInfo(){
    return {
      name: this.#profileName.textContent,
      about: this.#profileDescription.textContent
    }
  }
  
  setUserInfo({ name, about }){
    this.#profileName.textContent = name;
    this.#profileDescription.textContent = about;
  }
  setUserAvatar(avatarLink) {
    this.#profileAvatar.style.backgroundImage = "url("+avatarLink+")";
  };
}