import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Input, Col, Row  } from 'reactstrap';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value : '',
      user : '',
      folVal : [],
      repoVal : [],
    
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleChange(event) {
    this.setState({value2: event.target.value});
  }


  

  usernameAPI(props) {
    $.getJSON(props)
      .then((data) => {
        //console.log( {user :  data}  );
          
        this.followerAPI(data.followers_url);
        this.repoAPI(data.repos_url);
        this.setState({user :  data} );


      });

  }

  followerAPI(props) {
        $.getJSON(props)
        .then((response) => {
                this.setState( {folVal :  response} ); 
              
          })
    }

  repoAPI(props) {
        $.getJSON(props)
        .then((response) => {
                this.setState( {repoVal :  response} ); 
              
          })
    }

  getUser(props){
    var url = 'http://api.github.com/users/'+props;
    this.usernameAPI(url);
    this.setState({value2:props});
  }

  


  handleClick(event) {

    var url = 'http://api.github.com/users/'+this.state.value2;

    this.usernameAPI(url);
    
  }





  render() {

    const  bio  = this.state.user.bio;
    const avatar = this.state.user.avatar_url
    var follower = ''
    var repos = ''
    

    if(this.state.user.public_repos != '0'){
      repos = this.state.user.public_repos;
    }

    if(this.state.user.followers != '0'){
      follower = this.state.user.followers;
    }


    
    
    const folVal = this.state.folVal.map((keyName, keyIndex) => {
                  return(
                    <div   className="DivListfol" key={keyIndex} onClick={()=>this.getUser(keyName.login)} >
                        <img src={keyName.avatar_url} className="Followlogo" alt="logo" />
                        <a href="#" >{keyName.login}</a>
                    </div>
                  )
                  }); 

    const repoVal = this.state.repoVal.map((keyName, keyIndex) => {
              return(
                <div className="DivListrepo" >
                        <a href={keyName.html_url} >
                        <p>{keyName.name}</p>
                        </a>
                      </div>
              )
              });

    //console.log(this.state)
    return (
      
      <div className="Container">
        <div className="body">

          <Row className="Div-Search">

              <Col xs="9">
                <Input size="lg" onChange={ this.handleChange } value={this.state.value2} ref="inS" placeholder="Input github username" />
              </Col>
              <Col xs="3">
                <Button size="lg" onClick={this.handleClick} block>Search</Button>     
              </Col> 

          </Row>

          <Row className="Div-detail">


              <Col xs="3" className="Div-logo">

               {avatar &&  <img src={avatar} className="Userlogo" alt="logo" /> }
  
              </Col>
              <Col xs="9" >
                <h1>{this.state.user.name}</h1> 
                 
                {bio && <h5>Bio :</h5>}
                 {bio && <h5>{bio}</h5>}



                <Row className="Div-list">
                  <Col xs="6">
                    {follower && <h5> {follower} follower :</h5>}

                    <div className="fol">
                      
                    {folVal}

                    </div>

                  </Col>

                  <Col xs="6">
                    {repos && <h5> {repos} Repository :</h5>}

                    <div className="fol">

                      {repoVal}

                    </div>

                  </Col>
                  
                </Row>

              </Col> 

          </Row>


        </div>

        <p className="App-intro">
          created by Kitti S.
        </p>


        
      </div>
    );
  }
}

export default App;
