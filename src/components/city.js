import React from 'react';

// Helper function for printing rows of CollectionJSON resources
class CollectionRow extends React.Component {
      
  render () {    
    const { itemData } = this.props;
    const cityName = itemData.data[0].value;
    const cityLink = itemData.links[0].href;
    const cityPrompt = itemData.links[0].prompt;

    return (      
      <div className="card">
        <div className="card-body mx-2">
          <h5 className="card-title">{cityName}</h5>
          <p className="card-text">Description of the city</p>

          <button className="btn btn-info"
                  onClick={() => this.props.handleClick(cityLink)}>
                  {cityPrompt}
          </button>
        </div>
      </div>
    );
  }
}

export class CityCollection extends React.Component {

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
