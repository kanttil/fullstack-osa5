import React from 'react'

const BlogInformation = ({ blog, user, extended, likeBlog, deleteBlog }) => {
    if (!extended) {
        return null
    }

    let anonymous = null
    if (blog.user === undefined) {
        anonymous = 'anonymous'
    }

    const informationStyle = {
        paddingTop: 10,
        paddingLeft: 10
    }

    return (
        <div style={informationStyle}>
            <a href={blog.url}>{blog.url}</a>
            <div>
                {blog.likes} likes
                <button onClick={likeBlog(blog)}>like</button>
            </div>
            <div>added by {anonymous || blog.user.name}</div>
            <DeleteButton blog={blog} user={user} deleteBlog={deleteBlog} />
        </div>
    )
}

const DeleteButton = ({ blog, user, deleteBlog }) => {
    if (blog.user === undefined || blog.user.username === user.username) {
        return (
            <button onClick={deleteBlog(blog)}>delete</button>
        )
    }

    return null
}

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            extended: false
        }
    }

    toggleSize = () => {
        this.setState({ extended: !this.state.extended })
    }

    likeBlog = (blog) => () => {
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user._id
        }

        this.props.updateBlog(blog._id, blogObject)
    }

    deleteBlog = (blog) => () => {
        if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
            this.props.removeBlog(blog._id)
        }
    }

    render() {
        const blog = this.props.blog

        const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
        }

        return (
            <div style={blogStyle}>
                <div onClick={this.toggleSize} className="titleDiv">
                    {blog.title} {blog.author}
                </div>
                <div className="contentDiv">
                    <BlogInformation
                        blog={blog}
                        user={this.props.user}
                        extended={this.state.extended}
                        likeBlog={this.likeBlog}
                        deleteBlog={this.deleteBlog}
                    />
                </div>
            </div>
        )
    }
}

export default Blog