(()=>{"use strict";var e=document.querySelector(".page"),t=e.querySelector(".popup_profile_edit"),r=e.querySelector(".popup_card_add"),o=e.querySelector(".popup_card_show"),n=e.querySelector(".popup_avatar_update"),c=e.querySelector(".popup_card_delete"),a=t.querySelector(".popup__form"),i=r.querySelector(".popup__form"),u=n.querySelector(".popup__form"),s=e.querySelector(".profile__edit-button"),l=e.querySelector(".profile__add-button"),d=e.querySelector(".profile__avatar"),p=document.querySelectorAll(".popup__close-icon"),f=c.querySelector(".popup__form-button"),_=e.querySelector(".profile__title"),h=e.querySelector(".profile__subtitle"),m=e.querySelector(".profile__avatar"),v=t.querySelector(".popup__form-field_type_name"),y=t.querySelector(".popup__form-field_type_description"),S=i.querySelector(".popup__form-field_place_name"),b=i.querySelector(".popup__form-field_place_link"),q=e.querySelector(".elements__photo-grid"),k=document.querySelector("#card").content,C=o.querySelector(".popup__image"),E=o.querySelector(".popup__caption"),L={formSelector:".popup__form",inputSelector:".popup__form-field",submitButtonSelector:".popup__form-button",inactiveButtonClass:"popup__form-button_disabled",inputErrorClass:"popup__form-field_error_active",errorClass:"popup__form-error_active"};function g(e,t,r,o){var n=e.querySelector(".".concat(t.id,"_error"));t.classList.remove(r),n.classList.remove(o),n.textContent=""}function A(e,t,r,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?g(e,t,r,o):function(e,t,r,o,n){var c=e.querySelector(".".concat(t.id,"_error"));t.classList.add(o),c.textContent=r,c.classList.add(n)}(e,t,t.validationMessage,r,o)}function x(e,t,r){e.some((function(e){return!1===e.validity.valid}))?(t.setAttribute("disabled",!0),t.classList.add(r)):(t.removeAttribute("disabled"),t.classList.remove(r))}var j={baseUrl:"https://nomoreparties.co/v1/".concat("plus-cohort-27"),headers:{authorization:"".concat("3bba9d1b-7b3a-41e6-ab4e-3983a20dd76a"),"Content-Type":"application/json"}};function P(t){var r=e.querySelector(".popup_opened");"Escape"===t.key&&w(r),"click"===t.type&&t.target.classList.contains("popup_opened")&&w(r)}function B(e){m.style.backgroundImage="url("+e+")"}function z(e){var t=e.querySelector(L.formSelector);t.reset(),Array.from(t.querySelectorAll(L.inputSelector)).forEach((function(e){e.setCustomValidity(""),g(t,e,L.inputErrorClass,L.errorClass)}))}function U(e,t){t.querySelector(L.submitButtonSelector).textContent=e?"Сохранение...":"Сохранить"}function T(t){t.classList.add("popup_opened"),e.addEventListener("keydown",P),t.addEventListener("click",P)}function w(t){t.classList.remove("popup_opened"),e.removeEventListener("keydown",P),t.removeEventListener("click",P)}function D(e,t,r,n,a){var i=k.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__photo"),s=i.querySelector(".card__text"),l=i.querySelector(".card__trash"),d=i.querySelector(".card__like"),p=i.querySelector(".card__like-counter");return u.src=t,u.alt=e,u.setAttribute("user-id",a),s.textContent=e,p.textContent=r.length,l.setAttribute("user-id",n),r.length>0?r.forEach((function(e){e._id===_.getAttribute("user-id")&&d.classList.add("card__like_active")})):(p.classList.add("card__like-counter_hidden"),p.textContent=0),i.querySelector(".card__like").addEventListener("click",(function(e){!function(e,t,r){t.classList.contains("card__like_active")?function(e,t,r){return fetch("".concat(j.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:j.headers.authorization}}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){t.classList.remove("card__like_active")})).then((function(e){r.textContent=parseInt(r.textContent)-1,"0"===r.textContent&&r.classList.add("card__like-counter_hidden")})).catch((function(e){console.log(e)})):function(e,t,r){return fetch("".concat(j.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:j.headers.authorization}}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){t.classList.add("card__like_active")})).then((function(e){r.textContent=parseInt(r.textContent)+1,r.classList.remove("card__like-counter_hidden")})).catch((function(e){console.log(e)}))}(u.getAttribute("user-id"),e.target,p)})),n!=_.getAttribute("user-id")?i.querySelector(".card__trash").classList.add("card__trash_hidden"):i.querySelector(".card__trash").addEventListener("click",(function(e){var t=e.target.closest("li");T(c),U(!1,c),f.addEventListener("click",(function(e){U(!0,c),function(e,t){return fetch("".concat(j.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:j.headers.authorization}}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(u.getAttribute("user-id")).then((function(e){w(c),t.remove()})).catch((function(e){console.log(e)}))}),{once:!0})})),u.addEventListener("click",(function(e){T(o),C.src=e.target.getAttribute("src"),C.alt=e.target.getAttribute("alt"),E.textContent=e.target.getAttribute("alt")})),i}s.addEventListener("click",(function(){return z(e=t),v.setAttribute("value",_.textContent),y.setAttribute("value",h.textContent),T(e),void x(Array.from(e.querySelectorAll(L.inputSelector)),e.querySelector(L.submitButtonSelector),L.inactiveButtonClass);var e})),l.addEventListener("click",(function(){z(r),T(r),x(Array.from(r.querySelectorAll(L.inputSelector)),r.querySelector(L.submitButtonSelector),L.inactiveButtonClass)})),d.addEventListener("click",(function(){z(n),T(n),x(Array.from(n.querySelectorAll(L.inputSelector)),n.querySelector(L.submitButtonSelector),L.inactiveButtonClass)})),a.addEventListener("submit",(function(e){e.preventDefault(),(U(!0,a),fetch("".concat(j.baseUrl,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:v.value,about:y.value})}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){_.textContent=v.value,h.textContent=y.value})).catch((function(e){console.log(e)})).finally((function(){U(!1,a)})),w(t)})),i.addEventListener("submit",(function(e){var t,o;e.preventDefault(),U(!0,i),(t=S.value,o=b.value,fetch("".concat(j.baseUrl,"/cards"),{method:"POST",headers:j.headers,body:JSON.stringify({name:t,link:o})}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=_.getAttribute("user-id"),r=D(e.name,e.link,0,t,e._id);q.prepend(r)})).catch((function(e){console.log(e)})).finally((function(){U(!1,i)})),w(r),i.reset()})),u.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__form-field_avatar_link").value;U(!0,u),function(e){return fetch("".concat(j.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:j.headers,body:JSON.stringify({avatar:e})}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).catch((function(e){console.log(e)})).finally((function(e){U(!1,u)})),B(t),w(n),u.reset()})),p.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(e){return w(t)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((function(n){n.addEventListener("input",(function(){A(e,n,t.inputErrorClass,t.errorClass),x(r,o,t.inactiveButtonClass)})),n.addEventListener("keydown",(function(c){"Enter"===c.key&&(A(e,n,t.inputErrorClass,t.errorClass),x(r,o,t.inactiveButtonClass))}))}))}(t,e)}))}(L);var N=[fetch("".concat(j.baseUrl,"/users/me"),{method:"GET",headers:{authorization:j.headers.authorization}}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(j.baseUrl,"/cards"),{method:"GET",headers:{authorization:j.headers.authorization}}).then((function(e){return!0===e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))];Promise.all(N).then((function(e){var t,r;return _.setAttribute("user-id",e[0]._id),t=e[0].name,r=e[0].about,_.textContent=t,h.textContent=r,B(e[0].avatar),e[1]})).then((function(e){e.forEach((function(e){var t=D(e.name,e.link,e.likes,e.owner._id,e._id);q.append(t)}))})).catch((function(e){console.log(e)}))})();