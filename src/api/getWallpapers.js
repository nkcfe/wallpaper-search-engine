import request from './request';

const BASE_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY,
};

const getWallpapers = async (paramObj) => {
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    console.log(params);
    const result = await request(`${BASE_URL}/?${params}`);
    return result;
};

export default getWallpapers;
