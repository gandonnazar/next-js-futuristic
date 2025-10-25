'use client';

import Image from 'next/image';

export default function ProfilePage() {
  const user = {
    name: 'Creative AI User',
    email: 'user@example.com',
    credits: 12000,
    plan: 'Pro',
    joined: 'October 2025'
  };

  const recentActivity = [
    { id: 1, type: 'Image', prompt: 'Futuristic cityscape with neon lights', date: '2 hours ago', credits: -10 },
    { id: 2, type: 'Video', prompt: 'Abstract cosmic animation', date: '5 hours ago', credits: -20 },
    { id: 3, type: 'Upscale', prompt: 'Portrait enhancement', date: '1 day ago', credits: -5 },
    { id: 4, type: 'Image', prompt: 'Cyberpunk character design', date: '2 days ago', credits: -10 },
  ];

  const stats = [
    { label: 'Images Generated', value: '247' },
    { label: 'Videos Created', value: '38' },
    { label: 'Images Upscaled', value: '92' },
    { label: 'Total Credits Used', value: '8,540' }
  ];

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Your Profile
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginBottom: '40px' }}>
          {/* Profile Card */}
          <div className="glass-panel hologram" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--primary-neon)',
              boxShadow: '0 0 20px var(--shadow-cyan)',
              position: 'relative'
            }}>
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MCkiLz4KPHBhdGggZD0iTTYwIDMwQzUwLjA1OTMgMzAgNDIgMzguMDU5MyA0MiA0OEM0MiA1Ny45NDA3IDUwLjA1OTMgNjYgNjAgNjZDNjkuOTQwNyA2NiA3OCA1Ny45NDA3IDc4IDQ4Qzc4IDM4LjA1OTMgNjkuOTQwNyAzMCA2MCAzMFoiIGZpbGw9IiMwMGZmZmYiLz4KPHBhdGggZD0iTTYwIDcyQzQzLjQzMTUgNzIgMzAgODUuNDMxNSAzMCAxMDJIOTBDOTAgODUuNDMxNSA3Ni41Njg1IDcyIDYwIDcyWiIgZmlsbD0iIzAwZmZmZiIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDAiIHgxPSIwIiB5MT0iMCIgeDI9IjEyMCIgeTI9IjEyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBmZmZmIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmMDBmZiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
                alt="Profile"
                width={120}
                height={120}
              />
            </div>

            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '10px' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '5px' }}>{user.email}</p>
            <p style={{ color: 'var(--primary-neon)', marginBottom: '20px' }}>{user.plan} Plan</p>

            <div style={{
              padding: '15px',
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>
                Available Credits
              </div>
              <div style={{ color: 'var(--primary-neon)', fontSize: '2rem', fontWeight: 'bold' }}>
                {user.credits.toLocaleString()}
              </div>
            </div>

            <button className="neon-button" style={{ width: '100%', marginBottom: '10px' }}>
              Upgrade Plan
            </button>
            <button className="neon-button secondary" style={{ width: '100%' }}>
              Edit Profile
            </button>

            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '20px' }}>
              Member since {user.joined}
            </p>
          </div>

          {/* Stats and Activity */}
          <div>
            {/* Stats Grid */}
            <div className="grid-2 gap-2 mb-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel hologram" style={{ padding: '25px', textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: '2rem' }}>{stat.value}</div>
                  <div className="stat-label" style={{ fontSize: '0.9rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 255, 255, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: 'rgba(0, 255, 255, 0.2)',
                        borderRadius: '6px',
                        color: 'var(--primary-neon)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                        {activity.type}
                      </div>
                      <p style={{ color: 'var(--text-light)', margin: '5px 0' }}>{activity.prompt}</p>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', opacity: 0.7 }}>{activity.date}</p>
                    </div>
                    <div style={{
                      color: activity.credits < 0 ? '#ff4444' : '#00ff00',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}>
                      {activity.credits}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ color: 'var(--primary-neon)', marginBottom: '20px', fontSize: '1.3rem' }}>
            Account Settings
          </h3>
          <div className="grid-2 gap-3">
            <button className="neon-button" style={{ padding: '15px' }}>
              🔐 Change Password
            </button>
            <button className="neon-button" style={{ padding: '15px' }}>
              🔔 Notification Settings
            </button>
            <button className="neon-button" style={{ padding: '15px' }}>
              💳 Billing History
            </button>
            <button className="neon-button" style={{ padding: '15px' }}>
              📊 Usage Analytics
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
