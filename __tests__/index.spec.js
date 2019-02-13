import * as React from 'react'
import {mount} from 'enzyme'
import Index from '../pages/index'
import renderer from 'react-test-renderer'
import {InitialState}  from '../actions' 
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('Pages', () => {
  describe('Index', () => {
    const initialState = InitialState;
    const mockStore = configureStore();
    let store,wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><Index /></Provider> )
    })

    it('should render without throwing an error', () => {
      expect(wrapper.contains(<h1>Github Issue Search Page</h1>)).toBe(true)
    });
  })  
})
