const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

/**
 * Função para enviar notificações por e-mail
 * @param {string} email 
 * @param {string} subject 
 * @param {string} text 
 * @returns {Promise}
 */
const enviarNotificacao = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error; // Re-throw para que a rota possa lidar com o erro
  }
};

module.exports = enviarNotificacao;