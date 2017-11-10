import React from 'react';

const Repo = (props) => (
  <div>
  	<h4>
  	  <img style={{width: 90}} src={props.data.avatarUrl}/>
  	  <br/>
  	  <strong>
	  	  {`Repo ID: ${props.data.id} | URL: `}
	  	  <a href={props.data.userUrl}>{props.data.username} </a>/
	  	  <a href={props.data.url}> {props.data.name}</a>
  	  </strong>
  	</h4>

  	<p><strong>Description:</strong> {props.data.description}</p>
  	<p><strong>Date Created:</strong> {props.data.created_at.split('T')[0]}</p>
  	<hr/>
  </div>
);

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
    {props.repos.slice(0,25).map((repo, index) => 
      <Repo key={index} data={repo}/>
    )}
    </div>
  </div>
);

export default RepoList;