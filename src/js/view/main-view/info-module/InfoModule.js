var React = require('React');
var InfoDetail = require('./InfoDetail');
var InfoMap = require('./InfoMap');

var infoModule = module.exports = React.createClass({
    render:function() {
        //<div id="infoBg" className = "contentBg"><img id="infoBgImg" src= "build/images/pattern.png" /></div>
        //<InfoDetail model = {this.props.model} />
        return <div className = "contents" id="infoContent">

            <InfoMap model = {this.props.model} />
        </div>
    }
});



