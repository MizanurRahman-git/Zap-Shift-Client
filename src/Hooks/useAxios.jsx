import axios from 'axios';
import React from 'react';


const axiosIntance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
    return axiosIntance;
};

export default useAxios;