import { useEffect, useState } from 'react';

export default function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://lichess.org/api/tournament')
            .then(res => res.json())
            .then(data => {
                setTournaments(data.created || []);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Ongoing Tournaments</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {tournaments.slice(0, 10).map(t => (
                        <li key={t.id}>
                            <a
                                href={`https://lichess.org/tournament/${t.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontWeight: "bold", textDecoration: "none", color: "#0070f3" }}
                            >
                                {t.fullName}
                            </a>
                            {' '}— {t.nbPlayers} players
                        </li>
                    ))}
                </ul>
            )}
            <style jsx>{`
        div {
          text-align: center;
          margin-top: 40px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 8px 0;
        }
      `}</style>
        </div>
    );
}