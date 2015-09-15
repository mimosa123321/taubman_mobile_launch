var $ = require('jquery-compat');
var React = require('React');
var MainView = require('./main-view/MainView');
var PanelModule = require('./main-view/panel-module/PanelModule');


var ViewsManager = module.exports = React.createClass({
    getInitialState: function() {
        return {contents: [],
            subContents: {},
            type:"",
            isHidePanel: true
        };
    },

    componentDidMount: function() {
        var self = this;
        self.model = this.props.model;
        self.model.eventProxy.addListener('onContentsReady',function() {
            self.updateContents(self);
        });

        self.model.eventProxy.addListener('onMenuClick',function() {
            self.updateContents(self);
        });

        self.model.eventProxy.addListener('onClosePanel',function() {
            self.onClosePanelHandler();
        });

        this.model.eventProxy.addListener('onClickInfoButton', function(index){
            var subContents = {
                subContent:{
                    contentId: index,
                    pageId: 1,
                    img: self.model.infograpics[index]
                },
                type:'info-trail'
            };
            self.onShowSubContent(subContents);
        });

        this.initSwipe();
    },

    initSwipe:function() {
        var count = 0;
        var self = this;
        $('.mainView').swipe({
            swipeUp: function(event, direction, distance, duration, fingerCount) {
                if(!self.model.isOpenMenuPanel) {
                    if( self.model.currentSection < 5) {
                        self.model.currentSection += 1;
                        self.model.eventProxy.emit('onChangeSection');
                        self.model.prevSection = self.model.currentSection;
                    }
                }
            },

            swipeDown: function(event, direction, distance, duration, fingerCount) {
                if(!self.model.isOpenMenuPanel) {
                    if(self.model.currentSection > 0) {
                        self.model.currentSection -= 1;
                        self.model.eventProxy.emit('onChangeSection');
                        self.model.prevSection = self.model.currentSection;
                    }
                }
            },
            threshold: 0
        });
    },

    onClosePanelHandler:function() {
        var self = this;
        var mainView = React.findDOMNode(this.refs.mainView);
        this.props.model.isOpenPanel = false;
        this.props.model.didShowSubContent = false;
        this.setState({isHidePanel:true});
        this.model.eventProxy.emit('reset');
        //allow drag after close panel
        $(mainView).css('overflow','none');
        $(window).scrollTop(0);
    },

    onShowSubContent:function(subContents) {
        var mainView = React.findDOMNode(this.refs.mainView);
        this.props.model.isOpenPanel = true;
        this.setState({subContents:subContents.subContent, type:subContents.type, isHidePanel:false});
        //avoid drag after open panel
        //this.model.saveScrollTop = $(window).scrollTop();
        $(mainView).css('overflow','hidden');

        //overflow: hidden;

        //this.props.model.eventProxy.emit("onUpdateHeaderbar",(subContents.subContent.pageId + 1));
    },

    updateContents:function(self) {
        var currentSection = this.model.currentSection - 1;
        var contents = this.model.contents;
        self.setState({contents: contents});
    },

    render: function() {
        return <div className="contents">
            <MainView model={this.props.model}
                      contents={this.state.contents}
                      onShowSubContent={this.onShowSubContent}
                      ref = "mainView"/>
            <PanelModule model={this.props.model}
                    hidden={this.state.isHidePanel}
                    contents={this.state.subContents}
                    type = {this.state.type}
                    onClickCloseBtn = {this.onClosePanelHandler}/>
        </div>;
    }
});