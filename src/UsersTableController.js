import UsersTableComponent from './UsersTableComponent';
import { authManager, pageResolver, router } from './app';

export class UsersTableController {
  constructor (place) {
    this.place = place;
    this.state = {};
    this.handlers = {
      onEditUserClick: {
        queryParam: 'button.button-edit-user',
        eventType: 'click',
        callback: this._onEditUserClick.bind(this),
      },
      _onDeleteUserClick: {
        queryParam: 'button.button-delete-user',
        eventType: 'click',
        callback: this._onDeleteUserClick.bind(this),
      },
      _onPopUpClick: {
        queryParam: '.delete-profile-actions',
        eventType: 'click',
        callback: this._onPopUpClick.bind(this),
      },
    };
  }

  editProfile (userLogin) {
    router.changeRoute(`/user?login=${userLogin}`);
    // router.changeRoute('/user',{userId});


    // pageResolver.goTo(pageResolver.pageMapping.editUser.name, { userId });
  }

  deleteUserClicked (userId) {
    this.modifyState(state => state.activeUserId = userId);
    this.view.togglePopUp();
  }

  deleteUser () {
    authManager.deleteUser(this.state.activeUserId);
    pageResolver.goTo(pageResolver.pageMapping.usersTable.name);
  }

  closePopUp () {
    this.modifyState(state => state.activeUserId = '');
    this.view.togglePopUp();
  }

  connect () {
    this.state.users = Object.values(authManager.getUsers());

    this.view = new UsersTableComponent(this.place, this.handlers);
    this.view.render(this.state);
  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

  _onEditUserClick (event) {
    this.editProfile(event.target.closest('.edit-user-actions').dataset.userId);
  }

  _onDeleteUserClick (event) {
    this.deleteUserClicked(event.target.closest('.edit-user-actions').dataset.userId);
  }

  _onPopUpClick (event) {
    const closestParent = event.target.closest('button');

    if (closestParent.classList.contains('button-delete')) {
      this.deleteUser();
    } else {
      this.closePopUp();
    }
  }

}