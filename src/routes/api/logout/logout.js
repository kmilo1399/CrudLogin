import pool from "../../../../database.js";

export const existLogoutId = async (username) => {
    const logoutUser = await pool.query("SELECT * from user where username = ?", [username]);
    return logoutUser.length > 0
}