import rateLimit from "express-rate-limit";

// Permite el limitar los inicios de sesion de una IP
// Prevencion de Fuerza Bruta
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
    standardHeaders: true, // Devuelve información de límite en los encabezados `RateLimit-*`
    legacyHeaders: false, // Desactiva los encabezados `X-RateLimit-*`
});