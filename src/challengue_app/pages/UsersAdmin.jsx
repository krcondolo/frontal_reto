import { useEffect, useState } from "react";
import { getUsers } from "../../hooks/getUsers"
import { ChallengueLayout } from "../layout/ChallengueLayout";
import MUIDataTable from "mui-datatables";
import { usersCrud } from "../../hooks/usersCrud";
import Swal from "sweetalert2";

export const UsersAdmin = () => {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(false);
    const loadUser = async () => {
        const res = await getUsers();
        setData(res);
    }
    const options = {
        filterType: 'checkbox',
        selectableRows: 'multiple',
        responsive: 'vertical',
    };
    const columns = [
        {
            name: "Id", label: "id", options: { filter: true, sort: true, display: false }
        },
        {
            name: "Name", label: "Name", options: { filter: true, sort: true, }
        },
        {
            name: "Email", label: "Email", options: { filter: true, sort: true, }
        },
        {
            name: "Password", label: "Password", options: { filter: true, sort: true, }
        },
        {
            name: "Tipo de usuario", label: "Tipo", options: { filter: true, sort: true, }
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const userId = tableMeta.rowData[0];
                    return (
                        <button onClick={() => handleDeleteUser(userId)} style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        > Delete</button>
                    );
                },
            },
        },
    ];

    const handleDeleteUser = async(userId) => {
        const res = await usersCrud({ id_operacion: 2, userId: userId, name: '', email: '', password: '', user_type: '' })
        console.log(res)
        if (res === true) {
            Swal.fire('Éxito', 'El usuario fue eliminado', 'success')
            setChange(!change)
        }
    };
    useEffect(() => {
        loadUser()
    }, [change])

    return (
        <>
            <ChallengueLayout>
                <MUIDataTable
                    title={"Usuarios"}
                    data={data.map(dat => {
                        return [
                            dat._id,
                            dat.name,
                            dat.email,
                            dat.password,
                            dat.user_type
                        ]
                    })}
                    columns={columns}
                    options={options}
                />

            </ChallengueLayout>
        </>
    )
}
