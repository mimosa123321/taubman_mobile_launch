var React = require('React');

var ContentButton = module.exports = React.createClass({
    componentDidMount: function() {
    },

    handleSubmit: function(e) {
        this.props.onButtonClick();
        return;
    },

    render:function() {
        if(this.props.data) {
            var type = this.props.data.type;
            var text = this.props.data.text;
            var url = this.props.data.url;
        }
        return <div className = "contentButton">
            <div className="contentButton-img"><img src={url} /></div>
            <div className = "contentButton-text">{text}</div>
        </div>
    }
});





