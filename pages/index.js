import { useState } from 'react';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);

    async function fetchProfile(e) {
        e.preventDefault();
        const res = await fetch(`https://lichess.org/api/user/${username}`);
        if (res.ok) setProfile(await res.json());
        else setProfile(null);
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
            {profile && (
                <div className="profile">
                    <h2>{profile.username}</h2>
                    <p>Rating: {profile.perfs?.blitz?.rating || 'N/A'} (Blitz)</p>
                    <p>Followers: {profile.nbFollowers}</p>
                    <p>Country: {profile.profile?.country || 'N/A'}</p>
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
        .profile {
          margin-top: 20px;
          border: 1px solid #eee;
          padding: 16px;
          display: inline-block;
        }
      `}</style>
        </div>
    );
}