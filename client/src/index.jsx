import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Sort from './components/Sort.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      repoLength: 0
    }

    this.retrieve();
  }

  retrieve () {
    $.getJSON('/repos', data => {

      this.setState({
        repos: data.slice(0,25),
        repoLength: data.length
      });

      this.repos = data;
    });
  }

  userSearch(term) {
    var repos = this.repos.filter(repo => repo.username.includes(term));

    this.setState({ repos: repos});
  }
  search (term) {
    console.log(`${term} was searched`);
    $.post('/repos', {username: term});

    $('#follow-up').html('We just received your repo request, check back shortly and we\'ll have it for you.');
    // TODO
  }

  reset(){
    this.setState({ repos: this.repos });
  }


  sort(method) {
    var repos = this.state.repos.slice();

    repos.sort((repo1, repo2) => {
      let date1 = repo1.created_at.split('T')[0].split('-').map(item => Number(item));
      let date2 = repo2.created_at.split('T')[0].split('-').map(item => Number(item));
      console.log(date1, date2);

      if (method === 'ascend') {
        [date1, date2] = [date2, date1];
      }

      if (date1[0] !== date2[0]){ //year
        return date2[0] - date1[0];
      } else if (date1[1] !== date2[1]) { //month
        return date2[1] - date1[1];
      } else if (date1[2] !== date2[2]) { //day
        return date2[2] - date1[2];
      } else {
        return 0; //do not move anything
      }
      
    });

    this.setState({repos: repos});
  }
  
  reverseSort(){
    this.sort('ascend');
  }
  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <h2>There are {this.state.repoLength} TOTAL repos</h2>
      <a href="/"><h4 style={{display: 'inline'}}>Add more repos!</h4></a><br/>
      <a href="/repos">See ALL the repo JSON (there's hella stuff in here)</a>

      <br/><br/>

      <Search label="Enter a github username" button="Add Repos" onSearch={this.search.bind(this)}/>

      <br/>

      <Search label="Look up a user" button="Search" onSearch={this.userSearch.bind(this)}/>

      <br/>

      <strong>Sort By:<br/></strong>
      <Sort reverse={this.reverseSort.bind(this)} sort={this.sort.bind(this)} reset={this.reset.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));