"use strict";

function ExtractJwt (req) {
    let token = null;
    if (req.cookie && req.cookies.token != void(0)) token = req.cookies('token');
    return token;
}

module.exports = {
    jwt: {
        jwtFromRequest: ExtractJwt,
        secretOrKey: 'rCSVbzHGct9sZuBsRV8SHAA'
    },
    expiresIn: '1 day'
};

