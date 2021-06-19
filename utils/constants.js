const prod = {
    url: {
        FRONT_URL_WHITELIST: [
            "https://alexandria-front.netlify.app"
        ]
    }
};
const dev = {
    url: {
        FRONT_URL_WHITELIST: [
            'http://localhost:3001',
            'https://hoppscotch.io'
        ]
    }
};
console.log('ENV: ', process.env.NODE_ENV)
const config = process.env.NODE_ENV === 'development' ? dev : prod;
module.exports = config;