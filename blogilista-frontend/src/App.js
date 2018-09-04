import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, color }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color,
        border: 'solid',
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            notification: null,
            notificationColor: null,
            username: '',
            password: '',
            user: null
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({ blogs })
        )

        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            this.setState({ user })
        }
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({
                username: '',
                password: '',
                user,
                notification: `${user.name} logged in`,
                notificationColor: 'green'
            })
            setTimeout(() => {
                this.setState({ notification: null })
            }, 3000)
        } catch (exception) {
            this.setState({
                notification: 'wrong username or password',
                notificationColor: 'red'
            })
            setTimeout(() => {
                this.setState({ notification: null })
            }, 3000)
        }
    }

    logout = (event) => {
        event.preventDefault()

        window.localStorage.clear()
        blogService.setToken(null)
        this.setState({
            user: null,
            notification: 'logged out',
            notificationColor: 'green'
        })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 3000)
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addBlog = async (blogObject) => {
        this.blogForm.toggleVisibility()

        const newBlog = await blogService.create(blogObject)
        const blogs = await blogService.getAll()
        this.setState({
            blogs,
            notification: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
            notificationColor: 'green'
        })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 3000)
    }

    updateBlog = async (id, blogObject) => {
        await blogService.update(id, blogObject)
        const blogs = await blogService.getAll()

        this.setState({ blogs })
    }

    removeBlog = async (id) => {
        await blogService.remove(id)
        this.setState({ blogs: this.state.blogs.filter(blog => blog._id !== id) })
    }

    render() {
        const blogsSortedByLikes = this.state.blogs.sort((a, b) =>
            b.likes - a.likes)

        if (this.state.user === null) {
            return (
                <div>
                    <Notification
                        message={this.state.notification}
                        color={this.state.notificationColor} />
                    <div className="loginForm">
                        <h2>Log in to application</h2>

                        <form onSubmit={this.login}>
                            <div>
                                username:
                                <input
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleLoginFieldChange}
                                />
                            </div>
                            <div>
                                password:
                                <input
                                    type="text"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleLoginFieldChange}
                                />
                            </div>
                            <button type="submit">login</button>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Notification
                    message={this.state.notification}
                    color={this.state.notificationColor} />
                <h2>blogs</h2>
                <p>
                    {this.state.user.name} logged in
                    <button onClick={this.logout}>logout</button>
                </p>
                <Togglable buttonLabel="create new" ref={component => this.blogForm = component}>
                    <BlogForm addBlog={this.addBlog} />
                </Togglable>
                {blogsSortedByLikes.map(blog =>
                    <Blog
                        key={blog._id}
                        blog={blog}
                        user={this.state.user}
                        updateBlog={this.updateBlog}
                        removeBlog={this.removeBlog} />
                )}
            </div>
        )
    }
}

export default App;
