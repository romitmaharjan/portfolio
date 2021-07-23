exports.PORT = process.env.PORT || 3000;

exports.CLIENT_ORIGIN = 
    process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3001'

exports.DB_URL = 
    process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : process.env.mongodbUrl

