import React, { useEffect, useState } from "react";
import { ChallengueLayout } from "../layout/ChallengueLayout";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import "./UsersAdmin.css";
import { accountCrud } from "../../hooks/accountCrud";
import { getAcc } from "../../hooks/getAccounts";

export const CuentasAdmin = () => {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(false);
    const [editableUser, setEditableUser] = useState(null); // Estado para rastrear el usuario editable
    const [showModal, setShowModal] = useState(false);
    const options = {
        filterType: "checkbox",
        selectableRows: "multiple",
        responsive: "vertical",
    };
    const columns = [
        {
            name: "Id",
            label: "id",
            options: { filter: true, sort: true, display: false },
        },
        {
            name: "Name",
            label: "Name",
            options: { filter: true, sort: true },
        },
        {
            name: "Responsable Op.",
            label: "Responsable Op.",
            options: { filter: true, sort: true },
        },
        {
            name: "Consulta de equipo",
            label: "Consulta de equipo",
            options: { filter: true, sort: true },
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const accountId = tableMeta.rowData[0];
                    return (
                        <>
                            <button
                                onClick={() => handleEditUser(accountId)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteUser(accountId)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </>
                    );
                },
            },
        },
    ];
    const handleEditUser = (accountId) => {
        const account = data.find((account) => account._id === accountId);
        setEditableUser(account);
        setShowModal(true);
    };

    const handleDeleteUser = async (accountId) => {
        const res = await accountCrud({
            id_operacion: 2,
            accountId: accountId,
            name: "",
            client: "",
            respons_oper: "",
            cons_equ: "",
        });
        console.log(res);
        if (res === true) {
            Swal.fire("Éxito", "La cuenta fue eliminada", "success");
            setChange(!change);
        }
    };
    const loadAccounts = async () => {
        const res = await getAcc();
        setData(res);
    };
    const handleSaveUserChanges = async (updatedUser) => {
        // Mostrar los datos editados en la consola
        console.log(updatedUser);
        const res = await accountCrud({
            id_operacion: 1,
            accountId: updatedUser._id,
            name: updatedUser.name,
            client: updatedUser.client,
            respons_oper: updatedUser.respons_oper,
            cons_equ: updatedUser.cons_equ,
        });
        console.log(res);
        if (res === true) {
            Swal.fire("Éxito", "La cuenta fue actualizada", "success");
            setChange(!change);
            setShowModal(false);
        }

    };

    useEffect(() => {
        loadAccounts();
    }, [change]);

    return (
        <>
            <ChallengueLayout>
                <MUIDataTable
                    title={"cuentas"}
                    data={data.map((dat) => [
                        dat._id,
                        dat.name,
                        dat.client,
                        dat.respons_oper,
                        dat.cons_equ,
                    ])}
                    columns={columns}
                    options={options}
                />
            </ChallengueLayout>
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <h2 className="modal-title">Editar cuenta</h2>
                        {editableUser && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-input"
                                        value={editableUser.name}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="client">Cliente:</label>
                                    <input
                                        type="text"
                                        id="client"
                                        className="form-input"
                                        value={editableUser.client}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                client: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="respons_oper">Responsable Op:</label>
                                    <input
                                        type="text"
                                        id="respons_oper"
                                        className="form-input"
                                        value={editableUser.respons_oper}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                respons_oper: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cons_equ">Consulta de equipo:</label>
                                    <input
                                        type="text"
                                        id="cons_equ"
                                        className="form-input"
                                        value={editableUser.cons_equ}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                cons_equ: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="button-group">
                                    <button
                                        onClick={() => handleSaveUserChanges(editableUser)}
                                        className="save-button"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="cancel-button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
