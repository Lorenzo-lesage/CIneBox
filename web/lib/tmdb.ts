const API_URL = 'http://localhost:8000/api/v1';

export async function getHomeData(type: string = 'movie', page: number = 1) {
    const res = await fetch(`${API_URL}/home?type=${type}&page=${page}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}