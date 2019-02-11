import * as React from 'react'
import {mount} from 'enzyme'
import Index from '../pages/index'
import {InitialState}  from '../actions' 
import configureStore from 'redux-mock-store'

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
      expect(wrapper.contains(<h1>Github Search API</h1>)).toBe(true)
    });
  })  
})
