var React = require('React');
var $ = require('jquery-compat');


var InfoButton= module.exports = React.createClass({
    componentDidMount: function() {
        this.icon = ["./build/images/buttonicon1.png", "./build/images/buttonicon2.png" ,"./build/images/buttonicon3.png" ,"./build/images/buttonicon4.png"];
        this.iconOver = ["./build/images/buttonicon1b.png", "./build/images/buttonicon2b.png" ,"./build/images/buttonicon3b.png" ,"./build/images/buttonicon4b.png"];
        $('.button-unit').addClass('notChosen');

        //this.handleSubmit(this.props.model.detailId);
        this.initButtonTap();
    },

    initButtonTap: function() {
        var self = this;
        $('.button-unit').each(function(index){
            var targetId = index + 1;
            $(this).swipe({
                tap: function(event, target) {
                    self.handleSubmit(targetId);
                }
            });
        });
    },

    handleSubmit: function(id) {
        var self = this;
        var index = id - 1;
        $('.button-unit').each(function(buttonId){
            if(buttonId != index) {
                $(this).removeClass('chosen hover').addClass('notChosen');
                $(this).find('.buttonTop').find('img').attr('src', self.icon[buttonId]);
            }
        });
        $('#button' + id).removeClass('notChosen').addClass('chosen');
        $('#button' + id).find('.buttonTop').find('img').attr('src', this.iconOver[index]);

        this.props.model.eventProxy.emit('onClickInfoButton', index);
    },

    handleOver: function(id) {
        $('.button-unit').removeClass('hover');
        $('#button' + id).addClass('hover');
        var index = id - 1;
        $('#button' + id).find('.buttonTop').find('img').attr('src', this.iconOver[index]);

    },

    handleOut: function(id) {
        var index = id - 1;
        $('#button' + id).removeClass('hover');
        if(!$('#button' + id).hasClass('chosen')) {
            $('#button' + id).find('.buttonTop').find('img').attr('src', this.icon[index]);
        }

    },

    render:function() {
        //console.log(this.props.model);
        var n = "\n";
        return <div className = "buttons">
            <div className = "button-unit" data-stellar-ratio="1.5" id="button1" onMouseOver={this.handleOver.bind(null,1)} onMouseOut={this.handleOut.bind(null,1)}>
                <div className = "buttonContainer">
                    <div className = "buttonTop">
                        <div className = "center"></div>
                        <img id="button1_img" src="./build/images/buttonicon1.png" />
                        <span className = "buttonTitle">Retail Industry</span>
                    </div>
                    <div className = "buttonLine"></div>
                    <div className = "buttonContent">
                        <div className = "center"></div>
                        <span className = "buttonText"><span className = "boldText">Number 1 tomorrow? {n}</span>China's retail sales were RMB 26 trillion in 2014, second only to the US</span>
                    </div>
                    <div className = "buttonDetail" id="buttonDetail1">
                        <div className= "buttonDetailContainer">
                            <span className="buttonDetailText">more details</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "button-unit" id="button2" onMouseOver={this.handleOver.bind(null,2)} onMouseOut={this.handleOut.bind(null,2)}>
                <div className = "buttonContainer">
                    <div className = "buttonTop">
                        <div className = "center"></div>
                        <img src="./build/images/buttonicon2.png" />
                        <span className = "buttonTitle">Demographics {n}and Economy</span>
                    </div>
                    <div className = "buttonLine"></div>
                    <div className = "buttonContent">
                        <div className = "center"></div>
                        <span className = "buttonText"><span className = "boldText">22%:</span> Projected annual spending surge{n}by upper middle class from 2012 to 2022  </span>
                    </div>
                    <div className = "buttonDetail" id="buttonDetail2">
                        <div className= "buttonDetailContainer">
                            <span className="buttonDetailText">more details</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "button-unit" id="button3" onMouseOver={this.handleOver.bind(null,3)} onMouseOut={this.handleOut.bind(null,3)}>
                <div className = "buttonContainer">
                    <div className = "buttonTop">
                        <div className = "center"></div>
                        <img src="./build/images/buttonicon3.png" />
                        <span className = "buttonTitle">E-Commerce</span>
                    </div>
                    <div className = "buttonLine"></div>
                    <div className = "buttonContent">
                        <div className = "center"></div>
                        <span className = "buttonText"><span className = "boldText">RMB 6.4 trillion:</span> Predicted value of{n}China's e-commerce sector by 2019 </span>
                    </div>
                    <div className = "buttonDetail" id="buttonDetail3">
                        <div className= "buttonDetailContainer">
                            <span className="buttonDetailText">more details</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "button-unit" id="button4" onMouseOver={this.handleOver.bind(null,4)} onMouseOut={this.handleOut.bind(null,4)}>
                <div className = "buttonContainer">
                    <div className = "buttonTop">
                        <div className = "center"></div>
                        <img src="./build/images/buttonicon4.png" />
                        <span className = "buttonTitle">Shopping Malls</span>
                    </div>
                    <div className = "buttonLine"></div>
                    <div className = "buttonContent">
                        <div className = "center"></div>
                        <span className = "buttonText"><span className = "boldText">44%</span> of all global shopping market{n}completions in 2014 were in China </span>
                    </div>
                    <div className = "buttonDetail" id="buttonDetail4">
                        <div className= "buttonDetailContainer">
                            <span className="buttonDetailText">more details</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
});
