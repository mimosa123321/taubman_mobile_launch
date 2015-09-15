var $ = require('jquery-compat');

module.exports = function() {
    this.stage = $(window);
    this.currentSection = 0;
    this.prevSection = 0;
    this.detailId = 0;
    this.preDetailId = null;
    this.isOpenPanel = false;
    this.pairs = [];
    this.getContentsURL = "./././contents.json";
    this.didShowSubContent = false;
    this.isOpenMenuPanel = false;
    this.headBarSection = [
        {section:'',img:'', title:''},
        {section:'retail',img:'build/images/icon1.png', title:'CHINA RETAIL BY THE NUMBERS'},
        {section:'branding',img:'build/images/icon2.png', title:'BRAND BONDING'},
        {section:'digital',img:'build/images/icon3.png', title:'DIGITALLY-ENABLED STRATEGIES'},
        {section:'mobile',img:'build/images/icon4.png', title:'MOBILE REALITY'},
        {section:'mall',img:'build/images/icon5.png', title:'NEXT-GENERATION MALL DESIGN'}
    ];
    this.infograpics = ['build/images/infographic1.png', 'build/images/infographic2.png',
        'build/images/infographic3.png',
        'build/images/infographic4.png']
};
