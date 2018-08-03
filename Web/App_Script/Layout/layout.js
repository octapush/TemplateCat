// FILENAME    : layout.js
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-07-09
// 
// ==========================================================

((reff) => {
	'use strict';

	const main = {
		register: () => (util => {
			util.rag && util.mug.apply();
			util.mer.apply();
		})({
			rag: reff.registerAsGlobal,
			mer: main.events.register,
			mug: main.utilities.GlobalRegistrar
		}),
		ui: {
			builder: {
				sideMenu: schema => {
					schema && (util => util.init(util))({
						init: util => (x => $.each(x, k => x[k].apply()))({
							write: () => $('ul.sidebar-menu[data-widget="tree"]').html(util.menuItemBuilder(util, schema)),
							mps: main.ui.patcher.sidebar.setSelected,
							msc: main.events.sidebarItem.onClick
						}),
						menuItemBuilder: (util, menuItems, isRoot) => {
							let output = '';

							isRoot = (isRoot === null || isRoot === undefined) ? true : isRoot;

							$.each(menuItems,
								(k, v) => {
									const menuText = v.Childs.length === 0b0 ?
										v.Title :
										`
											<span>${v.Title}</span>
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i>
											</span>
										`;

									const childMenus = `<ul class="treeview-menu">${util.menuItemBuilder(util, v.Childs, false)}</ul>`;

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
					});
				}
			},
			patcher: {
				loading: {
					hide: () => $('div.loading-container').fadeOut(0b1011101110),
					show: () => $('div.loading-container').fadeIn(0b1011101110)
				},
				sidebar: {
					setSelected: () => $(`ul.sidebar-menu a[href="${reff.w.location.href}"]`)
						.closest('li')
						.addClass('active')
				}
			}
		},
		events: {
			register: () => (util => $.each(util, k => util[k].apply()))({
				mdr: main.events.document.register
			}),
			document: {
				register: () => (util => util.init(util))({
					rdm: reff.developerMode,
					mum: main.utilities.userManager.loginChecker,
					mdl: main.events.document.load,
					init: util => {
						!util.rdm && util.mum.apply();
						util.mdl.apply();
					}
				}),
				load: () => (util => util.init(util))({
					mut: main.utilities.getSideMenuItems,
					mub: main.ui.builder.sideMenu,
					med: main.events.document.ready,
					init: util => util.mut((data) => {
						util.mub(data);
						util.med.apply();
					})
				}),
				ready: () => $(
					(util => util.init(util))({
						mpl: main.ui.patcher.loading.hide,
						mns: main.events.navbar.screenfull.onClick,
						mpm: main.events.panel.maximize.onClick,
						init: util => {
							setTimeout(() => util.mpl.apply(), 0b1011101110 * 0b10);

							util.mns.apply();
							util.mpm.apply();
						}
					})
				)
			},
			navbar: {
				screenfull: {
					onClick: () => $('a#app-full-screen-toggle').on('click', () =>
						reff.vendor.screenfull.toggle($('body')[0b0])
					)
				}
			},
			panel: {
				maximize: {
					onClick: () =>
						$('.btn-box-tool[data-widget="maximize"]').on('click', e => (util => util.init(util))({
							dom: $(e.currentTarget),
							init: util => util.dom.closest('.row').fadeOut(0b101011110, () => {
								util
									.dom
									.closest('.box')
									.toggleClass('fullwindow-document-target');

								util
									.dom
									.closest('.row')
									.toggleClass('fullwindow-container')
									.fadeIn(0b101011110);
							}),
						}))
				}
			},
			sidebarItem: {
				onClick: () => $('ul.sidebar-menu a').on('click', e => {
					const that = $(e.currentTarget);

					e.preventDefault();
					main.ui.patcher.loading.show.apply();

					setTimeout(() => reff.w.location.href = that.attr('href'), 0b1011101110 * 0b10);
				})
			}
		},
		utilities: {
			GlobalRegistrar: () => reff.w[reff.registerNamespace] = {
				ui: {
					notification: main.utilities.notification,
					messageBox: main.utilities.messageBox, // <== see ==> http://bootboxjs.com/examples.html,
					modalizer: main.utilities.modalizer // <== see ==> https://saribe.github.io/eModal/#demo
				},
				vendor: reff.vendor,
				utilities: {
					callbackRunner: main.utilities.callbackRunner,
					createUri: main.utilities.createUri,
					numberFormat: main.utilities.numberFormat,
					trakindoNumberFormat: main.utilities.trakindoNumberFormat,
					userManager: main.utilities.userManager
				}
			},
			getSideMenuItems: cb => {
				let nConfig = reff.services.configurations.sideMenu;
				nConfig = $.extend({
					url: main.utilities.createUri(nConfig.url)
				}, nConfig);

				$
					.ajax(nConfig)
					.done((r) => {
						r = JSON.parse(r.output);
						if (cb) cb(r);
					})
					.fail((j, t, e) => {
						console.log(j, t, e);
					});
			},
			// ReSharper disable UnusedParameter
			callbackRunners: (cb, arg1, arg2, arg3) => (cb && cb(arguments)),
			createUri: subPath => (util => util.init(util))({
				subPath: subPath || '',
				origin: window.location.origin,
				pathname: window.location.pathname,
				getBaseUri: util => (
					apn => `${util.origin}/${1 < apn.length ? apn[0b1] + '/' : ''}`
				)(util.pathname === '/' ? [] : util.pathname.split('/')),
				init: util => `${util.getBaseUri(util)}${util.subPath}`
			}),
			numberFormat: (number, decimals, decPoint, thousandsSep) => {
				const n = !isFinite(+number) ? 0b0 : +number;

				const prec = !isFinite(+decimals) ? 0b0 : Math.abs(decimals);
				const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
				const dec = (typeof decPoint === 'undefined') ? '.' : decPoint;

				const toFixedFix = (n, prec) => (k => Math.round(n * k) / k)(Math.pow(0b1010, prec));

				const s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');

				if (0b11 < s[0b0].length)
					s[0b0] = s[0b0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);

				if ((s[0b1] || '').length < prec) {
					s[0b1] = s[0b1] || '';
					s[0b1] += new Array(prec - s[0b1].length + 0b1).join(0b0.toString());
				}

				return s.join(dec);
			},
			trakindoNumberFormat: numb => main.utilities.numberFormat(parseFloat(numb).toFixed(0b10), 0b10, '.', ','),
			notification: (options) => {
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
			messageBox: reff.vendor.bootbox,
			modalizer: reff.vendor.eModal,
			userManager: {
				loginChecker: () => Cookies.get('sp') || (reff.w.location.href = `${reff.services.auth.loginWithReturn}${main.utilities.createUri()}`),
				getProfile: cb => {
					const nConfig = reff.services.configurations.userProfiler;
					nConfig.url = main.utilities.createUri(nConfig.url);

					$
						.ajax(nConfig)
						.done(r => {
							r = JSON.parse(r.GetUserProfileCallResult);

							if (r.result === true)
								main.utilities.notification({
									text: `Welcome ${r.userprofiles.Employee_Name}!!!`
								});

							else
								reff.w.location.href = `${reff.services.auth.loginWithReturn}${main.utilities.createUri()}`;

							if (cb) cb(r);
						})
						.fail(() => {
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
				data: {
					'subPath': 'side-menu-item.json'
				},
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
		excel: XLSX,
		bootbox: bootbox,
		eModal: eModal
		// ReSharper restore PossiblyUnassignedProperty
	},
	developerMode: true,
	registerAsGlobal: true,
	registerNamespace: 'templateHelper'
});