import express from "express";
import Database from "better-sqlite3";

const db = new Database('favorites.db')

const app = express();
const port = 3000;

// Defining middleware
// next, is how you invoke the next step in the middleware pipleine
app.use((req, res, next) => {
    console.log('hit 1')
    next(); // Invoke the next step of middleware/function
})

app.use((req, res, next) => {
    console.log('hit 2')
    next(); 
})


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
    try {
        const id = parseInt(req.params.id);
        // const favorite = favorites.find((fav) => fav.id === id)
        // Use SELECT instead
        const favorite = db.prepare('SELECT * FROM favorites WHERE id = ?').get(id)
        if (!favorite) {
            // Client side error in 400
            return res.status(404).json({ error: "Favorite not found" })
        }
        res.json({ favorite });
    } catch (error) {
        console.log(error)
        // 500 range is a server error
        res.status(500).json({error: 'Something went wrong, try again later'})
    }

});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`);
});
