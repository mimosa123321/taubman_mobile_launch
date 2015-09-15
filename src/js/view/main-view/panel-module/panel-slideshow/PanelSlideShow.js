var React = require('React');
var $ = require('jquery-compat');


var PanelSlideShow = module.exports = React.createClass({
    getInitialState: function() {
        return {contents: []};
    },
    componentDidMount: function() {
        var self = this;

        this.myBxslider = React.findDOMNode(this.refs.bxslider1);
        this.initBxSlider();

        self.props.model.eventProxy.addListener('onClickSlideShowThumb', function(id){
            self.bxslider.goToSlide(id);
        });

        var text = self.props.contents.imagesUrl[0].caption;
        $('.captionText').html(text);
    },

    initBxSlider: function() {
        var self = this;
        if(self.bxslider == null){
            self.bxslider = $(self.myBxslider).bxSlider({
                speed: 500,
                pager: true,
                infiniteLoop: false,
                onSliderLoad: function(index) {
                    var pageTop = parseInt($('.panelSlideShow').css('height')) * 0.5 + 5;
                    $('.bx-pager').css('top',pageTop);
                    //console.log("bxslider load Done");
                },

                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    var currentPlayer = document.getElementById('slideShowVideo' + oldIndex);
                    if(currentPlayer != null) {
                        currentPlayer.pause();
                    }
                    var text = self.props.contents.imagesUrl[newIndex].caption;
                    $('.captionText').html(text);
                },

                onSlideAfter: function() {}
            });
        }

    },

    render:function(){
        var contentsNode =  this.props.contents.imagesUrl.map(function(contents, index) {
            var slideShowVideoId = 'slideShowVideo' + index;
            var player = 'player' + (index + 1);

            return (contents.type === "video"?
                <li key={index}>
                    <div className="slideShowVideoContainer">
                        <video className="slideShowVideo" id={slideShowVideoId} ref="slideShowVideo" poster={contents.cover} src={contents.url} width="auto" height="100%"></video>;
                    </div>

                </li>:
                <li key={index}><img src={contents.url}/></li>)
        });

        return <div className = "panelSlideShow">
            <div className= "caption">
                <div className = "captionContents">
                    <img src="./build/images/caption.png"/>
                    <p className="captionText"></p>
                </div>
            </div>
            <ul className="bxslider" id = "bxslider1" ref="bxslider1">
                {contentsNode}
            </ul>
        </div>
    }
});
