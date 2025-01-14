import BASE_URL from '../../config.js';

export const API = {
  USER_GET: `${BASE_URL}/user/userinfo/`,
  QUEST_LIST_GET: `${BASE_URL}/quest/list/`,
  RANK_GET: `${BASE_URL}/rank/list/`,
  FOOD_REGIST_POST: `${BASE_URL}/food/regist/`,
  USER_MODIFY_PATCH: `${BASE_URL}/user/userinfo/modify`,
  UPDATE_QUEST_POST: `${BASE_URL}/quest/record`,
  FOOD_SEARCH: `${BASE_URL}/food/search?word=`,
  FOOD_UPLOAD: `${BASE_URL}/food/upload`,
  FOOD_TODAYS_GET: `${BASE_URL}/food/todays/`,
  USER_USERINFO: `${BASE_URL}/user/userinfo/`,
};

export default API;
