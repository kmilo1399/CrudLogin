import pool from "../../../../database.js"

/**
 * 
 * @param {number} idUser
 * @param {"OK" | "CANCEL"} orderStatus 
 * @param {{quantity: string, smartphone_id: number}[]} orderSmartphone
 * @returns {Promise<void>} 
 */

export const InsertOrderBuy = async (idUser, orderStatus, orderSmartphone) => {
    // Insertar la orden
    const generateOrder = await pool.query("INSERT INTO orderStore (user_id, order_status) VALUES (?, ?)", [idUser, orderStatus]);
    const idOrder = generateOrder.insertId;

    // Preparar datos para la inserción múltiple
    const orderSmartphoneWithUser = orderSmartphone.map((data) => [data.quantity, idUser, data.smartphone_id, idOrder]);

    // Insertar los smartphones asociados a la orden
    const sqlInsertOrderSmartphone = "INSERT INTO orderSmartphone (quantity, user_id, smartphone_id, order_id) VALUES ?";
    await pool.query(sqlInsertOrderSmartphone, [orderSmartphoneWithUser]);
};


/**
 * 
 * @param {{limit:number, page:number}} paginations?
 */

export const getOrderBuy = async (limit = 10, page = 0) => {
    const calculateOffset = limit * page
    const getFindOrder = await pool.query("SELECT a.id, a.user_id, b.nombre, b.serie, b.precio, a.order_id  from orderSmartphone as a LEFT JOIN smartphone as b ON a.smartphone_id = b.id LIMIT ? OFFSET ?", [+limit, +calculateOffset]);

    return getFindOrder
}


/**
 * 
 * @param {number} idUser
 * @param {{limit:number, page:number}} paginations
 */

export const getOrderBuyForUser = async (idUser, limit = 10, page = 0) => {
    const calculateOffset = limit * page
    const getFindOrder = await pool.query("SELECT a.id, a.user_id, b.nombre, b.serie, b.precio, a.order_id  from orderSmartphone as a LEFT JOIN smartphone as b ON a.smartphone_id = b.id WHERE a.user_id = ? LIMIT ? OFFSET ?", [+idUser, +limit, +calculateOffset]);
    return getFindOrder
}

/**
 * 
 * @param {number} idUser
 * @param {number} order
 * @param {{limit:number, page:number}} paginations
 */

export const getOrderBuyForUserAndOrder = async (idUser, order) => {
    const getFindOrder = await pool.query("SELECT a.id, a.user_id, b.nombre, b.serie, b.precio, a.order_id  from orderSmartphone as a LEFT JOIN smartphone as b ON a.smartphone_id = b.id WHERE a.user_id = ? and a.order_id = ?", [+idUser, +order]);
    return getFindOrder
}                                                                                            