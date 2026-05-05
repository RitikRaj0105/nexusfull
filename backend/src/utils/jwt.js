// src/utils/jwt.js — JWT sign & verify helpers
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'nexus_dev_secret'
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

export const signToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES })

export const verifyToken = (token) =>
  jwt.verify(token, SECRET)
