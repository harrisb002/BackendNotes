import express from "express";
import Database from "better-sqlite3";

const db = new Database('favorites.db')

const app = express();
const port = 3000;

app.get("/favorites", (req, res) => {
    let query = 'SELECT * FROM favorites'
    const sort = req.query.sort;

    if (sort === 'asc') {
        query += ' ORDER BY name ASC'
    } else if (sort === 'desc') {
        query += ' ORDER BY name DESC'
    }

    const favorites = db.prepare(query).all()

    res.json({ favorites });
});

app.get("/favorites/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // const favorite = favorites.find((fav) => fav.id === id)
    // Use SELECT instead
    const favorite = db.prepare('SELECT * FROM favorites WHERE id = ?').get(id)
    if (!favorite) {
        return res.status(404).json({ error: "Favorite not found" })
    }
    res.json({ favorite });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`);
});
