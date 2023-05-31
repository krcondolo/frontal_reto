import { useEffect, useState } from "react";
import { getUsers } from "../../hooks/getUsers"
import { ChallengueLayout } from "../layout/ChallengueLayout";
import MUIDataTable from "mui-datatables";

export const UsersAdmin = () => {
    const [data, setData] = useState([]);
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

    ];

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <>
            <ChallengueLayout>
            <MUIDataTable
                            title={"Sistemas"}
                            data={data.map(dat => {
                                return [
                                    dat._id,
                                    dat.name,
                                    dat.email,
                                    dat.password
                                ]
                            })}
                            columns={columns}
                            options={options}
                        />

            </ChallengueLayout>
        </>
    )
}
