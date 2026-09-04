export default async function handler(req, res) {
  const username = req.query.username || 'anwarhossen-dev';

  const token = process.env.VITE_GITHUB_ACCESS_TOKEN || process.env.GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, { headers }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers }),
    ]);

    if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
      if (userRes.status === 403) {
        return res.status(403).json({ error: 'GitHub API rate limit exceeded.' });
      }
      throw new Error(`GitHub API request failed with status ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();
    const eventsData = await eventsRes.json();

    return res.status(200).json({
      user: userData,
      repos: reposData,
      events: eventsData,
    });
  } catch (error) {
    console.error('Serverless GitHub API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch GitHub data.',
      details: error.message 
    });
  }
}
