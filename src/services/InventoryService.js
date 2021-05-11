import http from "../http-common";

export const getAll = () => {
  console.log('get all')
  return http.get("/inventorys");
};

export const get = id => {
  console.log('get one', id)
  return http.get(`/inventorys/${id}`);
};

export const create = data => {
  return http.post("/inventorys", data);
};

export const update = (data) => {
  return http.put(`/inventorys/${data.baseball_card_id}`, data);
};

export const remove = (id, front_id, back_id) => {
  if(front_id === "") {
    front_id = 0
  }
  if(back_id === "") {
    back_id = 0
  }
  return http.delete(`/inventorys/${id}+${front_id}+${back_id}`);
};

export const removeAll = () => {
  return http.delete(`/inventorys`);
};