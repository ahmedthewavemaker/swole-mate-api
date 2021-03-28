module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
    CLIENT_ORIGIN: 'https://swole-mate-app.vercel.app/',
    DATABASE_URL:process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/swole-mate',
    TEST_DATABASE_URL:'postgresql://dunder_mifflin@localhost/swole-mate-test',
  }