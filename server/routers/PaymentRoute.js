import express from 'express';
const PaymentRoute = express.Router();

// Mock payment route
PaymentRoute.post('/initiate', (req, res) => {
  const { upiId, amount } = req.body;
  if (!upiId || !amount) {
    return res.status(400).json({ success: false, message: 'Missing payment details' });
  }

  // Simulate payment process
  console.log(`Payment of Rs.${amount} initiated via UPI ID: ${upiId}`);
  res.status(200).json({ success: true, message: 'Payment successful!' });
});

export default PaymentRoute;
