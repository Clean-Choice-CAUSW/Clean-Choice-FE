import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://3.37.247.149:8080/api/v1/",
});

export default myAxios;
