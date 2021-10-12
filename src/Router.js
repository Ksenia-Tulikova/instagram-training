import { pageResolver, serviceHistory, serviceLocation } from './app';

export class Router {
  constructor () {
    this.routes = {
      '/signUp': () => pageResolver.goTo(pageResolver.pageMapping.signUp.name),
      '/users': () => pageResolver.goTo(pageResolver.pageMapping.usersTable.name),
      '/user': (params) => pageResolver.goTo(pageResolver.pageMapping.editUser.name, params),
      '/aboutUs': () => pageResolver.goTo(pageResolver.pageMapping.aboutUs.name),
      '/images': () => pageResolver.goTo(pageResolver.pageMapping.images.name),
      '/': () => pageResolver.goTo(pageResolver.pageMapping.login.name),
    };

  }

  changeRoute (path) {
    serviceHistory.update(path);

    const routeConfig = serviceLocation.getRouteConfig();

    this.routes[routeConfig.path](routeConfig.params);

    serviceHistory.stepBack(() =>this.routes[location.pathname](routeConfig.params));
  }

}

