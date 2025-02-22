



/*
    Mainly for notes before using Express router
*/

// Defining middleware
// next(), is how you invoke the next step in the middleware pipleine
app.use((req, res, next) => {
    console.log('hit 1')
    next(); // Invoke the next step of middleware/function
})

app.use((req, res, next) => {
    console.log('hit 2')
    next();
})

// app.get("/favorites", (req, res, next) => {
//     console.log('preprocessing')
// })
// Create function for middleware and pass to 
//  corresponding get() instead of the above method
// const authenticate = (req, res, next) => {
//     console.log('preprocessing')
//     // res.status(500).json({ error: 'Authentication failed...' })
//     next()
// }
// // Go through these functions one at a time. Much cleaner than 
// app.get("/favorites", authenticate, (req, res) => {
//     let query = 'SELECT * FROM favorites'
//     const sort = req.query.sort;

//     if (sort === 'asc') {
//         query += ' ORDER BY name ASC'
//     } else if (sort === 'desc') {
//         query += ' ORDER BY name DESC'
//     }

//     const favorites = db.prepare(query).all()

//     res.json({ favorites });
// });


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

app.post('/favorites', (req, res) => {
    const { name, url } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name required' })
    }
    if (!url) {
        return res.status(400).json({ error: 'Url required' })
    }

    const result = db
        .prepare('INSERT INTO favorites (name, url) VALUES (?, ?)')
        .run(name, url);
    res.status(201).json({ id: result.lastInsertRowid })
});

app.get("/favorites/:id", (req, res) => {
    // If you want to go to the next section of the error handling pipeline
    //   you must manually invoke next() in the catch
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
        res.status(500).json({ error: 'Something went wrong, try again later' })
        // next()
    }

});

app.delete('/favorites/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = db.prepare('DELETE FROM favorites WHERE id = ?').run(id)

    if (!result.changes) {
        return res.status(404).json({ error: 'Favorite not found.' })
    }

    res.sendStatus(200)
})

app.put('/favorites/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name, url } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name required' })
    }

    if (!url) {
        return res.status(400).json({ error: 'Url required' })
    }

    const result = db
        .prepare('UPDATE favorites SET name=?, url=? WHERE id=?')
        .run(name, url, id)

    if (!result.changes) {
        return res.status(404).json({ error: 'Favorite not found.' })
    }

    res.sendStatus(200)
})

app.patch('/favorites/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name, url } = req.body

    if (!name && !url) {
        return res.status(400).json({ error: 'Name or Url required.' })
    }

    // const favorite = db
    //     .prepare('SELECT * FROM favorites WHERE id = ?')
    //     .get(id)

    // if (!favorite) {
    //     return res.status(404).json({ error: "Favorite not found" })
    // }

    // const newName = name || favorite.name
    // const newUrl = url || favorite.url

    // COALESCE() returns the first value in the arguements that are not null
    // This is preferred in contrast to the above due to race conditions as well
    //  as needing to go to the Database once instead of twice as before
    const result = db
        .prepare('UPDATE favorites SET name=COALESCE(?, name), url=COALESCE(?, url) WHERE id=?')
        .run(name, url, id)

    // Check if changes where made
    if (!result.changes) {
        return res.status(404).json({ error: 'Favorite not found.' })
    }

    res.sendStatus(200)
})



// Implementing error handling as middleware
// Pipeline is defined as things are defined in the file,
//   therefore define after routes
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === 'sqliteError') {
        console.log('Db error hit.')
    }
    // Pass err just in case other error handling code exists
    next(err); // Goes to default error handler
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`);
});
