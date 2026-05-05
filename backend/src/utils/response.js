// src/utils/response.js — Consistent API response format

export const ok = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data })

export const created = (res, data, message = 'Created') =>
  ok(res, data, message, 201)

export const error = (res, message = 'Something went wrong', statusCode = 500, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) })

export const notFound = (res, message = 'Not found') =>
  error(res, message, 404)

export const unauthorized = (res, message = 'Unauthorized') =>
  error(res, message, 401)

export const forbidden = (res, message = 'Forbidden') =>
  error(res, message, 403)

export const badRequest = (res, message = 'Bad request', errors = null) =>
  error(res, message, 400, errors)
