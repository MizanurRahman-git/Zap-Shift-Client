import axios from 'axios';
import React from 'react';


const axiosIntance = axios.create({
  baseURL: "https://zap-shift-server-sigma-three.vercel.app",
});

const useAxios = () => {
    return axiosIntance;
};

export default useAxios;