import { existLogoutId } from "../logout/logout.services.js";

const ExistLogoutMiddleware = async (req, res, next) => {
    const data = req.body;
    let exisUser = false;
    for (const { username } of data.orderLogout) {
        exisUser = await existLogoutId(username);
        if (!exisUser) {
            console.log(exisUser, username);

            break;
        }
    }
    if (exisUser) {
        next()
    } else {
        return res.status(400).send({ message: "El usuario no existe no existente" })
    }
}
export default ExistLogoutMiddleware;