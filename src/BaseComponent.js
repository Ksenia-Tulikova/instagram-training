export const TEMPLATES = {
  login: `<div class="login ">
            <form class="form validCredentials-{validCredentials}">
                <h2>
                    <span class="form-login-invitation ">Hello</span>
                    <span class="form-login-error">Login or password is invalid</span>
                </h2>
                <div class="form-field">
                    <label for="login-mail"><i class="fas fa-user"></i></label>
                    <input id="login-mail" type="text" name="login" placeholder="E-Mail" value="{login.value}">
                </div>
                <div class="form-field">
                    <label for="login-password"><i class="fas fa-lock"></i></label>
                    <input id="login-password" type="password" name="password" placeholder="Password" value="{password.value}">
                </div>
                <button type="submit" class="button button-sign-in">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN IN</p>
                </button>
                <button type="submit"  class="button button-sign-up">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN UP</p>
                </button>
            </form>
        </div>`,
  signUp: `<div class="sign-up">
            <form class="form">
                <h2>Sign Up right now!</h2>
                <div class="form-field">
                    <label for="sign-up-mail"><i class="fas fa-user"></i></label>
                    <input id="sign-up-mail" type="text" name="login" placeholder="E-Mail" value="{login.value}">
                    <span class="error-message login-error-message">{login.errorMessage}</span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password" type="password" name="password" placeholder="Password" value="{password.value}">
                    <span class="error-message password-error-message" >{password.errorMessage}</span>
                </div>
                <div class="form-field">
                    <label for="sign-up-password-repeat"><i class="fas fa-lock"></i></label>
                    <input id="sign-up-password-repeat" type="password" name="repeat-password" placeholder="Repeat password" value="{repeatPassword.value}">
                    <span class="error-message repeatPassword-error-message">{repeatPassword.errorMessage}</span>
                </div>
                <button type="submit" class="button button-sign-up">
                    <div class="arrow-wrapper">
                        <span class="arrow"></span>
                    </div>
                    <p class="button-text">SIGN UP</p>
                </button>
            </form>
        </div>`,
  home: `<div class="home active">
            <div class="finished ">
                <img
                    class="finished-icon"
                    src="https://i.pinimg.com/originals/58/29/20/58292072e708fc2b709a741b0bc14b84.gif"
                    alt="Tick Tick Verified Sticker - Tick Tick Verified Circle Stickers"
                >
            </div>
        </div>`,
  usersTable: `<div class="users-table ">
    <div class="users-table-form">
        <h2>
            <span>Users</span>
        </h2>
        {users}
    </div>
</div>
                 <div class="delete-profile ">
                 <div class="form">
        <h2>
            <span class="delete-profile-invitation ">Are you sure?</span>
        </h2>
        <div class="delete-profile-actions">
            <button type="button" class="button button-delete">
                <div class="arrow-wrapper">
                    <span class="arrow"></span>
                </div>
                <p class="button-text">YES</p>
            </button>
            <button type="button" class="button button-cancel">
                <div class="arrow-wrapper">
                    <span class="arrow"></span>
                </div>
                <p class="button-text">NO</p>
            </button>
        </div>
    </div>
               </div>`,
  usersTableRow: `<div class="users-table-row">
                    <div class="user-login">
                        <span>{login}</span>
                    </div>
                    <div class="edit-user-actions"  data-user-id="{login}">
                        <button type="button" class="button button-edit-user">
                            <div class="arrow-wrapper">
                                <span class="arrow"></span>
                            </div>
                            <p class="button-text">Edit</p>
                        </button>
                        <button type="button" class="button button-delete-user">
                            <div class="arrow-wrapper">
                                <span class="arrow"></span>
                            </div>
                            <p class="button-text">Delete</p>
                        </button>
                    </div>
                </div>`,
  editUser: `<div class="edit-profile ">
            <div class="form">
                <h2>
                    <span class="edit-profile-invitation ">Edit {login} Profile</span>
                    <div class="photo">
                  <label for="photo-upload" class="custom-file-upload fas">
                      <div class="img-wrap img-upload">
<!--                          <img for="photo-upload" src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true">-->
                          <img for="photo-upload" src="{avatarSrc}">
                      </div>
                      <input id="photo-upload" type="file">
                  </label>
                </div>
                </h2>
                
                <div class="form-field user-male">
                    <div class="male_radio_btn">
                        <input id="man" type="radio" name="male" value="man" {male.man}>
                        <label for="man">Man</label>
                      </div>
                       
                      <div class="male_radio_btn">
                        <input id="woman" type="radio" name="male" value="woman" {male.woman}>
                        <label for="woman">Woman</label>
                    </div>
                </div>
                    
                <div class="form-field">
                    <label for="dateOfBirth">Date of birth:</label>

                    <input type="date" id="dateOfBirth" name="trip-start"
                           value="{dateOfBirth}"
                           min="1920-01-01" max="2050-12-31">
                </div>
                <div class="form-field">
                    <label for="tel">Phone number:</label>
                    <input type="tel" id="tel" name="tel" value="{tel}">
                </div>
                <div class="form-field">
                    <select size="1" class="country-selector">
                    <option value="" disabled selected>Choose your country:</option>
                        {options}
                    </select>
                </div>
                <div class="edit-profile-actions">
                    <button type="button" class="button button-save">
                        <div class="arrow-wrapper">
                            <span class="arrow"></span>
                        </div>
                        <p class="button-text">SAVE</p>
                    </button>
                    <button type="button" class="button button-close">
                        <div class="arrow-wrapper">
                            <span class="arrow"></span>
                        </div>
                        <p class="button-text">CLOSE</p>
                    </button>
                </div>
            </div>
        </div>`,
  option: `<option value="{country}" {optionSelected}>{country}</option>`,
  aboutUs: `<h2>
            <span>{greeting}</span>
        </h2>`
};

export class BaseComponent {
  constructor ($formInsertPlace, htmlTemplate, handlers) {
    this.place = $formInsertPlace;
    this.handlers = handlers;
    this.htmlTemplate = htmlTemplate;
  }

  updateEventListeners () {
    if (this.handlers) {
      for (const handler in this.handlers) {
        const handlerData = this.handlers[handler];
        this.place.querySelectorAll(handlerData.queryParam).forEach(element => {
          element.addEventListener(handlerData.eventType, (event) => {
            handlerData.callback(event);
          });
        });
      }
    }
  }

  get (state, path) {

    let pathSplited = path.split('.');

    let result = state;
    for (const fieldName of pathSplited) {
      result = result[fieldName];
    }

    return result;
  }

  render (state) {

    let htmlToRender = this.htmlTemplate;
    let paths = new Set(htmlToRender.match(/(?<={)(.+?)(?=})/g));

    if (paths) {
      paths.forEach((path) => {
        htmlToRender = htmlToRender.replaceAll(`{${path}}`, this.get(state, path));
      });
    }

    return htmlToRender;
    // this.place.innerHTML = htmlToRender;
    // this.updateEventListeners();
  }
}