import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginForm = app.find('.loginForm')

            expect(blogComponents.length).toBe(0)
            expect(loginForm.text()).toBe(app.text())
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Testaaja'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all blogs are rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)

            expect(blogComponents.length).toBe(blogService.blogs.length)
        })
    })
})