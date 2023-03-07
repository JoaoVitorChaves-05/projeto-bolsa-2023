class About {
    index(req, res) {
        res.status(200).render('about/index')
    }
}

export default new About()