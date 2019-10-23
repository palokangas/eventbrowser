import React from 'react';

// Helper function for printing rows of CollectionJSON resources
class CollectionRow extends React.Component {

  render () {
    const { itemData } = this.props;
    const eventUrl = itemData.href;
    let eventVenueUrl, eventVenue, eventName, eventDescription, eventStart;

    itemData.data.forEach( (item) => {
      if (item.name === "name") {eventName = item.value;}
      else if (item.name === "description") {eventDescription = item.value;}
      else if (item.name === "startTime") {eventStart = item.value;}
      else if (item.name === "venue") {eventVenue = item.value;}
      else if (item.name === "venue_url") {eventVenueUrl = item.value;}
    });

    eventStart = new Date(eventStart).toLocaleString('fi-FI').slice(0, -3);
  
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{eventName} </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <a href={eventVenueUrl}>{eventVenue}</a> | {eventStart}</h6>
          <p className="card-text">
              {eventDescription}
          </p>
          <button className="btn btn-info mr-1" onClick={() => this.props.handleClick(eventUrl)}>More info</button>
          
        </div>
      </div>
    );
  }
}

export class EventCollection extends React.Component {

  render () {
    const { collectionData } = this.props;

    return (
        <div className="contents">
          <div className="contentControls"></div>
          <br /><br />
          {collectionData.items.map((item, itemindex) => (
            <CollectionRow itemData={item} key={itemindex} handleClick={this.props.handleClick}/>
          ))}
          <div className="contentControls"></div>
        </div>
    );
  }
}

