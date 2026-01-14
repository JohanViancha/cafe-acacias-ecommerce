module.exports = () => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
      register: {
        allowedFields: ["firstName", "lastName"],
      },
    },
  },
});
