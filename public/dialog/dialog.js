b5mKorea.utils.dialog = function(name, container, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.container = $(container);
    this.init();
}

b5mKorea.utils.dialog.prototype = {
    init: function() {
        this.dialog = $('<div id="dialog-' + this.name + '" class="dialog" style="width:' + this.width + 'px;height:' + this.height + 'px"><a href="javascript:void(0)" class="dialog-close">关闭</a></div>').appendTo('body').append(this.container);
        this.mask = this.createMask();
        this.close = this.dialog.find('.dialog-close').click($.proxy(this.onClose, this));
    },
    createMask: function() {
        if (b5mKorea.utils.dialog.mask) {
            return $('.dialog-mask');
        }
        b5mKorea.utils.dialog.mask = true;
        return $('<div class="dialog-mask"></div>').appendTo('body');
    },
    open: function(fun) {
        this.dialog.show();
        this.mask.show();
        this.setPos();
        $(window).on('resize', $.proxy(this.setPos, this));
        if (typeof fun === 'function') {
            fun.call(this);
        }
    },
    onClose: function() {
        this.dialog.hide();
        this.mask.hide();
        $(window).off('resize', this.setPos);
    },
    setPos: function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
            winHeight = document.documentElement.clientHeight || document.body.clientHeight,
            winWidth = document.documentElement.clientWidth || document.body.clientWidth,
            ie6 = b5mKorea.utils.ie6;
        this.dialog.css({
            top: (winHeight - this.height) / 2 - 20 + (ie6 ? scrollTop : 0),
            left: (winWidth - this.width) / 2 - 10
        });
        this.mask.height(ie6 ? scrollHeight : winHeight);
    }
};