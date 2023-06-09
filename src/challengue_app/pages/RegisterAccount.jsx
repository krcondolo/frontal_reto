import React from 'react'
import { ChallengueLayout } from '../layout/ChallengueLayout'
import { useForm } from '../../hooks/useForm'
import { useAuthStore } from '../../hooks/useAuthStore'
const registerFormFields = {
    registerName: '',
    registerClient: '',
    registerResponsOp: '',
    registerConsEqu: '',
}
export const RegisterAccount = () => {

    // "name","client","respons_oper","cons_equ"

    const { registerName, registerClient, registerResponsOp, registerConsEqu, onInputChange: onRegisterInputChange } = useForm(registerFormFields)
    const { startRegisterAcc } = useAuthStore();
    const registerSubmit = (event) => {
        event.preventDefault();
        startRegisterAcc({
            name: registerName, client: registerClient, respons_oper: registerResponsOp, cons_equ: registerConsEqu,
        });
        resetForm(); // Limpiar los campos del formulario
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
                name: 'registerClient',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerResponsOp',
                value: ''
            }
        });
        onRegisterInputChange({
            target: {
                name: 'registerConsEqu',
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
                                type="text"
                                className="form-control"
                                placeholder="Cliente"
                                name="registerClient"
                                value={registerClient}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Responsable oper"
                                name="registerResponsOp"
                                value={registerResponsOp}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Consulta equipo"
                                name="registerConsEqu"
                                value={registerConsEqu}
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
