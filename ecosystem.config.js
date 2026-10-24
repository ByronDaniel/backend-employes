export const apps = [{
  name: "mi-node-app",
  script: "./index.js",
  instances: "max", // Modo Cluster: usa todos los núcleos de la CPU
  exec_mode: "cluster",
  // Producción: Variables de entorno protegidas
  env: {
    NODE_ENV: "production",
    PORT: 3000,
    JWT_SECRET: "UnAHeXAdEcImAL_o_FrAsE_UlTrA_SeCrEtA_Y_LaRgA_2026",
    MONGO_URI: "mongodb+srv://byrondanipm_db_user:mL1yknvwofC1vnwU@cluster0.qmugnvh.mongodb.net/usuarios_db?retryWrites=true&w=majority"
  },
  // Logs y Monitoreo del Servidor
  error_file: "/var/www/tu-app/logs/err.log",
  out_file: "/var/www/tu-app/logs/out.log",
  log_date_format: "YYYY-MM-DD HH:mm:ss Z",
  merge_logs: true
}];

export const deploy = {
  production: {
    user: 'ubuntu',
    host: '52.70.140.42',
    ref: 'origin/main',
    repo: 'git@github.com:ByronDaniel/backend-employes.git',
    path: '/var/www/tu-app',
    'post-deploy': 'mkdir -p logs && npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save',
    ssh_options: "IdentityFile=/Users/byrondelgado/Downloads/mi-servidor-web-key.pem" // Ruta a tu llave .pem local
  }
};

export default { apps, deploy };
