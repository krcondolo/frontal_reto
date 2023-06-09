import { ChallengueLayout } from "../layout/ChallengueLayout"
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
    registerUser_type: '',
    registerenglish_level: '',
    registercon_tecn: '',
    registerlink_cv: '',
}

export const RegisterUser = () => {
    const { registerEmail, registerName, registerPassword, registerPassword2, registerUser_type, registerenglish_level, registercon_tecn, registerlink_cv, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    const { startRegister } = useAuthStore();
    const registerSubmit = (event) => {
        if (registerPassword !== registerPassword2) {
            event.preventDefault();
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
        } else {
            event.preventDefault();
            startRegister({
                name: registerName, email: registerEmail, password: registerPassword, user_type: registerUser_type, english_level: registerenglish_level, con_tecn: registercon_tecn, link_cv: registerlink_cv
            });
            resetForm(); // Limpiar los campos del formulario

        }
    }
    const resetForm = () => {
        onRegisterInputChange({
            target: {
                name: 'registerName',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerEmail',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerPassword',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerPassword2',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerUser_type',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerenglish_level',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registercon_tecn',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerlink_cv',
                value: ''
            }
        });
    };
    return (
        <>
            <ChallengueLayout>
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Tipo de usuario</InputLabel>
                                <Select
                                    value={registerUser_type}
                                    onChange={onRegisterInputChange}
                                    name="registerUser_type"
                                    sx={{ backgroundColor: 'white' }}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="normal">Normal</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese el nivel de inglés"
                                name="registerenglish_level"
                                value={registerenglish_level}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese conocimientos técnicos"
                                name="registercon_tecn"
                                value={registercon_tecn}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese link de CV"
                                name="registerlink_cv"
                                value={registerlink_cv}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>

            </ChallengueLayout>
        </>
    )
}
