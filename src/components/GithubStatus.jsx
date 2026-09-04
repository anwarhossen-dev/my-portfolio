import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { MdExpandMore, MdFolder, MdStar, MdGroup, MdCode, MdHistory, MdTrendingUp } from 'react-icons/md';
const GitHubCalendar = lazy(() => 
  import('react-github-calendar').then(module => ({ default: module.GitHubCalendar }))
);

const GithubStatus = ({ username }) => {
  const [stats, setStats] = useState({ 
    repos: 24, 
    followers: 12, 
    stars: 18,
    events: [
      { id: '1', type: 'PushEvent', repo: { name: 'anwarhossen-dev/my-portfolio' }, created_at: new Date().toISOString() },
      { id: '2', type: 'PushEvent', repo: { name: 'anwarhossen-dev/LocalChefBazaar' }, created_at: new Date().toISOString() },
      { id: '3', type: 'CreateEvent', repo: { name: 'anwarhossen-dev/CareerTrack' }, created_at: new Date().toISOString() }
    ],
    topRepos: [
      { id: 1, name: 'LocalChefBazaar', html_url: 'https://github.com/anwarhossen-dev/LocalChefBazaar', stargazers_count: 8, language: 'JavaScript' },
      { id: 2, name: 'ARTIFY-client', html_url: 'https://github.com/anwarhossen-dev/ARTIFY-client', stargazers_count: 5, language: 'React' },
      { id: 3, name: 'CareerTrack', html_url: 'https://github.com/anwarhossen-dev/CareerTrack', stargazers_count: 3, language: 'TypeScript' }
    ],
    latestCommit: 'Building scalable web & enterprise solutions',
    topLanguage: 'React & C#',
    loading: false,
    error: null,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [blockSize, setBlockSize] = useState(8);
  const fontSize = blockSize > 7 ? 10 : 8;

  useEffect(() => {
    // Responsive calendar block size
    const handleResize = () => {
      const w = window.innerWidth || 0;
      if (w < 420) setBlockSize(6);
      else if (w < 640) setBlockSize(7);
      else setBlockSize(8);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchGithubData = async () => {
      const CACHE_KEY = `github_stats_${username}`;
      const CACHE_TIME = 30 * 60 * 1000; // 30 Minutes

      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { stats: savedStats, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_TIME) {
            setStats(prev => ({ ...prev, ...savedStats, loading: false, error: null }));
            return;
          }
        }

        const response = await fetch(`/api/github?username=${username}`);
        if (!response.ok) return;

        const { user: userData, repos: reposData, events: eventsData } = await response.json();

        let stars = 0;
        let languages = {};
        if (Array.isArray(reposData)) {
          reposData.forEach(repo => {
            stars += repo.stargazers_count;
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });
        }

        const pushEvents = Array.isArray(eventsData) ? eventsData.filter(e => e.type === 'PushEvent') : [];
        const latestMsg = pushEvents[0]?.payload?.commits[0]?.message || 'Building scalable web & enterprise solutions';

        const topLang = Object.keys(languages).length > 0 
          ? Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b)
          : 'React & C#';

        const topRepos = Array.isArray(reposData) 
          ? [...reposData].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5)
          : [];

        const newStats = {
          repos: userData?.public_repos || 24,
          followers: userData?.followers || 12,
          stars: stars || 18,
          events: Array.isArray(eventsData) && eventsData.length > 0 ? eventsData.slice(0, 10) : stats.events,
          topRepos: topRepos.length > 0 ? topRepos : stats.topRepos,
          latestCommit: latestMsg,
          topLanguage: topLang,
          loading: false,
          error: null,
        };

        setStats(newStats);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ stats: newStats, timestamp: Date.now() }));
      } catch (error) {
        console.warn('GitHub API background sync:', error);
      }
    };
    fetchGithubData();
  }, [username]);

  // Skeleton component for the loading state
  const SkeletonLoader = () => (
    <div className="space-y-4 animate-pulse">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 h-[68px] justify-center">
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded-md mb-1.5"></div>
            <div className="w-8 h-4 bg-slate-300 dark:bg-slate-700 rounded-md mb-1"></div>
            <div className="w-12 h-2 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Contribution Calendar Skeleton */}
      <div className="p-3 rounded-xl bg-slate-200/50 dark:bg-slate-800/50">
        <div className="h-3 w-2/5 bg-slate-300 dark:bg-slate-700 rounded-md mb-2"></div>
        <div className="h-[78px] bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
      </div>

      {/* Top Repos Skeleton */}
      <div className="h-3 w-1/3 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
      <div className="h-8 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg"></div>
    </div>
  );

  const ErrorDisplay = ({ message }) => (
    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
      <p className="text-xs font-bold text-red-500">{message}</p>
      <p className="text-[10px] text-red-500/70 mt-1">
        Please check back later.
      </p>
    </div>
  );

  return (
    <div className="relative z-[70]">
      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative cursor-pointer overflow-hidden
          bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl
          border border-white/20 dark:border-slate-800/50 shadow-2xl
          ${isExpanded ? 'p-6 rounded-[2rem] w-full sm:w-80' : 'p-3 px-5 rounded-2xl w-full sm:w-fit'}
          transition-all duration-500 ease-[box-bezier(0.23, 1, 0.32, 1)]
        `}
      >
        {/* Animated Scanning Light Effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent w-1/2 skew-x-12 pointer-events-none"
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_15px_#10b981]"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">GitHub Live</span>
                {!isExpanded && ( 
                  <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FaGithub />
                    {stats.loading ? "Loading..." : `${stats.repos} Repos`}
                  </span>
                )}
              </div>
            </div>
            
            <motion.div 
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-slate-400"
            >
              <MdExpandMore className="text-xl" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                  <button onClick={() => setActiveTab('overview')} className={`flex-1 text-xs font-bold py-2 rounded-full transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'text-slate-500'}`}>Overview</button>
                  <button onClick={() => setActiveTab('activity')} className={`flex-1 text-xs font-bold py-2 rounded-full transition-colors ${activeTab === 'activity' ? 'bg-primary text-white' : 'text-slate-500'}`}>Activity</button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {stats.loading ? (
                      <SkeletonLoader />
                    ) : stats.error ? (
                      <ErrorDisplay message={stats.error} />
                    ) : (
                      <>
                        {activeTab === 'overview' && (
                          <div className="space-y-4">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: 'Repos', val: stats.repos, icon: <MdFolder /> },
                                { label: 'Stars', val: stats.stars, icon: <MdStar /> },
                                { label: 'Followers', val: stats.followers, icon: <MdGroup /> }
                              ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                                  <span className="text-[14px] text-primary mb-1">{s.icon}</span>
                                  <span className="text-sm font-black text-slate-900 dark:text-white">{s.val}</span>
                                  <span className="text-[8px] font-bold uppercase text-slate-400">{s.label}</span>
                                </div>
                              ))}
                            </div>

                            {/* Contribution Calendar */}
                            <div className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Contribution Graph</h4>
                              <Suspense fallback={<div className="text-xs text-center p-4">Loading calendar...</div>}>
                                <div className="overflow-x-auto">
                                  <GitHubCalendar
                                    username={username}
                                    blockSize={blockSize}
                                    blockMargin={2}
                                    fontSize={fontSize}
                                    theme={{
                                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                    }}
                                  />
                                </div>
                              </Suspense>
                            </div>

                            {/* Top Repos */}
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-black uppercase text-slate-400">Top Repositories</h4>
                              {stats.topRepos.map(repo => (
                                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{repo.name}</p>
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MdStar className="text-yellow-500" /> {repo.stargazers_count}
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>{repo.language}</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === 'activity' && (
                          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            <h4 className="text-[10px] font-black uppercase text-slate-400">Recent Activity</h4>
                            {stats.events.map(event => (
                              <div key={event.id} className="flex items-start gap-2 text-xs">
                                <div className="mt-0.5">
                                  {event.type === 'PushEvent' && <MdHistory className="text-blue-500" />}
                                  {event.type === 'CreateEvent' && <MdFolder className="text-green-500" />}
                                  {event.type === 'PullRequestEvent' && <MdTrendingUp className="text-purple-500" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-slate-700 dark:text-slate-300 leading-tight">
                                    {event.type === 'PushEvent' && `Pushed to ${event.repo.name.split('/')[1]}`}
                                    {event.type === 'CreateEvent' && `Created repo ${event.repo.name}`}
                                    {event.type === 'PullRequestEvent' && `Opened PR in ${event.repo.name}`}
                                  </p>
                                  <p className="text-slate-400 text-[10px]">{new Date(event.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GithubStatus;