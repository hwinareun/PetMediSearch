const getPostById = (req, res) => {

    let response = { title: 'post1', author: 'user1', created_at: 'date1', content: 'content' }
    return res.send(response);

}
const addPostById = (req, res) => {
    return res.send({ message: '새로운 게시글이 등록되었습니다.' })
}

const updatePostById = (req, res) => {
    return res.send({ message: '게시글이 수정되었습니다.' })
}

const deletePostById = (req, res) => {
    return res.send({ message: '게시글이 삭제되었습니다.' })
}


module.exports = {
    getPostById,
    addPostById,
    updatePostById,
    deletePostById
}