import pool from "../../../../database.js"


export const InsertLogout = async (username, fullname, password, orderLogout) => {
    // Insertar la orden
    const generateOrder = await pool.query("INSERT INTO user (username, fullname, password) VALUES (?, ?, ?)", [username, fullname, password]);
    const idOrder = generateOrder.insertId;

    // Preparar datos para la inserción múltiple
    const orderLogoutWithUser = orderLogout.map((data) => [data.fullname, username, data.password, idOrder]);

    // Insertar los smartphones asociados a la orden
    const sqlInsertOrderLogout = "INSERT INTO user (username, fullname, password) VALUES ?";
    await pool.query(sqlInsertOrderLogout, [orderLogoutWithUser]);
};
