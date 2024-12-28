import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Usa la URL de tu base de datos Neon
  ssl: { rejectUnauthorized: false } // Necesario para Neon
})

client.connect()

// Escuchar el canal de PostgreSQL
client.query('LISTEN turnos_channel')

// Evento para recibir notificaciones
client.on('notification', (msg) => {
  console.log('Cambio detectado:', msg.payload)
  // Aquí puedes procesar la notificación o enviarla a los clientes conectados
})

client.on('error', (err) => {
  console.error('Error en la conexión a PostgreSQL:', err)
})

export default client
