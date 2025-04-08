const getEmailTemplate = (booking) => {
  const servicesText = Array.isArray(booking.services) 
    ? booking.services.join(', ')
    : booking.services;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #ec4899; text-align: center;">Booking Confirmation</h1>
      <p>Dear ${booking.name},</p>
      <p>Thank you for booking with Nails by Anam. Your appointment details are:</p>
      
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Services:</strong> ${servicesText}</p>
      </div>

      <p>If you need to make any changes, please contact us at:</p>
      <p>Phone: (123) 456-7890</p>
      <p>Email: contact@nailsbyanam.com</p>
      
      <div style="text-align: center; margin-top: 30px; color: #666;">
        <p>We look forward to seeing you!</p>
        <p>- Nails by Anam Team</p>
      </div>
    </div>
  `;
};

export default getEmailTemplate;
