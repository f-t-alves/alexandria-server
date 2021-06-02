const prod = {
    url: {
        FRONT_URL: "https://alexandria-front.netlify.app"
    }
};
const dev = {
    url: {
        FRONT_URL: 'http://localhost:3001'
    }
};
console.log('ENV: ', process.env.NODE_ENV)
const config = process.env.NODE_ENV === 'development' ? dev : prod;
module.exports = config;