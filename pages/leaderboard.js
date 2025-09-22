import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://lichess.org/api/player/top/10/blitz')
            .then(res => res.json())
            .then(data => {
                setPlayers(data.users || []);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Top Blitz Players</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Blitz</th>
                            <th>Bullet</th>
                            <th>Rapid</th>
                            <th>Classical</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p, i) => (
                            <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.username}</td>
                                <td>{p.title || '-'}</td>
                                <td>{p.perfs?.blitz?.rating || '-'}</td>
                                <td>{p.perfs?.bullet?.rating || '-'}</td>
                                <td>{p.perfs?.rapid?.rating || '-'}</td>
                                <td>{p.perfs?.classical?.rating || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <style jsx>{`
        div {
          text-align: center;
          margin-top: 40px;
        }
        table {
          margin: 0 auto;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px 16px;
        }
      `}</style>
        </div>
    );
}