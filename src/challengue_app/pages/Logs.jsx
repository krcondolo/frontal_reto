import { useState } from "react";
import { getLogs } from "../../hooks/getLogs";
import { useEffect } from "react";
import { ChallengueLayout } from "../layout/ChallengueLayout";
import MUIDataTable from "mui-datatables";

export const Logs = () => {
    const [data, setData] = useState([]);
    const loadLogs = async () => {
        const res = await getLogs();
        setData(res);
    }

    const options = {
        filterType: "checkbox",
        selectableRows: "multiple",
        responsive: "vertical",
    };

    const columns = [
        {
            name: "Id",
            label: "id",
            options: { filter: true, sort: true },
        },
        {
            name: "Acción",
            label: "Acción",
            options: { filter: true, sort: true },
        },
        {
            name: "Usuario",
            label: "Usuario",
            options: { filter: true, sort: true },
        },
        {
            name: "Fecha",
            label: "Fecha",
            options: { filter: true, sort: true },
        },
    ];

    useEffect(() => {
        loadLogs();
    }, [])

    return (
        <>
            <ChallengueLayout>
                <MUIDataTable
                    title={"Logs del sistema"}
                    data={data.map((dat) => [
                        dat._id,
                        dat.action,
                        dat.userId,
                        dat.tiemestamp,
                    ])}
                    columns={columns}
                    options={options}
                />

            </ChallengueLayout>
        </>
    )
}
