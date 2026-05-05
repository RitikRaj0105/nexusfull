// src/middleware/validate.js — Request validation using express-validator
import { validationResult } from 'express-validator'
import { badRequest } from '../utils/response.js'

// Run after validation rules — returns 400 if errors exist
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return badRequest(res, 'Validation failed', errors.array())
  }
  next()
}
