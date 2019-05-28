import React from 'react';
import { shallow } from 'enzyme';
// 
import { WelcomePage, mapDispatchToProps } from './WelcomePage';
import { addUserThunk } from '../../Thunks/addUserThunk';

describe('WelcomePage', () => {

  let wrapper;
  // 
  let addNewUserMock = jest.fn()
  let navigationMock = { navigate: jest.fn() };

  beforeEach(() => {
    wrapper = shallow(
      <WelcomePage  addNewUser={addNewUserMock}
                    navigation={navigationMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it.skip('should call handleChange on input text change', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'handleChange');

    const nameInput = wrapper
        .findWhere(node => node.prop('testID') === 'name-input');

    nameInput.simulate('change', 'butts');

    expect(mockSpy).toHaveBeenCalledWith('butts');
  })

  it.skip('should call handleSave on button press', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'handleSave');
    const saveButton = wrapper
      .findWhere(node => node.prop('testID') === 'add-user-button');

    saveButton.props().onPress();

    expect(mockSpy).toHaveBeenCalled();
  })

  describe('handleChange(name)', () => {

    it('should update state', () => {
      let mockState = { userName: '', showError: false };
      expect(wrapper.state()).toEqual(mockState);
      let mockName = 'Tyler';

      wrapper.instance().handleChange(mockName);
      let expected = { userName: 'Tyler', showError: false };

      expect(wrapper.state()).toEqual(expected);
    })

  })

  describe('handleSave()', () => {

    it('should invoke addNewUser & navigate', () => {
      expect(wrapper.state('userName')).toEqual('')

      wrapper.setState({ userName: 'Jim' })
      wrapper.instance().handleSave();

      expect(addNewUserMock).toHaveBeenCalledWith('Jim');
      expect(navigationMock.navigate).toHaveBeenCalledWith('homePage');
    })

    it('should update state with an error', () => {
      expect(wrapper.state()).toEqual({ userName: '', showError: false });

      wrapper.instance().handleSave();

      expect(wrapper.state('showError')).toEqual(true);
    })

  })

  describe('renderSubmit()', () => {

    it('should match snapshot', () => {
      expect(wrapper.state('showError')).toEqual(false);
      let results = wrapper.instance().renderSubmit();
      expect(results).toMatchSnapshot();

      wrapper.setState({ showError: true });
      expect(results).toMatchSnapshot();
    })

  })

})

describe('mapDispatchToProps', () => {

  it('should dispatch an addNewUser method', () => {
    let mockName = 'Joel';
    const mockDispatch = jest.fn();
    const actionToDispatch = addUserThunk(mockName);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.addNewUser(mockName);

    expect(mockDispatch).toHaveBeenCalled(); // should be toHaveBeenCalledWith()
  })

})
