import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div>
        <div id="follow-up">
          <strong>{this.props.label}: </strong>
          <br/> <input onChange={this.onChange.bind(this)}/>      
          <button style={{width: 90}} onClick={this.search.bind(this)}>{this.props.button}</button>
        </div> 
      </div>) 
  }
}


export default Search;