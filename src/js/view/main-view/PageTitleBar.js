var React = require('React');

var PageTitleBar = module.exports = React.createClass({
    componentDidMount: function() {
    },

    render: function() {
        var pageClass = "show " + this.props.model.headBarSection[this.props.pageId].section;
        var imgSrc = this.props.model.headBarSection[this.props.pageId].img;
        var title = this.props.model.headBarSection[this.props.pageId].title;
        return  <div id="pageTitleBar" className={pageClass}>
            <span className="center"></span>
            <img src={imgSrc}/>
            <span className="title">{title}</span>
        </div>
    }
});
