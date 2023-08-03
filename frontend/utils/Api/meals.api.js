import axios from "axios";
import config from "../config";


const addmeals = async (body, token) => {
  const response = await axios.post(`${config.url}/api/foodmodule/adddishes`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const updatemeals = async (body, token) => {
  console.log(body);
  const response = await axios.post(`${config.url}/api/foodmodule/updatedishes`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const getresident = async (body) => {
  const response = await axios.post(`${config.url}/api/foodmodule/residents`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const getdishes = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/showdishes`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const getallmenus = async (body) => {
    
  const response = await axios.get(`${config.url}/api/foodmodule/showallmenus`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const getuserorders = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/showuserdishes`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const deletemenu = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/deletemenu`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const adduserdishes = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/adduserdishes`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const updateuserdishes = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/userupdateorder`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const allfoodorders = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/allordersbydate`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};
const Orderbyresanddate = async (body) => {
    
  const response = await axios.post(`${config.url}/api/foodmodule/dishescountbydateandres`, body, {
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  });
  return response.data;
};



const mealsApi = {
    addmeals,
    getresident,
  getdishes,
  getallmenus,
    getuserorders,
  deletemenu,
  updatemeals,
  adduserdishes,
   updateuserdishes ,
  allfoodorders,
   Orderbyresanddate,
};
export default mealsApi;
