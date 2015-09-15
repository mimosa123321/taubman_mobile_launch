var React = require('React');

var PanelText = module.exports = React.createClass({
    getInitialState: function() {
        return {contents: []};
    },
    componentDidMount: function() {

    },
    render:function(){
        /*<div className = "socialIcons">
         <ul>
         <li><img src="./build/images/fbicon.png" /></li>
         <li><img src="./build/images/linkedinicon.png" /></li>
         <li className="twitter"><img src="./build/images/twittericon.png" /></li>
         <li className="weibo"><img src="./build/images/weiboicon.png" /></li>
         </ul>
         </div>*/

        var url = this.props.contents.url;
        return <div className = "panelImage">

            <div className = "image">
                <img src = {url} />
            </div>
        </div>
    }
});
