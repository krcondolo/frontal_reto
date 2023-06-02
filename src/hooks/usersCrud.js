import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';

export const usersCrud = async ({ id_operacion, userId, name, email, password, user_type }) => {
    try {
        if (id_operacion === 1) {
            const { data } = await challengueApi.post('auth/updateUser', { userId, name, email, password, user_type });
            console.log(data.ok)
            return data.ok
        }
        else
            if (id_operacion === 2) {
                const { data } = await challengueApi.post('auth/deleteUser', { userId });
                console.log(data.ok)
                return data.ok
            }

    } catch (error) {
        console.log('Hubo un error al cargar los usuarios')
    }
}