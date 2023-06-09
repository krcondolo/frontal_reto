import { useDispatch, useSelector } from 'react-redux';

import challengueApi from '../api/challengueApi';
import { onChecking, onLogin, clearErrorMessage, onLogout } from '../store/auth/authSlice';
import Swal from 'sweetalert2';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await challengueApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid, user_type: data.user_type }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, name, user_type, english_level, con_tecn, link_cv }) => {
        try {
            const { data } = await challengueApi.post('/auth/new', { email, password, name, user_type, english_level, con_tecn, link_cv });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            Swal.fire('Éxito', 'El usuario fue creado con éxito', 'success');

            // dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            Swal.fire('Error en registro', error.response.data?.msg, 'error');
        }
    }
    const startRegisterAcc = async ({ name, client, respons_oper, cons_equ }) => {
        try {
            const { data } = await challengueApi.post('/accounts/newAcc', { name, client, respons_oper, cons_equ });
            Swal.fire('Éxito', 'La cuenta fue creada con éxito', 'success');

            // dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            Swal.fire('Error en registro', error.response.data?.msg, 'error');
        }
    }

    const startRegisterMov = async ({ userId, startDate, endDate, description }) => {
        try {
            const { data } = await challengueApi.post('/accounts/addMovement', { userId, startDate, endDate, description });
            Swal.fire('Éxito', 'El movimiento fue creado con éxito', 'success');

            // dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            Swal.fire('Error en registro', error.response.data?.msg, 'error');
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await challengueApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
        startRegisterAcc,
        startRegisterMov
    }

}