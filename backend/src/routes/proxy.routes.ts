/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import https from 'https';
import http from 'http';

const router = express.Router();

// Block private/loopback IPs to prevent SSRF
const isPrivateHost = (hostname: string) =>
  /^(localhost|127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|::1$|0\.0\.0\.0)/.test(hostname);

router.get('/image', (req: Request, res: Response) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'url param required' });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({ error: 'Only http/https allowed' });
  }

  if (isPrivateHost(parsed.hostname)) {
    return res.status(400).json({ error: 'Private URLs not allowed' });
  }

  const client = parsed.protocol === 'https:' ? https : http;

  const fetchImage = (targetUrl: string, redirectCount = 0) => {
    if (redirectCount > 5) return res.status(400).json({ error: 'Too many redirects' });

    client.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (imgRes) => {
      // Follow redirects
      if (imgRes.statusCode && [301, 302, 303, 307, 308].includes(imgRes.statusCode) && imgRes.headers.location) {
        const redirectUrl = new URL(imgRes.headers.location, targetUrl).toString();
        imgRes.resume();
        return fetchImage(redirectUrl, redirectCount + 1);
      }

      if (imgRes.statusCode !== 200) {
        return res.status(502).json({ error: `Upstream returned ${imgRes.statusCode}` });
      }

      res.set('Content-Type', imgRes.headers['content-type'] || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=3600');
      imgRes.pipe(res);
    }).on('error', () => res.status(502).json({ error: 'Failed to fetch image' }));
  };

  fetchImage(url);
});

export default router;
