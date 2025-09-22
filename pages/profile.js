import { useState } from 'react';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    async function fetchProfile(e) {
        e.preventDefault();
        setError('');
        setProfile(null);
        if (!username) {
            setError('Please enter a username.');
            return;
        }
        const res = await fetch(`/api/user?username=${username}`);
        if (res.ok) setProfile(await res.json());
        else setError('User not found.');
    }

    return (
        <div>
            <h1>User Profile</h1>
            <form onSubmit={fetchProfile}>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter Lichess username"
                />
                <button type="submit">Fetch</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile && (
                <div className="profile">
                    {profile.profile?.bio && <p><em>{profile.profile.bio}</em></p>}
                    {profile.profile?.country && (
                        <p>
                            <img
                                src={`https://flagcdn.com/24x18/${profile.profile.country.toLowerCase()}.png`}
                                alt={profile.profile.country}
                                style={{ verticalAlign: 'middle', marginRight: 8 }}
                            />
                            {profile.profile.country}
                        </p>
                    )}
                    {profile.profile?.image && (
                        <img
                            src={profile.profile.image}
                            alt="Profile"
                            width={80}
                            height={80}
                            style={{ borderRadius: '50%', marginBottom: 10 }}
                        />
                    )}
                    <h2>{profile.username} {profile.title && <span>({profile.title})</span>}</h2>
                    <p>Bio: {profile.profile?.bio || 'N/A'}</p>
                    <p>Games played: {profile.count?.all || 'N/A'}</p>
                    <p>
                        Ratings:
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>Blitz: {profile.perfs?.blitz?.rating || 'N/A'}</li>
                            <li>Bullet: {profile.perfs?.bullet?.rating || 'N/A'}</li>
                            <li>Rapid: {profile.perfs?.rapid?.rating || 'N/A'}</li>
                            <li>Classical: {profile.perfs?.classical?.rating || 'N/A'}</li>
                        </ul>
                    </p>
                </div>
            )}
            <style jsx>{`
        div {
          text-align: center;
          margin-top: 40px;
        }
        input {
          padding: 8px;
          margin-right: 8px;
        }
        button {
          padding: 8px 16px;
        }
        .profile {
          margin-top: 20px;
          border: 1px solid #eee;
          padding: 16px;
          display: inline-block;
          min-width: 300px;
        }
      `}</style>
        </div>
    );
}