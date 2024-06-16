module.exports = {

  apps: [

    {

      name: 'chequeHandover-app',

      script: 'node_modules/next/dist/bin/next',

      args: 'start',

      instances: 1,

      autorestart: true,

      watch: false,

      max_memory_restart: '4G',

      env: {

        NODE_ENV: 'production',

<<<<<<< HEAD
        PORT: 6000
=======
        PORT: 5500
>>>>>>> 0c5e75e2a916350a505d1c9727ea417d0d3a48f4

      },

    },

  ],
};
