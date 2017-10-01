$(document).ready(function() {
    // init Masonry
    var $grid = $('.grid').masonry({
        itemSelector: 'none', // select none at first
        columnWidth: '.grid-col-sizer',
        gutter: '.grid-gutter-sizer',
        percentPosition: true,
        horizontalOrder: false,
        stagger: 30,
        // nicer reveal transition
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    // get Masonry instance
    var msnry = $grid.data('masonry');

    // initial items reveal
    $grid.imagesLoaded(function() {
        $grid.removeClass('are-images-unloaded');
        $grid.masonry('option', { itemSelector: '.grid-item' });
        var $items = $grid.find('.grid-item');
        $grid.masonry('appended', $items);
    });

    // load more
    var maxPage = $('#box').data('max');

    function getPenPath() {
        if (this.pageIndex < maxPage) {
            // console.log(this.loadCount);
            console.log(this.pageIndex);
            return 'http://localhost:3000/getProjectList/' + (this.pageIndex + 1);
        }
    }

    // init Infinte Scroll
    $grid.infiniteScroll({
        path: getPenPath,
        append: '.grid-item',
        outlayer: msnry,
        status: '.page-load-status',
        scrollThresold: 100,
        history: false,
        elementScroll: '#projectsWrap',
        debug: true
    });


});