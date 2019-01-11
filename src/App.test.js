import React from 'react';
import ReactDOM from 'react-dom';
import {App, ToggleButton, Background} from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Div changes colour when button is pressed', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const instance = component.root;

  // manually trigger the callback
  const button = instance.find((el) => el.type == 'button');
  button.props.onClick()

  // re-rendering
  tree = component.toJSON();

  const background = instance.find((el) => el.type == 'div');

  expect(background.props.style.backgroundColor).toEqual('white');
  expect(background.props.style.color).toEqual('black');
});
