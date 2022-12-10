// ***********
// controller/authorization.js

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURL = process.env.REDIRECT_URL;
const authorizationHost = process.env.AUTHORIZATION_HOST;
const userRedirectUrl = process.env.USER_REDIRECT_URL;
const authorizationURL = authorizationHost + "/authorize?response_type=code&client_id=" + clientID + "&redirect_uri=" + encodeURIComponent(redirectURL) + "&scope=openid%20profile%20email&state=1234";
const tokenURL = authorizationHost + "/oauth/token/";


const AuthorizationController = {
    login: (req, res) => {
        res.redirect(authorizationURL);
    },
    callback: async (req, res) => {
        const response = await fetch(tokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientID,
                client_secret: clientSecret,
                redirect_uri: redirectURL,
                scope: "openid profile email",
                code: req.query.code
            })
        });
        const jsonResponse = await response.json();
        const token = jsonResponse.access_token;
        const auth = "Bearer " + token;
        const responseCreateUser = await fetch(userRedirectUrl, {
            method: "POST",
            headers: {
                "Authorization": auth,
            }
        });
        // Access Token
        res.cookie("access_token", token, {
            httpOnly: true
        })
            .json(jsonResponse);
    }
}


module.exports = AuthorizationController;
