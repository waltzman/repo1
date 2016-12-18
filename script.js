
$("document").ready(function(){


function viewport() {
    var t = window,
        e = "inner";
    return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
        width: t[e + "Width"],
        height: t[e + "Height"]
    }
}


function get_all_section_wrappers_in_page() {
    var t = $("#main-content").find(".section-wrapper");
    return t
}



    $("#mobile-menu-icon").on('click', function() {
        if (window.innerWidth <= 768) {
            var t = $("#sidebar #mobile-menu-icon")
              , e = $("#sidebar #main-menu");
            e.is(":visible") ? e.addClass("menu_closed_on_xs").removeClass("menu_opened_on_xs").slideUp("fast", function() {
                t.removeClass("active")
            }) : e.addClass("menu_opened_on_xs").removeClass("menu_closed_on_xs").slideDown("fast", function() {
                t.addClass("active")
            })
        }
    });

function main_menu_visiblity_on_resize() {
    var t = $("#sidebar #main-menu");
    window.innerWidth > 768 ? t.hasClass("menu_closed_on_xs") && t.show() : (t.hasClass("menu_closed_on_xs") && t.hide(),
    t.hasClass("menu_opened_on_xs") && t.show())
}

function go_to_top_visibility() {
    var t = $("#go-to-top");
    if (t.length > 0) {
        var e = $(document).scrollTop();
        e < viewport().heigth ? t.removeClass("active") : t.addClass("active")
    }
}

$('#go-to-top').on('click', function() {
  $("html, body").stop().animate({scrollTop:0},1500,"easeInOutCubic",
  function() {
    $("#go-to-top").removeClass("active")
  })
});

$(window).resize(function()
   {
       // update variables already set in document.ready above
       amount_of_pixels_as_buffer_between_sections = 0.25 * ($(window).height()); // used in update_active_sections_on_scroll();

       // Sections Content Vertical Position
       //if (!jQuery.browser.mobile) sections_content_vertical_position();

       // Main Menu Visiblity on Window Resize
       main_menu_visiblity_on_resize();

       // Set equal height to all carousel slides on small displays
       //set_equal_height_to_all_carousel_slides_on_small_displays();

       // Position modal at the centre/middle of the page (if visible)
       //position_modal_at_centre();
});

var lastId,
    mainMenu = $("#sidebar"),
        // All list items
    menuItems = mainMenu.find("a"),

      // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
          var item = $($(this).attr("href"));
          if (item.length) {
            //console.log(item.length);
            return item; } });

           console.log(menuItems);
           console.log(scrollItems);


// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
    var href = $(this).attr("href"), offsetTop = href === "#intro" ? 0 : $(href).offset().top + 1;
    $('html, body').stop().animate({ scrollTop: offsetTop}, 1500, "easeInOutCubic");
      console.log(offsetTop);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() ;

    //console.log('fromTop=: '+fromTop);



    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($(this).offset().top <= fromTop) {

            return this;}
    });





    // Get the id of the current element
    cur = cur[cur.length-1];

    var id = cur && cur.length ? cur[0].id : "";

    if (id !== "intro")
     { $("#go-to-top").addClass("active")}
     else{ $("#go-to-top").removeClass("active")}


    if (lastId !== id) {
        lastId = id;
        console.log("id :"+id);

        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
        imgName=$('#'+id).data("custom-background-img");
        //console.log("imgName for id"+id+"is:"+imgName);

        $(".background-image-container").backstretch(imgName, {fade: 1500});

        


    }
});


});
