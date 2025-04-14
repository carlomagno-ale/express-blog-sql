const connection = require('../data/db')

//const posts = require('../data/posts-data');

function index(req, res) {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });

}

function destroy(req, res) {
    // id dall' URL
    const { id } = req.params;
    // Eliminiamo
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Post NON rimosso' });
        console.log(`Post con ID ${id} è stato cancellato.`);
        res.sendStatus(204)
    });
}

function show(req, res) {

    const { id } = req.params;

    console.log(`ID: ${id}`);

    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post non trovato' });
        res.json(results[0]);
    });
}


//non modificati
function store(req, res) {

    // Creiamo un nuovo oggetto 
    const newPost = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Aggiungiamo 
    posts.push(newPost);
    // controlliamo
    console.log(posts);
    // Restituiamo lo status corretto + il post creato
    res.status(201);
    res.json(newPost);
}

function update(req, res) {

    // recuperiamo lo slug 
    const slug = req.params.slug
    // cerchiamo tramite lo slug
    const postSingle = posts.find(postSingle => postSingle.slug === slug);
    // Piccolo controllo
    if (!postSingle) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }
    // Aggiorniamo

    postSingle.title = req.body.title,
        postSingle.slug = req.body.title.toLowerCase().replace(/ /g, '-'),
        postSingle.content = req.body.content,
        postSingle.image = req.body.image,
        postSingle.tags = req.body.tags

    // Controlliamo 
    console.log(posts)
    // post aggiornato
    res.json(postSingle);
}

function modify(req, res) {

    // recuperiamo lo slug 
    const slug = req.params.slug
    // cerchiamo tramite lo slug
    const postSingle = posts.find(postSingle => postSingle.slug === slug);
    // Piccolo controllo
    if (!postSingle) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }
    // Aggiorniamo

    postSingle.title = req.body.title,
        postSingle.slug = req.body.title.toLowerCase().replace(/ /, '-'),

        // Controlliamo 
        console.log(posts)
    // post aggiornato
    res.json(postSingle);

    //res.send(`modifica parzialmente un post con id ${req.params.slug}`)
}


module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
