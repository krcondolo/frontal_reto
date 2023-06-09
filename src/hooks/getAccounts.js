import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';

export const getAcc = async () => {

    try {
        const { data } = await challengueApi.post('accounts/getAcc', {});
        console.log(data.cuentas)
        return data.cuentas
    } catch (error) {
        console.log('Hubo un error al cargar los usuarios')
    }
}