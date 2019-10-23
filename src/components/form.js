import React, {Component} from 'react';

export class Form extends Component {
    constructor(props) {
        super(props);
        const collectionData = this.props.collectionData;
        const template = this.props.collectionData.template;
        let newTemplate = {};
        template.data.forEach((item) => {
            newTemplate[item.name] =  item.value;
        });

        // For single items and PUT requests, get
        // existing data from data fields to insert them into form
        if (this.props.singleItem) {
            collectionData.items[0].data.forEach((item) => {
                newTemplate[item.name] = item.value;
            });
        }
 
        this.state = newTemplate;
    }

    // Mirror changes in form fields to state values
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });
    }

    // Wrap template data for valid CollectionJSON
    // template for posting.
    wrapTemplate = () => {
        let newData = this.props.collectionData.template.data;
        newData.forEach((item) => {
            item.value = this.state[item.name];
        });
        return {"template": {"data": newData}};
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let method;
        if (this.props.singleItem) {method='put';}
        else {method='post';}
        this.props.handleSubmit(this.wrapTemplate(), method);
    }

    componentDidMount() {
        console.log("Form component mounted");
   }

    componentWillUnmount() {
        console.log("Form component unmounted");
    }

    render() {
        const { collectionData } = this.props;
        const template = collectionData.template;
        
        // Provided collectionJSON does not broadcast difference between PUT and POST
        // so we are hardcoding this RESTfully: POST (add new) for collection resources
        // and PUT (edit) for single items.
        let title;
        if (this.props.singleItem) {
            title = "Edit information";
        } else {
            title = `Add new item to collection`;
        }
        let formFields =  [];

        try { 
            template.data.forEach((item, itemIndex) => {
                formFields.push(
                <div className="form-group" key={itemIndex}>
                    <label>{item.prompt} </label>
                    <input className="form-control"
                            type="value"
                            name={item.name}
                            value={this.state[item.name]}
                            onChange={this.handleChange} />
                </div>
                )
            });
        } catch {}

        return (
            <div className="card">
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <div className="form">
                        <form onSubmit={this.onFormSubmit}>
                        {formFields}
                        <button type="submit" className="btn btn-info ml-2">
                        Submit
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
