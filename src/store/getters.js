const getters = {
  opened: state => state.app.opened,
  avatar: state => state.user.avatar,
  name: state => state.user.name
};

export default getters;
