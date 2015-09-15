var $ = require('jquery-compat');
var React = require('React');
var ContentModule = require('./content-module/ContentModule');
var InfoModule = require('./info-module/InfoModule');
var HomePage = require('./HomePage');
var PageTitleBar = require('./PageTitleBar');

var MainView = module.exports = React.createClass({
    componentDidMount: function() {
        this.props.model.eventProxy.addListener('onResizeEvent', this.onResize);
        this.isInitTap = false;
    },

    componentDidUpdate: function() {
        this.resizeContent();
        if(!this.isInitTap) {
            this.initButtonTap();
            this.isInitTap = true;
        }
    },

    initButtonTap: function() {
        var self = this;
        $('.pairs').each(function(index){
            var leftContent = $(this).find('.leftContent');
            var rightContent = $(this).find('.rightContent');
            var subContents;
            $(leftContent).swipe({
                tap: function(event, target) {
                    subContents = {
                        subContent: self.props.model.contents[index].leftContent.subContent,
                        type: self.props.model.contents[index].leftContent.type
                    };
                    self.onHandleButtonClick(subContents);
                }
            });

            $(rightContent).swipe({
                tap: function(event, target) {
                    subContents = {
                        subContent: self.props.model.contents[index].rightContent.subContent,
                        type: self.props.model.contents[index].rightContent.type
                    };
                    self.onHandleButtonClick(subContents);
                }
            });
        });
    },

    onResize: function() {

        this.domResizeContent();
    },

    resizeContent: function() {
        var height =  this.props.model.stage.height() * (1 - 0.16);
        var node1 = React.findDOMNode(this.refs.pair1);
        var node2 = React.findDOMNode(this.refs.pair2);
        var node3 = React.findDOMNode(this.refs.pair3);
        var node4 = React.findDOMNode(this.refs.pair4);
        var node5 = React.findDOMNode(this.refs.pair5);

        $(node1).css('height',height);
        $(node2).css('height',height);
        $(node3).css('height',height);
        $(node4).css('height',height);
        $(node5).css('height',height);
    },

    domResizeContent: function() {
        var height =  this.props.model.stage.height() * (1 - 0.16);
        $('#pair1').css('height',height);
        $('#pair2').css('height',height);
        $('#pair3').css('height',height);
        $('#pair4').css('height',height);
        $('#pair5').css('height',height);
    },

    onHandleButtonClick:function(subContent) {
        if(!this.props.model.didShowSubContent) {
            this.props.onShowSubContent(subContent);
            this.props.model.didShowSubContent = true;
            return;
        }
    },

    render: function() {
        var self = this;
        var myModel = this.props.model;
        myModel.pairs = [];
        var contentsNodes = this.props.contents.map(function (contents, index) {
            var pageId = index + 1;
            var contentId = 'pair' + (index + 1);
            myModel.pairs.push(contentId);
            if(index === 0) {
                return (
                        <div key={index} className="info pairs" id={contentId} ref={contentId} data-stellar-offset-parent="true">
                            <PageTitleBar model={myModel} pageId={pageId}/>
                            <InfoModule model = {myModel}/>
                        </div>
                    )
            }else {
                return (
                    <div key={index} className="pairs" id={contentId} ref={contentId}>
                        <PageTitleBar model={myModel} pageId={pageId}/>
                        <div className="contents">
                            <ContentModule model = {myModel} contents = {contents.leftContent}
                                           name = {'leftContent'}
                                           onButtonClick = {self.onHandleButtonClick}/>
                            <ContentModule model = {myModel} contents = {contents.rightContent}
                                           name = {'rightContent'}
                                           onButtonClick = {self.onHandleButtonClick}/>
                        </div>
                    </div>
                );
            }
        });

        if(this.props.contents.length > 0) {
            this.onResize();
        }

        return <div className="mainView">
            <HomePage model = {myModel}/>
            {contentsNodes}
        </div>
    }


});
