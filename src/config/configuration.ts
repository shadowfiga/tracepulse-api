export default () => ({
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
});
