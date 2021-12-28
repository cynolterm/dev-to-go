import logo from './logo.svg';
import './App.css';
import DevToGoHeader from './header';
import Content from "./Content"

const App = props => {
  return (
    <div className="App">
      <Content>
        {props.children}
      </Content>
      
    </div>
  );
}

export default App;
