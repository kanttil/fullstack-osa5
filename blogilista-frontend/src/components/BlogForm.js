import React from 'react'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: ''
        }
    }

    submitBlog = (event) => {
        event.preventDefault()

        const blogObject = {
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        }
        this.props.addBlog(blogObject)

        this.setState({
            title: '',
            author: '',
            url: ''
        })
    }

    handleBlogFieldChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.submitBlog}>
                    <div>
                        title
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <div>
                        author
                        <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <div>
                        url
                        <input
                            type="text"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleBlogFieldChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm