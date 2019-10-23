import React from 'react';

// Helper function for printing rows of CollectionJSON resources
class CollectionRow extends React.Component {

  render () {
    const { itemData } = this.props;
    let venueName, venueUrl, venueEventsUrl;
    
    itemData.data.forEach( (item) => {
      if (item.name === "name") {venueName = item.value;}
      else if (item.name === "url") {venueUrl = item.value;}
    });

    itemData.links.forEach( (item) => {
      if (item.rel === "events-in") {
        venueEventsUrl = item.href;
      }
    });

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{venueName}</h5>
          <p className="card-text">This is a venue description</p>
          <button className="btn btn-info mr-1" onClick={() => this.props.handleClick(venueEventsUrl)}>
          View events
          </button>
          <button className="btn btn-link mr-1" href={venueUrl}><a href={venueUrl}>Homepage</a></button>
        </div>
      </div>
    );
  }
}

export class VenueCollection extends React.Component {

  render () {
    const { collectionData } = this.props;
    let venues = <div>No venues in this city yet. Add one below!<br /></div>;
    try {
     venues = collectionData.items.map((item, itemindex) => (
            <CollectionRow itemData={item} key={itemindex} handleClick={this.props.handleClick}/>
      ))
    } catch {}
    
    return (
        <div className="contents">
          <div className="contentControls"></div>
          <br /><br />
          {venues}      
          <div className="contentControls"></div>
        </div>
    );
  }
}