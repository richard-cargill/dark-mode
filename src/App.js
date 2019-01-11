import React from 'react';

const MyContext = React.createContext();

class MyProvider extends React.Component {
  state = {
    current: {
      background: this.props.theme.light.background,
      color: this.props.theme.light.color
    },
    light: {
      background: this.props.theme.light.background,
      color: this.props.theme.light.color
    },
    dark: {
      background: this.props.theme.dark.background,
      color: this.props.theme.dark.color
    }
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        toggleBackground: () => this.setState({
          current: {
            color: this.state.current.color === this.state.light.color ? this.state.dark.color : this.state.light.color,
            background: this.state.current.background === this.state.light.background ? this.state.dark.background : this.state.light.background
          }
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

const Family = (props) => (
  <div className="family">
    <ToggleButton className="button" />
  </div>
)

 class Background extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div style={{backgroundColor: context.state.current.background, color: context.state.current.color}}>
            {this.props.children}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

 class ToggleButton extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <React.Fragment>
            <button {...this.props} onClick={context.toggleBackground}>Toggle background</button>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    )
  }
}

const theme = {
  light: {
    background: 'black',
    color: 'white'
  },
  dark: {
    background: 'white',
    color: 'black'
  }
};

class App extends React.Component {
  render() {
    return (
      <MyProvider theme={theme}>
        <Background>
          <p>I am the app</p>
          <Family />
        </Background>
      </MyProvider>
    );
  }
}

export {App, ToggleButton, Background}
