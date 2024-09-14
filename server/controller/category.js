const getListByCategory = (req, res) => {

    let response = [{ title: 'post1', author: 'user1', created_at: 'date1' },
    { title: 'post2', author: 'user2', created_at: 'date2' },
    { title: 'post3', author: 'user3', created_at: 'date3' }
    ]

    return res.json(response);

}

module.exports = {
    getListByCategory
}