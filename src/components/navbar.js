import React from 'react';

export class NavBar extends React.Component {

  render() {
    const { collectionData } = this.props;
    const mainLink = (<button className="btn btn-dark mr-1" onClick={() => this.props.handleClick('/api/cities/')}>Menokalenteri</button>);
    const { loggedIn } = this.props;
    let naviLinks = [];
    let listIndex = 0;

    if (this.props.singleItem === true) {
      naviLinks.push(<li className="nav-item" key={listIndex++}>
      <button className="btn btn-dark mr-1" onClick={() => this.props.handleClick(collectionData.href)}>
        View Collection</button></li>);
 
    }
   
    collectionData.links.forEach((link, linkIndex) => {
      if (link.rel !== "profile") {
        naviLinks.push(<li className="nav-item" key={listIndex++}>
                        <button className="btn btn-dark mr-1" onClick={() => this.props.handleClick(link.href)}>
                        {link.prompt}</button></li>);
      }
    });

    let loginToggle = (<li className="nav-item" key={listIndex++}>
      <button className="btn btn-outline-light mr-1" onClick={() => this.props.loggedToggle()}>
        {loggedIn ? "Log Out" : "Log In"}</button></li>)

    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        {mainLink}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav mr-auto">
            {naviLinks}
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            {loginToggle}
          </ul>
        </div>  
      </nav>
    );
  }
}

