(function (reff) {
    'use strict';

    const main = {
        register: function () {
            if (reff.registerAsGlobal)
                main.utilities.GlobalRegistrar.apply();

            main.events.register.apply();
        },
        ui: {
            builder: {
                sideMenu: function (schema) {
                    if (!schema) return;

                    $('ul.sidebar-menu[data-widget="tree"]').html(menuItemBuilder(schema));

                    main.ui.patcher.sidebar.setSelected.apply();
                    main.events.sidebarItem.onClick.apply();

                    function menuItemBuilder(menuItems, isRoot = true) {
                        let output = '';

                        $.each(menuItems,
                            function (k, v) {
                                const menuText = v.Childs.length === 0b0
                                    ? v.Title
                                    : `
                                        <span>${v.Title}</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-left pull-right"></i>
                                        </span>
                                    `;

                                const childMenus = `<ul class="treeview-menu">${menuItemBuilder(v.Childs, false)}</ul>`;

                                const menuDom = `
                                                <li class="${isRoot && v.Childs.length > 0b0 ? 'treeview' : ''}">
                                                    <a href="${main.utilities.createUri(v.Target)}">
                                                        ${v.Icon !== '' ? `<i class="fa ${v.Icon}"></i>` : ''}
                                                        <span>${menuText}</span>
                                                    </a>
                                                    ${v.Childs.length > 0b0 ? childMenus : ''}
                                                </li>
                                            `;

                                output += menuDom;
                            });

                        return output;
                    }
                }
            },
            patcher: {
                loading: {
                    hide: function () {
                        $('div.loading-container').fadeOut(0b1011101110);
                    },
                    show: function () {
                        $('div.loading-container').fadeIn(0b1011101110);
                    }
                },
                sidebar: {
                    setSelected: function () {
                        $(`ul.sidebar-menu a[href="${reff.w.location.href}"]`)
                            .closest('li')
                            .addClass('active');
                    }
                }
            }
        },
        events: {
            register: function() {
                main.events.document.register.apply();
            },
            document: {
                register: function() {
                    if (true !== reff.developerMode)
                        main.utilities.userManager.loginChecker.apply();

                    main.events.document.load.apply();
                },
                load: function() {
                    main.utilities.getSideMenuItems(function(d) {
                        main.ui.builder.sideMenu(d);
                        main.events.document.ready.apply();
                    });
                },
                ready: function() {
                    $(function () {
                        setTimeout(
                            function () {
                                main.ui.patcher.loading.hide.apply();
                            },
                            0b1011101110 * 0b10
                        );

                        main.events.navbar.screenfull.onClick.apply();
                    });
                }
            },
            navbar: {
                screenfull: {
                    onClick: function () {
                        $('a#app-full-screen-toggle').on('click',
                            function () {
                                reff.vendor.screenfull.toggle($('body')[0b0]);
                            });
                    }
                }
            },
            sidebarItem: {
                onClick: function () {
                    $('ul.sidebar-menu a').on('click',
                        function (e) {
                            const that = $(this);

                            e.preventDefault();
                            main.ui.patcher.loading.show.apply();

                            setTimeout(function () {
                                reff.w.location.href = that.attr('href');
                            },
                                0b1011101110 * 0b10);
                        });
                }
            }
        },
        utilities: {
            GlobalRegistrar: function() {
                reff.w[reff.registerNamespace] = {
                    vendor: reff.vendor,
                    utilities: {
                        callbackRunner: main.utilities.callbackRunner,
                        createUri: main.utilities.createUri,
                        numberFormat: main.utilities.numberFormat,
                        trakindoNumberFormat: main.utilities.trakindoNumberFormat,
                        userManager: main.utilities.userManager,
                        notification: main.utilities.notification,
                        simpleExcel: main.utilities.ExcelHandler
                    }
                };
            },
            getSideMenuItems: function (cb) {
                const nConfig = reff.services.configurations.sideMenu;
                nConfig.url = main.utilities.createUri(nConfig.url);

                $.ajax(nConfig)
                    .done(function (r) {
                        r = JSON.parse(r.output);
                        if (cb) cb(r);
                    })
                    .fail(function (j, t, e) {
                        console.log(j, t, e);
                    });
            },
// ReSharper disable UnusedParameter
            callbackRunner: function (cb, arg1, arg2, arg3) {
// ReSharper restore UnusedParameter
                const arg = arguments;
                if (cb) cb(arg);
            },
            createUri: function (subPath) {
                subPath = subPath || '';

                return (function (wl, wlo) {
                    return `${getBaseUri()}${subPath}`;

                    function getBaseUri() {
                        return -0b1 !== wlo.indexOf('localhost') ? `${wlo}/` : `${wlo}/${wl.pathname.split('/')[0b1]}/`;
                    }
                })(reff.w.location, reff.w.location.origin);
            },
            numberFormat: function (number, decimals, decPoint, thousandsSep) {
                const n = !isFinite(+number) ? 0b0 : +number;

                const prec = !isFinite(+decimals) ? 0b0 : Math.abs(decimals);
                const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
                const dec = (typeof decPoint === 'undefined') ? '.' : decPoint;

                const toFixedFix = function (n, prec) {
                    const k = Math.pow(0b1010, prec);
                    return Math.round(n * k) / k;
                };

                const s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');

                if (0b11 < s[0b0].length)
                    s[0b0] = s[0b0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);

                if ((s[0b1] || '').length < prec) {
                    s[0b1] = s[0b1] || '';
                    s[0b1] += new Array(prec - s[0b1].length + 0b1).join(0b0.toString());
                }

                return s.join(dec);
            },
            trakindoNumberFormat: function (numb) {
                return main.utilities.numberFormat(parseFloat(numb).toFixed(0b10), 0b10, '.', ',');
            },
            ExcelHandler: function (options) {
                (function(refff) {
                    options = $.extend({
                        title: 'Sample Excel Export',
                        sheetName: 'Sample Sheet',
                        headers: refff.sampleHeaders(5),
                        rows: refff.sampleRows(5, 5),
                        filename: 'ExcelExport',
                        author: 'Developer Trakindo',
                        createdDate: new Date()
                    }, options);

                    refff.createExcel(options);
                })({
                    createExcel: function (opt) {
                        const xlu = reff.vendor.excel.utils;
                        const wb = xlu.book_new();

                        wb.Props = {
                            Title: opt.title,
                            Subject: opt.sheetName,
                            Author: opt.author,
                            CreatedDate: opt.createdDate
                        };

                        wb.SheetNames.push(opt.sheetName);
                        wb.Sheets[opt.sheetName] = xlu.aoa_to_sheet(this.compileData(opt));

                        saveAs(
                            new Blob(
                                [
                                    this.stringToArrayBuffer(reff.vendor.excel.write(
                                            wb,
                                            {
                                                bookType: 'xlsx',
                                                type: 'binary'
                                            })
                                    )
                                ],
                                {
                                    type: 'application/octet-stream'
                                }
                            ),
                            `${opt.filename}.xlsx`
                        );
                    },
                    compileData: function(opt) {
                        const output = [];

                        // Title
                        output.push([opt.title]);
                        output.push([]);
                        output.push([]);

                        output.push(opt.headers);

                        opt.rows.forEach(function(v) {
                            output.push(v);
                        });

                        return output;
                    },
                    stringToArrayBuffer: function (s) {
                        const buf = new ArrayBuffer(s.length);
                        const view = new Uint8Array(buf);

                        for (
                            let i = 0b0;
                            i < s.length;
                            view[i] = s.charCodeAt(i) & 0b11111111,
                            i++
                        ) {
                        }

                        return buf;
                    },
                    sampleHeaders: function(totalColumns) {
                        const output = [];
                        for (
                            let i = 0;
                            i < totalColumns;
                            output.push(`Header ${i + 1}`),
                            i++
                        ) { }

                        return output;
                    },
                    sampleRows: function(totalColumns, totalRows) {
                        const output = [];
                        for (
                            let i = 0;
                            i < totalRows;
                            (function(k) {
                                const row = [];
                                for (
                                    let j = 0;
                                    j < totalRows;
                                    row.push(`Row ${k + 1} Col ${j + 1}`),
                                    j++) {
                                }

                                output.push(row);
                            })(i),
                            i++
                        ) {
                        }

                        return output;
                    }
                });
            },
            notification: function (options) {
                options = $.extend({
                    type: 'success',
                    text: 'Hello World!',

                    closeButton: true,
                    debug: false,
                    newestOnTop: false,
                    progressBar: true,
                    positionClass: 'toast-top-right',
                    preventDuplicates: false,

                    onclick: null,

                    showDuration: 0b100101100,
                    hideDuration: 0b1111101000,
                    timeOut: 0b1001110001000,
                    extendedTimeOut: 0b1111101000,

                    showEasing: 'swing',
                    hideEasing: 'linear',
                    showMethod: 'fadeIn',
                    hideMethod: 'fadeOut'
                },
                    options
                );
                reff.vendor.toastr.options = options;

                reff.vendor.toastr[options.type](options.text);
            },
            userManager: {
                loginChecker: function () {
                    const sp = Cookies.get('sp');

                    if (!sp)
                        reff.w.location.href = `${reff.services.auth.loginWithReturn}${main.utilities.createUri()}`;
                },
                getProfile: function (cb) {
                    const nConfig = reff.services.configurations.userProfiler;
                    nConfig.url = main.utilities.createUri(nConfig.url);

                    $
                        .ajax(nConfig)
                        .done(function (r) {
                            r = JSON.parse(r.GetUserProfileCallResult);

                            if (r.result === true)
                                main.utilities.notification({
                                    text: `Welcome ${r.userprofiles.Employee_Name}!!!`
                                });

                            else
                                reff.w.location.href = `${reff.services.auth.loginWithReturn}${main.utilities.createUri()}`;

                            if (cb) cb(r);
                        })
                        // ReSharper disable UnusedParameter
                        .fail(function (j, t, e) {
                            // ReSharper restore UnusedParameter
                            alert('Can not initialize user profile.\n\nRedirecting to login page.');
                            reff.w.location.href = `${reff.services.auth.loginWithReturn}${main.utilities.createUri()}`;
                        });
                }
            }
        }
    };

    main.register.apply();
})({
    d: document,
    w: window,
    services: {
        auth: {
            loginWithReturn: 'http://portal.trakindo.co.id/_layouts/15/Trakindo/Authentication/Login.aspx?ReturnUrl=',
            getProfile: 'http://portal.trakindo.co.id/_layouts/15/TUPortalWS/Services/TUPortalWS.svc/GetUserProfileCall'
        },
        configurations: {
            sideMenu: {
                url: 'api/FileReader',
                method: 'GET',
                data: { 'subPath': 'side-menu-item.json' },
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            userProfiler: {
                url: '',
                crosscrossDomain: true,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }
        }
    },
    vendor: {
// ReSharper disable PossiblyUnassignedProperty
        screenfull: screenfull,
        toastr: toastr,
        excel: XLSX
// ReSharper restore PossiblyUnassignedProperty
    },
    developerMode: true,
    registerAsGlobal: true,
    registerNamespace: 'templateHelper'
});