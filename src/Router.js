import { pageResolver, serviceHistory, serviceLocation } from './app';

export class Router {
  constructor () {
    this.routes = {
      '/signUp': () => pageResolver.goTo(pageResolver.pageMapping.signUp.name),
      '/users': () => pageResolver.goTo(pageResolver.pageMapping.usersTable.name),
      '/user': (params) => pageResolver.goTo(pageResolver.pageMapping.editUser.name, params),
      '/aboutUs': () => pageResolver.goTo(pageResolver.pageMapping.aboutUs.name),
      '/': () => pageResolver.goTo(pageResolver.pageMapping.login.name),
    };

  }

  changeRoute (path) {
    serviceHistory.update(path);

    const routeConfig = serviceLocation.getRouteConfig();

    this.routes[routeConfig.path](routeConfig.params);

    serviceHistory.stepBack(() =>this.routes[location.pathname](routeConfig.params));
  }



  // changeRoute (path) {
  //   const url = `${window.location.origin}${path}`;
  //   window.history.pushState({}, path, url);
  //
  //   const routePath = window.location.pathname;
  //   const params = this._getSearchParams();
  //
  //   console.log(params);
  //   console.log(routePath);
  //
  //   this.routes[routePath](params);
  //
  //   window.onpopstate = () => this.routes[routePath](params);
  //
  // }
  //
  // _getSearchParams() {
  //   const params = window
  //     .location
  //     .search
  //     .replace('?','')
  //     .split('&')
  //     .reduce((params,paramToSearch) =>{
  //         const [name, value] = paramToSearch.split('=');
  //         params[name] = value;
  //         return params;
  //       },
  //       {}
  //     );
  //   console.log(params);
  //
  //   return params;
  // }
}

