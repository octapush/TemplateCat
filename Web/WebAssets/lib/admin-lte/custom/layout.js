$(document).ready(function () {
    var rawPageConfigurations = $('#page-config').html();
    var pageConfigurations = JSON.parse(rawPageConfigurations);
    var breadcrumbWrapper = $('.breadcrumb');
    var breadcrumbContent = "";

    breadcrumbContent = '<ol class="breadcrumb">';
    $.each(pageConfigurations.breadcrumbData, function (dataIndex, dataValue) {
        var icon = dataValue.icon;
        var caption = dataValue.caption;
        var url = dataValue.url;
        var breadcrumbElement = "";
        
        breadcrumbElement += '<li>';

        if (url != undefined) {
            breadcrumbElement += '<a href="' + url + '">';
        }

        if (icon != undefined) {
            breadcrumbElement += '<i class="' + icon + '"></i>';
        }

        breadcrumbElement += caption;

        if (url != undefined) {
            breadcrumbElement += '</a>';
        }

        breadcrumbElement += '</li>';
        breadcrumbContent += breadcrumbElement;
    });
    breadcrumbContent += '</ol>';

    var headerWrapper = $('.content-header');
    var pageTitle = '<h1>' + pageConfigurations.mainTitle + ' <small>' + pageConfigurations.subTitle + '</small> </h1>';

    headerWrapper.html(pageTitle + breadcrumbContent);



    var menuId = pageConfigurations.menuId;
    var currentMenu = $('[menu-id="' + menuId + '"]');
    var currentMenuWrapper = currentMenu.parent();
    var rootMenu = currentMenuWrapper.parent();
    currentMenu.addClass("active");
    rootMenu.addClass('active');
    rootMenu.addClass('menu-open');
});