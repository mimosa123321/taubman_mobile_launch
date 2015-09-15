var React = require('React');
var InfoButton = require('./InfoButton');

var InfoMap= module.exports = React.createClass({
    render:function() {
        return <div className = "map">
            <div className = "bg">
                <img src="./build/images/map.png" />
            </div>
            <InfoButton model = {this.props.model}/>
        </div>
    }
});
