import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog
    let blogComponent

    beforeEach(() => {
        blog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7
        }

        blogComponent = mount(<Blog blog={blog} />)
    })

    it('at first only the title and author are displayed', () => {
        const titleDiv = blogComponent.find('.titleDiv')
        const contentDiv = blogComponent.find('.contentDiv')

        expect(titleDiv.text()).toBe(blog.title + ' ' + blog.author)
        expect(contentDiv.text()).toBe('')
    })

    it('after clicking the title the details are displayed', () => {
        const titleDiv = blogComponent.find('.titleDiv')
        titleDiv.simulate('click')

        const contentDiv = blogComponent.find('.contentDiv')

        expect(contentDiv.text()).toContain(blog.url && blog.likes)
    })
})
