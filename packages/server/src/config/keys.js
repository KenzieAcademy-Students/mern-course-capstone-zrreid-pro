module.exports = {
  app: {
    name: "MERN App",
    apiEndpoint: (process.env.API_URL) ? `/${process.env.API_URL}` : '/api',
  },
  database: {
    url: process.env.MONGODB_URI || 'mongodb+srv://database-user:kenzie123@crimsoncoding.q97ys.mongodb.net/TaskMaster?retryWrites=true&w=majority', // for local mongodb ***put connection string here
    // url: "PUT-YOUR-MONGODB-CONNECTION-STRING-HERE" // for mongodb atlas, comment the above line, uncomment this line, and add your connection string.
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
