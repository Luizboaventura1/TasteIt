const QUERY_KEYS = {
  USER_RECIPES: (id: string) => `user-recipes-${id}`,
  RECIPE: (id: string) => `recipe-${id}`,
  AUTH: "auth",
  PROFILE: (id: string) => `profile-${id}`,
};

export default QUERY_KEYS;
