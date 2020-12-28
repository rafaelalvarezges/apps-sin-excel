cd /home/admin/apps-sin-excel/devoluciones_documentadas
pm2 start server.js --name server-devoluciones
pm2 start start_devoluciones.sh --name cli-devoluciones
