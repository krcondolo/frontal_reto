import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';

export const getLogs = async () => {

    try {
        const { data } = await challengueApi.post('accounts/getLogs', {});
        console.log(data.logs)
        return data.logs
    } catch (error) {
        console.log('Hubo un error al cargar los usuarios')
    }
}