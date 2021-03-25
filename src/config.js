module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: 'https://swole-mate-app.vercel.app/',
    DATABASE_URL:'postgresql://dunder_mifflin@localhost/swole-mate',
    TEST_DATABASE_URL:'postgresql://dunder_mifflin@localhost/swole-mate-test',
  }