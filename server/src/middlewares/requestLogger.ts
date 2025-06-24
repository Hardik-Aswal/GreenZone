// middlewares/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const method = chalk.blue(req.method);
    const url = chalk.yellow(req.originalUrl);
    const status = res.statusCode;
    const statusColor =
      status >= 500
        ? chalk.red
        : status >= 400
        ? chalk.hex('#FFA500') 
        : status >= 300
        ? chalk.cyan
        : chalk.green;

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    console.log(`${timestamp}  ${method} ${url} → ${statusColor(status)} (${duration}ms)`);
  });

  next();
};
