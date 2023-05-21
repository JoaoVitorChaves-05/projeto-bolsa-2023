class About {
    index(req, res) {
        const authStatus = res.locals.auth
        res.status(200).render('about/index', { hasSession: authStatus })
    }
}

export default new About()