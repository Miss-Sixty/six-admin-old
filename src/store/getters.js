const getters = {
  opened: state => state.app.opened,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
};

export default getters;
