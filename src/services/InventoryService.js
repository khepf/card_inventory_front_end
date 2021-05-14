import http from "../http-common";

export const getAll = (accountInfo) => {
  console.log('get all', accountInfo)
  return http.get(`/inventorys/${accountInfo.account_number}`);
};

export const get = (baseball_card_id, account_number) => {
  return http.get(`/inventorys/${account_number}/${baseball_card_id}`);
};

export const create = data => {
  return http.post("/inventorys", data);
};

export const update = (data, account_number) => {
  return http.put(`/inventorys/${account_number}/${data.baseball_card_id}`, data);
};

export const remove = (account_number, id, front_id, back_id) => {
  if(front_id === "") {
    front_id = 0
  }
  if(back_id === "") {
    back_id = 0
  }
  return http.delete(`/inventorys/${account_number}+${id}+${front_id}+${back_id}`);
};

export const removeAll = () => {
  return http.delete(`/inventorys`);
};

export const loginToServer = data => {
  // http.setRequestHeader('Content-type', 'Access-Control-Allow-Origin');
  return http.post("/login", data);
}

export const testRoute = data => {
  return http.post("/testroute", data)
}