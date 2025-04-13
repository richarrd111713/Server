export default async function handler(req, res) {
    const target = req.query.url;
    if (!target) {
      return res
        .status(400)
        .send('Error: missing `?url=` query parameter');
    }
  
    // Fetch the target page
    const originRes = await fetch(target, { redirect: 'follow' });
    const body      = await originRes.text();
  
    // Build a fresh headers object without CSP/XFO
    const headers = {};
    originRes.headers.forEach((value, name) => {
      const lower = name.toLowerCase();
      if (
        lower !== 'content-security-policy' &&
        lower !== 'x-frame-options' &&
        lower !== 'content-security-policy-report-only'
      ) {
        headers[name] = value;
      }
    });
    // Allow embedding & CORS
    headers['Access-Control-Allow-Origin'] = '*';
  
    // Return the modified response
    res.set(headers).status(originRes.status).send(body);
  }
  