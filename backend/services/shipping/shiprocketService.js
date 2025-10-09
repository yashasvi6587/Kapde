// backend/services/shipping/shiprocketService.js
import axios from 'axios';


const BASE = process.env.SHIPROCKET_BASE_URL; // make configurable
let tokenCache = { token: null, expiresAt: 0 };

// Authenticate (cache token)
async function auth() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60000) return tokenCache.token;
  const res = await axios.post(`${BASE}/auth/login`, {
    email: process.env.SHIPROCKET_EMAIL,
    password: process.env.SHIPROCKET_PASSWORD,
  });
  const token = res.data.token || res.data.data?.token; // adapt per API response
  // set expiry if provider returns one, else 23 min default
  tokenCache = { token, expiresAt: Date.now() + 20 * 60 * 1000 };
  return token;
}

// Create booking / order at provider
async function createOrder(orderPayload) {
  const token = await auth();
  const res = await axios.post(`${BASE}/orders/create/adhoc`, orderPayload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// Get tracking / status
async function getTracking(providerOrderId) {
  const token = await auth();
  const res = await axios.get(`${BASE}/orders/${providerOrderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export default { auth, createOrder, getTracking };
