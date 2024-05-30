const jwt = require("jsonwebtoken");

const generateJWT = (id = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "4h" },
            (error, token) => {
                if (error) {
                console.error(error); // Cambié "console.log" a "console.error" para errores
                reject(error);
                } else {
                console.log(token);
                resolve(token);
                }
            });
        });
};

module.exports = {
    generateJWT,
};
