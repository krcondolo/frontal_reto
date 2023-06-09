import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';

export const accountCrud = async ({ id_operacion, accountId, name, client, respons_oper, cons_equ }) => {
    try {
        if (id_operacion === 1) {
            const { data } = await challengueApi.post('accounts/updAcc', { accountId, name, client, respons_oper, cons_equ });
            console.log(data.ok)
            return data.ok
        }
        else
            if (id_operacion === 2) {
                const { data } = await challengueApi.post('accounts/deleteAcc', { accountId });
                console.log(data.ok)
                return data.ok
            }

    } catch (error) {
        console.log('Hubo un error al cargar los usuarios')
    }
}