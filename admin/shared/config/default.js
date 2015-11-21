export default {
  server: {
    ip: '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
  },

  session: {
    secret: 'manymanyyearsago',
    maxAge: 86400000,
  },
};
