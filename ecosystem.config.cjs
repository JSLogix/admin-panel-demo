module.exports = {
  apps: [
    {
      name: "Admin panel demo",
      exec_mode: "cluster",
      instances: 2,
      port: 3101,
      script: ".output/server/index.mjs",
    },
  ],
};
