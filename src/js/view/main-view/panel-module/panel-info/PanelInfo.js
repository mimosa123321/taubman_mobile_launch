var React = require('React');
var $ = require('jquery-compat');

var PanelInfo = module.exports = React.createClass({
    componentDidMount: function () {
        this.props.model.eventProxy.addListener('reset',function() {
            $('.info1').removeClass('hide').addClass('show');
            $('.info2').removeClass('show').addClass('hide');
        });
        return {}
    },

    handleSubmit: function () {
        $('.info1').removeClass('show').addClass('hide');
        $('.info2').removeClass('hide').addClass('show');
    },

    render:function() {
        var n = "\n";
        return <div className="info">
            <div  className = "info1">
                <div className="infoContent"><img src="./build/images/mobileinfo1.png" /></div>
                <div className="goAliBtn" onClick={this.handleSubmit}><img src="./build/images/goalibtn.png" /></div>
            </div>
            <div  className = "info2" >
                <div className="infoContent"><img src="./build/images/mobileinfo2.png" /></div>
            </div>
        </div>
    }
});