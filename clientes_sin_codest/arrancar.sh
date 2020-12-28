cd /home/admin/apps-sin-excel/clientes_sin_codest
pm2 start server.js --name server-clientes
pm2 start start_codest.sh --name cli-clientes
