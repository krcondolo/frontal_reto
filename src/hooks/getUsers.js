import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';

export const getUsers = async () => {

    try {
        const { data } = await challengueApi.get('auth/getUsers', {});
        console.log(data.users)
        return data.users
    } catch (error) {
        console.log('Hubo un error al cargar los usuarios')
    }
}