import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let blog

    beforeEach(() => {
        blog = {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
        }
    })

    it('renders title, author and likes', () => {
        const blogComponent = shallow(<SimpleBlog blog={blog} />)

        expect(blogComponent.text()).toContain(blog.title && blog.author && blog.likes)
    })

    it('clicking the button twice calls the event handler twice', () => {
        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
