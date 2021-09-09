export class ServiceLocation {
  constructor () {}

  getRouteConfig () {
    const location = window.location;
    const params = location
      .search
      .replace('?', '')
      .split('&')
      .reduce((params, paramToSearch) => {
          const [name, value] = paramToSearch.split('=');
          params[name] = value;
          return params;
        },
        {}
      );
    return { path: location.pathname, params };
  }
}