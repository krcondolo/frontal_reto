import React, { useEffect, useState } from "react";
import { ChallengueLayout } from '../layout/ChallengueLayout';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { getUsers } from "../../hooks/getUsers";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { format, addDays } from 'date-fns';

const registerFormFields = {
    registeruserId: '',
    registerstartDate: '',
    registerendDate: '',
    registerdescription: '',
};

export const Movimientos = () => {
    const [data, setData] = useState([]);
    const { registeruserId, registerstartDate, registerendDate, registerdescription, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    const { startRegisterMov } = useAuthStore();
    const loadUser = async () => {
        const res = await getUsers();
        setData(res);
    };

    const registerSubmit = (event) => {
        event.preventDefault();
        startRegisterMov({
            userId: registeruserId,
            startDate: registerstartDate,
            endDate: registerendDate,
            description: registerdescription,
        });
        resetForm();
    };

    const resetForm = () => {
        onRegisterInputChange({
            target: {
                name: 'registeruserId',
                value: '',
            },
        });
        onRegisterInputChange({
            target: {
                name: 'registerstartDate',
                value: '',
            },
        });
        onRegisterInputChange({
            target: {
                name: 'registerendDate',
                value: '',
            },
        });
        onRegisterInputChange({
            target: {
                name: 'registerdescription',
                value: '',
            },
        });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const formatDate = (date) => {
        return format(date, 'dd-MM-yyyy');
    };

    const generateDates = () => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 10; i++) {
            const date = addDays(today, i);
            const formattedDate = formatDate(date);
            dates.push(formattedDate);
        }

        return dates;
    };

    return (
        <>
            <ChallengueLayout>
                <div className="col-md-6 login-form-2">
                    <h3>Registro de movimiento</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Usuario a asignar movimiento</InputLabel>
                                <Select
                                    value={registeruserId}
                                    onChange={onRegisterInputChange}
                                    name="registeruserId"
                                    sx={{ backgroundColor: 'white' }}
                                >
                                    {data.map((user) => (
                                        <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-group mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Fecha inicio</InputLabel>
                                <Select
                                    sx={{ backgroundColor: 'white' }}
                                    value={registerstartDate}
                                    onChange={onRegisterInputChange}
                                    name="registerstartDate"
                                >
                                    {generateDates().map((date) => (
                                        <MenuItem key={date} value={date}>{date}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-group mb-2">
                            <FormControl fullWidth>
                                <InputLabel>Fecha fin</InputLabel>
                                <Select
                                    sx={{ backgroundColor: 'white' }}
                                    value={registerendDate}
                                    onChange={onRegisterInputChange}
                                    name="registerendDate"
                                >
                                    {generateDates().map((date) => (
                                        <MenuItem key={date} value={date}>{date}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción del movimiento"
                                name="registerdescription"
                                value={registerdescription}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear movimiento"
                            />
                        </div>
                    </form>
                </div>
            </ChallengueLayout>
        </>
    );
};