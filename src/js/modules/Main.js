var $ = require('jquery-compat'),
    Menu = require('./Menu');

var Main = module.exports = function(model) {
    this.model = model;
    this.menu = new Menu(this.model);
    this.app = $('#pagesApp');
    this.init();
    this.isOpenContent = false;
    this.showBarTimer = null;
    this.model.eventProxy.addListener('onChangeSection', this.changeSection.bind(this));
    this.model.eventProxy.addListener('onBackHomePage', this.backHomePage.bind(this));
    this.model.eventProxy.addListener('onUpdateHeaderbar', this.updateHeaderBar.bind(this));

};

Main.prototype.init = function() {
    this.model.currentSection = 0;
    this.pageTitleBar = $('#pageTitleBar');
    this.getContents();

    if (!Modernizr.csstransitions){
        $('.detail').css('display','none');
    }
};


Main.prototype.getContents = function() {
    var self = this;
    /*this.getData(this.model.getContentsURL).then(function(response){
        self.model.contents = JSON.parse(response).data;
        self.model.eventProxy.emit('onContentsReady');
    });*/
    $.get(this.model.getContentsURL, function(result) {
        self.model.contents = result.data;
        self.model.eventProxy.emit('onContentsReady');
    }.bind(this));
};

Main.prototype.changeSection = function() {
    //close panel
    if(this.model.isOpenPanel) {
        this.model.eventProxy.emit('onClosePanel');
    }

    var preSectionEle =  $('#pair' + (this.model.prevSection));
    var currentSectionEle = $('#pair' + (this.model.currentSection));

    if(this.model.prevSection !== this.model.currentSection) {
        if(this.model.currentSection > this.model.prevSection ) {
            preSectionEle.removeClass('show hide moveUp moveDown').addClass('hide moveUp');
            currentSectionEle.removeClass('show hide moveUp moveDown').addClass('show moveUp');
        }else {
            preSectionEle.removeClass('show hide moveUp moveDown').addClass('hide moveDown');
            currentSectionEle.removeClass('show hide moveUp moveDown').addClass('show moveDown');
        }
    }
};

Main.prototype.backHomePage = function() {
    $('html, body').animate({ scrollTop: "0px" });
};


Main.prototype.changeHeaderBar = function(section) {
    var self = this;
    if(!self.model.isOpenPanel) {
        if(section > 0) {
            this.pageTitleBar.removeClass('show hide').addClass('show');
            if(self.showBarTimer) {
                clearTimeout(self.showBarTimer);
                self.showBarTimer = null;
            }

            /*self.showBarTimer = setTimeout(function(){
                self.pageTitleBar.removeClass('show hide').addClass('hide');
            },2000);*/

            this.pageTitleBar.removeClass('retail branding digital mall mobile').addClass(self.model.headBarSection[section].section);
            this.pageTitleBar.find('img').attr('src',self.model.headBarSection[section].img);
            this.pageTitleBar.find('.title').html(self.model.headBarSection[section].title);



        }else {
            this.pageTitleBar.removeClass('show hide').addClass('hide');
        }
    }else {
        if(self.showBarTimer) {
            clearTimeout(self.showBarTimer);
            self.showBarTimer = null;
        }
        this.pageTitleBar.removeClass('show hide').addClass('show');
    }

};

Main.prototype.updateHeaderBar = function(section) {
    //var self = this;
    //this.pageTitleBar.removeClass('retail branding digital mall mobile').addClass(self.model.headBarSection[section].section);
    //this.pageTitleBar.find('img').attr('src',self.model.headBarSection[section].img);
    //this.pageTitleBar.find('.title').html(self.model.headBarSection[section].title);
};



/*Main.prototype.getData = function(url) {
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open('GET',url);
        req.onload = function() {
            if(req.status === 200) {
                resolve(req.response)
            }else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error('Network Error'));
        };

        // Make the request
        req.send();
    })
};*/
