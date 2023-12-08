export default () => ({
  server_port: parseInt(process.env.PORT, 10) || 3000,
});
