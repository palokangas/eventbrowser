import React from 'react';
import ReactDOM from 'react-dom';
import { CityCollection } from './components/city';
import { EventCollection } from './components/event';
import { VenueCollection } from './components/venue';
import { SingleItem } from './components/singleitem'
import { NavBar } from './components/navbar';
import { Form } from './components/form';
import * as serviceWorker from './serviceWorker';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cjson: false,
      loadFinished: false,
      apiUrl: '/api/cities/',
      apiDomain: 'http://localhost:5000',
      loggedIn: false,
      notification: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loggedToggle = this.loggedToggle.bind(this);
  }
 
  fetchResource () {
    console.log("Fetching data from api address: ");
    console.log(this.state.apiDomain + this.state.apiUrl);
    this.setState({loadFinished: false},)
    fetch(this.state.apiDomain + this.state.apiUrl)
    .then(res => res.json())
    .then(res => {
      this.setState({cjson: res,
                     loadFinished: true,})
    })
    .catch(console.log);
  }

  handleSubmit (submitTemplate, method) {
    
    fetch(this.state.apiDomain + this.state.apiUrl, {
      method: method,
      headers: {
        'Accept': 'application/vnd.collection+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitTemplate)
    })
    .then((res) => {
      this.isError = false;
      if (res.status >= 400) {
        this.isError = true;
         return res.json();
      } else {
        this.isError = false;
        console.log("Success");
        return res.headers;
      }
   })
    .then(res => {
      if (this.isError) {
        console.log("There was an error");
        let errorMessage = <p className="alert alert-warning">
                             {res['collection']['error']['message']}</p>;
        this.setState({notification: errorMessage});
      } else {
        let successMessage = <p className="alert alert-success">Success</p>
        let newLocation = res.get("location").replace(this.state.apiDomain, "");
        this.setState({notification: successMessage,
                       apiUrl: newLocation}, () => {
          this.fetchResource();
        }
      );
    }})
    .catch((error) => {
      console.log(error)
    });
  }

  notification () {
    if (this.state.notification) {
      return this.state.notification;
    } else {
      return false;
    }
  }

  componentDidMount () {
    this.fetchResource();    
   }

  loggedToggle () {
    const newToggle = !this.state.loggedIn;
    console.log("Toggling logged from", this.state.loggedIn, !this.state.loggedIn);
    this.setState({loggedIn: newToggle,
                    notification: false});
  }

  // Set state to new api resource and provide
  // callback for handling resource fetching when state update completed
  handleClick(newUrl) {
    console.log('The link was clicked and the apiUrl was:');
    console.log(newUrl);
    this.setState({notification: false,
                     apiUrl: newUrl},
                   () => this.fetchResource())
  }

  render () {
    if (!this.state.loadFinished) {
      return ("");
    }
    
    // Get last part of the api resource, ie. /cities/ /venues/ /events/ or "else"
    // This is for conditional rendering of resources
    const lastPart = this.state.apiUrl.split('/').slice(-2)[0];
    const notification = this.notification();
    const loggedIn = this.state.loggedIn;
    let singleItem = false;
    let mainContent;
    if (lastPart === 'cities') {
      console.log("We are rendering a city collection");
      mainContent = <CityCollection collectionData={this.state.cjson.collection}
                                    handleClick={this.handleClick}
                                    collectionName={lastPart}/>;
    } else if (lastPart === 'venues') {
      console.log("We are rendering a venue collection");
      mainContent = <VenueCollection collectionData={this.state.cjson.collection}
                                     handleClick={this.handleClick}
                                     collectionName={lastPart}/>;
    } else if (lastPart === 'events') {
      console.log("We are rendering an event collection");
      mainContent = <EventCollection collectionData={this.state.cjson.collection}
                                     handleClick={this.handleClick}
                                     collectionName={lastPart}/>;
    } else {
      console.log("We are rendering a single item");
      singleItem = true;
      mainContent = <SingleItem collectionData={this.state.cjson.collection}
                                collectionName={lastPart}
                                handleClick={this.handleClick}/>;
    }
   
    return (
      <div>
      <NavBar collectionData={this.state.cjson.collection}
              singleItem = {singleItem}
              loggedIn = {this.state.loggedIn}
              loggedToggle = {this.loggedToggle}
              handleClick={this.handleClick}
              />
        <div className="container">
        <div className="notification">{notification ? notification : ""}</div>
        <div className="navigation"></div>
            {mainContent}
        <div className="notification">{notification ? notification : ""}</div>
          {loggedIn ? (
          <Form collectionData={this.state.cjson.collection}
                handleSubmit={this.handleSubmit}
                singleItem = {singleItem}/>) : ""}
      <br /><br /><br />
      </div>
      </div>
    );
  }
}   



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
