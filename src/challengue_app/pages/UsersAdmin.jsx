import React, { useEffect, useState } from "react";
import { getUsers } from "../../hooks/getUsers";
import { ChallengueLayout } from "../layout/ChallengueLayout";
import MUIDataTable from "mui-datatables";
import { usersCrud } from "../../hooks/usersCrud";
import Swal from "sweetalert2";
import "./UsersAdmin.css";

export const UsersAdmin = () => {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(false);
    const [editableUser, setEditableUser] = useState(null); // Estado para rastrear el usuario editable
    const [showModal, setShowModal] = useState(false);

    const loadUser = async () => {
        const res = await getUsers();
        setData(res);
    };

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
            name: "Email",
            label: "Email",
            options: { filter: true, sort: true },
        },
        {
            name: "Password",
            label: "Password",
            options: { filter: true, sort: true },
        },
        {
            name: "Tipo de usuario",
            label: "Tipo",
            options: { filter: true, sort: true },
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const userId = tableMeta.rowData[0];
                    return (
                        <>
                            <button
                                onClick={() => handleEditUser(userId)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteUser(userId)}
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

    const handleEditUser = (userId) => {
        const user = data.find((user) => user._id === userId);
        setEditableUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = async (userId) => {
        const res = await usersCrud({
            id_operacion: 2,
            userId: userId,
            name: "",
            email: "",
            password: "",
            user_type: "",
        });
        console.log(res);
        if (res === true) {
            Swal.fire("Éxito", "El usuario fue eliminado", "success");
            setChange(!change);
        }
    };

    const handleSaveUserChanges = async (updatedUser) => {
        // Mostrar los datos editados en la consola
        console.log(updatedUser);
        const res = await usersCrud({
            id_operacion: 1,
            userId: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            user_type: updatedUser.user_type,
        });
        console.log(res);
        if (res === true) {
            Swal.fire("Éxito", "El usuario fue actualizado", "success");
            setChange(!change);
            setShowModal(false);
        }

    };


    useEffect(() => {
        loadUser();
    }, [change]);

    return (
        <>
            <ChallengueLayout>
                <MUIDataTable
                    title={"Usuarios"}
                    data={data.map((dat) => [
                        dat._id,
                        dat.name,
                        dat.email,
                        dat.password,
                        dat.user_type,
                    ])}
                    columns={columns}
                    options={options}
                />
            </ChallengueLayout>

            {showModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <h2 className="modal-title">Edit User</h2>
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
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-input"
                                        value={editableUser.email}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-input"
                                        value={editableUser.password}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user-type">Tipo de usuario:</label>
                                    <input
                                        type="text"
                                        id="user-type"
                                        className="form-input"
                                        value={editableUser.user_type}
                                        onChange={(e) =>
                                            setEditableUser({
                                                ...editableUser,
                                                user_type: e.target.value,
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
    );
};