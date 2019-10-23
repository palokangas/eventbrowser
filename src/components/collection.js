import React from 'react'

const Collection = ({ cjson }) => {
  
  
  function handleClick(apiUrl) {
    console.log('The link was clicked.');
  }
  
  return (
    <div>
      <h1>Select city</h1>
      {cjson.collection.items.map((body, ind) => ( 
        <div className="card" key={ind}>
          <div className="card-body">
            {body.data.map((dataitem, dataind) => (
                <h5 className="card-title" key={dataind}>{dataitem.value}</h5>
            ))}

            {body.links.map((link, linkind) => (
                <a className='card-text' key={linkind} href={link.href}>{link.prompt}</a>
            ))}

          </div>
        </div>
 
     ))};
    </div>
 )
};

export default Collection