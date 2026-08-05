export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // This token will be securely stored in Vercel's environment variables
  const token = process.env.VITE_GITHUB_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured on the server.' });
  }

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
  };

  try {
    // Set caching headers for Vercel's Edge Network.
    // This caches the response for 30 minutes, reducing API calls.
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, { headers }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers }),
    ]);

    // Check if any of the requests failed
    if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
      const rateLimitRemaining = userRes.headers.get('x-ratelimit-remaining');
      console.error(`GitHub API request failed! Status: ${userRes.status}, Remaining requests: ${rateLimitRemaining}`);
      
      // If rate limit is the issue, we can be more specific
      if (userRes.status === 403) {
        return res.status(403).json({ error: 'GitHub API rate limit exceeded on the server.' });
      }
      throw new Error(`GitHub API request failed with status ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();
    const eventsData = await eventsRes.json();

    // Combine the data into a single response object
    const combinedData = {
      user: userData,
      repos: reposData,
      events: eventsData,
    };

    return res.status(200).json(combinedData);

  } catch (error) {
    console.error('Server-side GitHub fetch error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data from GitHub API on the server.',
      details: error.message 
    });
  }
}