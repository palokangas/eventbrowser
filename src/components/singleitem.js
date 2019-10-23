import React from 'react';

export class SingleItem extends React.Component {

  render () {
    const { collectionData } = this.props;
    const collectionItem = collectionData.items[0];

    const itemOutput = collectionItem.data.map( (item) => (
        <p key={item.name}><strong>{item.prompt}: </strong> {item.value}</p>
    ));

    const linksOutput = collectionItem.links.map( (item, itemIndex) => (
        <button className="btn btn-info mr-1" onClick={() => this.props.handleClick(item.href)}>
            {item.prompt}
        </button>
    ));

    return (
        <div className="contents">
          <div className="contentControls"></div>
            <br /> <br />
          <div className="card">
            <div className="card-header">
                {collectionItem.data[0].value}
            </div>
            <div className="card-body">
                {itemOutput}
                {linksOutput}
            </div>
          </div>
          <div className="contentControls"><br /> <br /></div>
        </div>
    );
  }
}

