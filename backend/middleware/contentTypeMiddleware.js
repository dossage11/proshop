

import express from 'express';

const app = express();


// Add this middleware to handle missing content-type
export const contentTypeMiddleware = (req, res, next) => {
  if (
    req.method === 'POST' &&
    req.headers['content-type'] !== 'application/json'
  ) {
    let body = '';
    req.setEncoding('utf8');

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = {};
      }
      next();
    });
  } else {
    next();
  }
};