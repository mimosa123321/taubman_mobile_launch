var React = require('React');

var HomePage = module.exports = React.createClass({
    componentDidMount: function() {
        return {};
    },

    componentDidUpdate: function() {
        var height = this.props.model.stage.height() * (1 - 0.16);
        var homePage = React.findDOMNode(this.refs.homePage);
        $(homePage).css('height',height);
    },

    clickDownloadPaper: function() {
        $('.emailForm').removeClass('hide').addClass('show');
    },

    checkForm:function() {
        this.closeForm();
    },

    closeForm:function() {
        $('.emailForm').removeClass('show').addClass('hide');
    },

    fbShareHandler: function() {
        fbShare();
    },

    render:function() {
        var bg = (isIE8? <div id="homePageBg"><img src="build/images/bg.jpg"/></div>:'');
        return <div className="homePage" id="homePage" ref="homePage" section="1">
            {bg}
            <div className ="contents">
                <div id="chinaMall">
                    <span className="center"></span>
                    <img src="build/images/chinamall.png"/>
                </div>

                <div id="scrollDownBtn">
                    <img src="build/images/scrollbtn.png"/>
                </div>
            </div>
        </div>
    }

});
