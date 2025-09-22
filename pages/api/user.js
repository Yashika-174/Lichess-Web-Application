// filepath: c:\Users\YASHIKA AGGARWAL\Desktop\Lichess Web Application\pages\api\user.js
export default async function handler(req, res) {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    const apiRes = await fetch(`https://lichess.org/api/user/${username}`);
    if (!apiRes.ok) {
        return res.status(apiRes.status).json({ error: 'User not found' });
    }
    const data = await apiRes.json();
    res.status(200).json(data);
}