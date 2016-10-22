var React = require('react')
var ReactDOM = require('react-dom')

var SnippetsList = React.createClass({
    loadSnippetsFromServer: function(){
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
            	console.log(data);
                this.setState({data: data.results});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadSnippetsFromServer();
        setInterval(this.loadSnippetsFromServer, 
                    this.props.pollInterval)
    }, 
    render: function() {
        if (this.state.data) {
            console.log('DATA!')
            var snippetNodes = this.state.data.map(function(snippet){
                return <li> {snippet.url} </li>
            })
        }
        return (
            <div>
                <h1>Hello React!</h1>
                <ul>
                    {snippetNodes}
                </ul>
            </div>
        )
    }
})

ReactDOM.render(<SnippetsList url='/snippets/' pollInterval={1000} />, 
    document.getElementById('container'))