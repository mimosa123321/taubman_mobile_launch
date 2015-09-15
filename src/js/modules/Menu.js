$ = require('jquery-compat');

var Menu = module.exports = function(model) {
    var self = this;
    this.model = model;
    this.isOpen = false;
    this.menu = [];
    this.init();
    this.initLogo();
    this.model.eventProxy.addListener('changeMenuBtn',function(id){
        self.choseMenu(id - 1);
    });
};

Menu.prototype.init = function() {
    var self = this;
    var menu = $('.menuButton');
    menu.each(function(index){
        //self.menu.push($(this));
        $(this).click(function(){
            //$('.menu').removeClass('chosen');
            if(self.model.currentSection) {
                self.model.prevSection = self.model.currentSection;
            }
            self.model.currentSection = index + 1;
            self.model.eventProxy.emit('onChangeSection');
            self.model.prevSection = self.model.currentSection;
            self.restore();
            //$(this).addClass('chosen');
        });
    });

    $('#menuIcon').click(function(){
        if(!self.isOpen) {
            $('.menu').removeClass('hide').addClass('show');
            $(this).addClass('active');
            self.model.isOpenMenuPanel = true;
            $('#wrapper').css('overflow','hidden');
            self.isOpen = true;
            return;
        }else {
            self.restore();
        }
    });
};

Menu.prototype.restore = function() {
    var self = this;
    self.model.isOpenMenuPanel = false;
    $('#wrapper').css('overflow','inherit');
    self.isOpen = false;
    self.hideMenu();
};

Menu.prototype.hideMenu = function() {
    $('.menu').removeClass('show').addClass('hide');
    $('#menuIcon').removeClass('active');
};



Menu.prototype.choseMenu = function(id) {
    var self = this;
    if(id === -1) {
        $('.menu').removeClass('chosen');
        return;
    }
    var menu = $('#menusList').find('.menu');
    menu.each(function(index){
        if(index === id) {
            $('.menu').removeClass('chosen');

            $(this).addClass('chosen');
        }
    });
};

Menu.prototype.initLogo = function() {
    var self = this;
    var logo = $('#logo');
    logo.click(function(){
        self.model.eventProxy.emit('onBackHomePage');
        $('.menu').removeClass('chosen');
        //$('#pagesApp').css('visibility','hidden');
    });
};

