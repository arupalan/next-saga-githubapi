import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'

import testReducer, {InitialState} from '../reducer';
import {actionTypes} from '../actions'; 

describe('>>> R E D U C E R --- Test Github API reducer', ()=>{
    it('+++ reducer for NEXT_PAGE should increment currPageIndex', () => {
        const expected_PageIndex = 2;
        let state = {currPageIndex: 1};

        state = testReducer(state, {type: actionTypes.NEXT_PAGE})
        expect(state.currPageIndex).toEqual(expected_PageIndex)
     });

    it('+++ reducer for PREV_PAGE should decrement currPageIndex', () => {
        const expected_PageIndex = 1
        let state = {currPageIndex: 2};

        state = testReducer(state, {type: actionTypes.PREV_PAGE})
        expect(state.currPageIndex).toEqual(expected_PageIndex)
     });
    it('+++ reducer for PREV_PAGE should not decrement currPageIndex when already at 1', () => {
        const expected_PageIndex = 1
        let state = {currPageIndex: 1};

        state = testReducer(state, {type: actionTypes.PREV_PAGE})
        expect(state.currPageIndex).toEqual(expected_PageIndex)
     });
});     
        
        

