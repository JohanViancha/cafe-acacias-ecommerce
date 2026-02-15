module.exports = ({ env }) => ({
  email: {
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        secure: true,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_DEFAULT_FROM"),
        defaultReplyTo: env("SMTP_DEFAULT_REPLY_TO"),
      },
    },
  },
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
