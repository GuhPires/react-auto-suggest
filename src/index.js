 import React, { Component } from 'react'
 import ReactDOM from 'react-dom'

 import './index.css';

 export default class AutoSuggest extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            selected: '',
            showSuggestion: false
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick.bind(this), false);
    }

    handleClick(e){
        if(this.node && !this.node.contains(e.target)){
            this.closeSuggestions()
        }
    }

    closeSuggestions(){
        this.setState({
            showSuggestion: false
        })
    }

    handleInputChange(e){
        console.log('E (input): ', e.target.value);
        let data = [];
        if(e.target.value){
            data = this.props.data.filter(d => d[this.props.inputKey].toLowerCase().includes(e.target.value.toLowerCase()));
            console.log('Data: ', data);
        }
        this.setState({
            data,
            selected: e.target.value,
            showSuggestion: true
        })
    }

    selectOption(data, e){
        e.stopPropagation();
        console.log('E (click): ', data);
        this.setState({
            selected: data[this.props.inputKey],
            showSuggestion: false
        });
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick.bind(this), false);
    }

    render(){
        return(
            <div ref={node => this.node = node} className="auto-suggest-wrapper">
                <input className="auto-suggest" type="text" value={this.state.selected} onChange={this.handleInputChange.bind(this)} style={{width: "100%"}} placeholder={this.props.placeholder} />
                <div className="suggestion-wrapper" style={this.state.showSuggestion ? {display: 'flex'} : {display: 'none'}}>
                    {this.state.data.length > 0 && this.state.data.map((d, i) => (
                        <span key={i} className="suggestion-content" onClick={this.selectOption.bind(this, d)}>{d[this.props.inputKey]}</span>
                    ))}
                    {this.state.data.length < 1 && <span style={{padding: '10px'}}>{this.props.noResultsText}</span>
                    }
                </div> 
            </div>
        )
    }
}

ReactDOM.render(<AutoSuggest data={[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana'}, {label: 'Peach', value: 'pearch'}, {label: 'Grape', value: 'grape'}, {label: 'Watermellon', value: 'watermellon'}]} inputKey="label" placeholder="Search for a fruit..." noResultsText="No results Found :("/>, document.getElementById('root'))