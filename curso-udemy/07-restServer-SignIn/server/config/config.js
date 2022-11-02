//En caso de que el puerto no exista se va a levantar en el 
//puerto 3000

//====================================
// Puerto
//====================================

process.env.PORT = process.env.PORT || 3000;



//====================================
// Vencimiento del Token
//====================================
//60s 60m 24h 30d
process.env.CADUCIDAD_TOKEN = 60*60*24*30;


//====================================
// SEED de autenticación
//====================================
process.env.SEED=process.env.SEED || 'este-es-el-seed-desarrollo';

//====================================
// Google Client ID
//====================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '982646333612-kpmuov4suemonu2e3c9a137o3npkh3qq.apps.googleusercontent.com';