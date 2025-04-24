const getEmailTemplate = (booking) => {
  let servicesSection = '';
  let importantInfoSection = '';
  
  if (booking.serviceType === 'nail-appointment') {
    // Safely handle services list
    let servicesList = '';
    if (booking.serviceName) {
      const services = Array.isArray(booking.serviceName) 
        ? booking.serviceName 
        : booking.serviceName.split(', ').filter(Boolean);
      
      servicesList = services.map(service => 
        `<li style="margin-bottom: 5px;">${service}</li>`
      ).join('');
    }

    servicesSection = `
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Appointment Details:</strong></p>
        <p><strong>Date:</strong> ${booking.date || 'To be confirmed'}</p>
        <p><strong>Time:</strong> ${booking.time || 'To be confirmed'}</p>
        <p><strong>Location:</strong> ${booking.location === 'waterloo' ? 'Waterloo' : 'Markham'}</p>
        ${servicesList ? `
          <div style="margin: 10px 0;">
            <p><strong>Selected Services:</strong></p>
            <ul style="list-style-type: none; padding-left: 0; margin: 5px 0;">
              ${servicesList}
            </ul>
          </div>
        ` : ''}
        ${booking.duration ? `<p><strong>Total Duration:</strong> ${booking.duration} minutes</p>` : ''}
        ${booking.totalPrice ? `<p><strong>Total Price:</strong> $${booking.totalPrice}</p>` : ''}
        ${booking.notes ? `<p><strong>Additional Notes:</strong> ${booking.notes}</p>` : ''}
      </div>
    `;

    importantInfoSection = `
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #ec4899; margin-top: 0;">Important Information</h3>
        <p>• Please arrive 5-10 minutes before your scheduled time</p>
        <p>• Remove any existing nail polish before your appointment</p>
        <p>• 24 hours notice is required for cancellations</p>
        <p>• Late arrivals may result in shortened service time</p>
        <p>• Please inform us of any allergies or sensitivities</p>
      </div>
    `;
  } else if (booking.serviceType === 'press-ons') {
    servicesSection = `
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Order Details:</strong></p>
        <p><strong>Type:</strong> Custom Press-on Nails</p>
        <p><strong>Location:</strong> ${booking.location === 'waterloo' ? 'Waterloo' : 'Markham'}</p>
        ${booking.previouslySized ? 
          '<p><strong>Status:</strong> Using Previous Sizing</p>' : 
          '<p><strong>Status:</strong> New Sizing Provided</p>'}
        ${booking.notes ? `<p><strong>Design Notes:</strong> ${booking.notes}</p>` : ''}
      </div>
    `;

    importantInfoSection = `
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #ec4899; margin-top: 0;">Next Steps</h3>
        <p>• We will review your order and sizing within 1-2 business days</p>
        <p>• You will receive a follow-up email with design options and pricing</p>
        <p>• Once approved, production takes 5-7 business days</p>
        <p>• We will contact you to arrange pickup/delivery when your press-ons are ready</p>
        <p>• A deposit may be required to begin production</p>
      </div>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #ec4899; text-align: center;">
        ${booking.serviceType === 'nail-appointment' ? 'Appointment Confirmation' : 'Press-ons Order Confirmation'}
      </h1>
      <p>Dear ${booking.name},</p>
      <p>Thank you for choosing Nails by Anam. ${
        booking.serviceType === 'nail-appointment' 
          ? 'Here are your appointment details:'
          : 'We are excited to create your custom press-on nails!'
      }</p>
      
      ${servicesSection}
      ${importantInfoSection}

      <p>If you need to make any changes, please contact us at:</p>
      <p>Phone: (123) 456-7890</p>
      <p>Email: contact@nailsbyanam.com</p>
      
      <div style="text-align: center; margin-top: 30px; color: #666;">
        <p>We look forward to ${booking.serviceType === 'nail-appointment' ? 'seeing' : 'serving'} you!</p>
        <p>- Nails by Anam Team</p>
      </div>
    </div>
  `;
};

export default getEmailTemplate;
