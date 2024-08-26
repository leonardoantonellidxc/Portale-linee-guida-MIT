///////////////////////////////////////////////////////////////////////////////////////////// 
/** 	
 * DemoN - Menu Side
 * Copyright (C) Gruppo36 from 1999 (All rights reserved)
 * @author Chiodi Paolo
*/
///////////////////////////////////////////////////////////////////////////////////////////// 



/////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * Classe Custom Features Side Menu, estesa dalla calasse base customFeatCommon.
*/
customFeatDatePicker = function(){
	///////////////////////////////
	$.classExtendInit(customFeatCommon, this);
	///////////////////////////////
}
/////////////////////////////////////////////////////////////////////////////////////////////
$.classExtend( customFeatCommon, customFeatDatePicker );
/////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * Costruttore della classe.
 * @param {Object} v dom, viewTg, view
*/
customFeatDatePicker.prototype.__construct = function( v ){
	///////////////////////////////
	this.init( v );
	///////////////////////////////
	let dateNow = Date.create();
	let dateYear = dateNow.getFullYear();
	let dateMonth = dateNow.getMonth();
	let monthDate = Date.create([dateYear ,dateMonth, 1]);
	let monthLastDay = monthDate.format('t');
	let dayN = monthDate.getDayN();
	/////////////////////////////// 
	this._dom = {
					'monthDays': $(this.Dom).find('.month-days'),
					'dropdownToggle': $(this.Dom).find('button.input-group-text.dropdown-toggle'),
	};
	///////////////////////////////
	$(this._dom.monthDays).empty();

	let prevLastDay = Date.create([dateYear, dateMonth-1, 1]).format('t') - dayN;
	///////////////////////////////
	let dayC = 0;
	if( dayN<6 ){
		for( let i=0; i<dayN; i++ ){
			///////////////////////////////
			const dom = '<div class="day empty">' + (prevLastDay+i) + '</div>'
			$(this._dom.monthDays).append( dom );
			dayC++;
		}
	}
	///////////////////////////////
	let daysDate = Date.create([dateYear,dateMonth,1]);	
	///////////////////////////////
	for( let i=0; i<monthLastDay; i++ ){
		///////////////////////////////
		const dom = $('<div class="day">' + daysDate.format('d') + '</div>');
		daysDate.modify( 1, 'day' );
		$(this._dom.monthDays).append( dom );

		if( i==dateNow.getDay() ){
			$(dom).addClass('active');
		}

		dayC++;

	}
	///////////////////////////////
	let resto = dayC%7;
	if( resto>0 ){
		for( let i=1; i<=(7-resto); i++ ){
			///////////////////////////////
			const dom = '<div class="day empty">' + (i) + '</div>'
			$(this._dom.monthDays).append( dom );
		}
	}

	///////////////////////////////
	$(this.Dom).on('mouseover', ( e ) => {
									///////////////////////////////
									$( e.currentTarget).addClass('hover');
				});
	///////////////////////////////
	$(this.Dom).on('mouseout', ( e ) => {
									///////////////////////////////
									$( e.currentTarget).removeClass('hover');
				});

	///////////////////////////////
	$(this._dom.dropdownToggle).on('click', ( e ) =>  {
												///////////////////////////////
												this.evDropdownClose();
												///////////////////////////////
												e.stopPropagation();
	});

	///////////////////////////////
	/*
	let dropdownMenu = $('.datepicker .dropdown-menu');
	///////////////////////////////
	$(dropdownMenu).on('click', ( e ) =>  {
								///////////////////////////////

								//console.error( 'dropdown', e.target )

								e.stopPropagation();

	});
	*/
	///////////////////////////////
	const days = $('.datepicker .month-days .day:not(.empty)');
	$(days).on( 'click', ( e ) => {
							///////////////////////////////
							$(days).removeClass('active');
							$(e.currentTarget).addClass('active');
							this.evDropdownClose( true );

	});
	///////////////////////////////
	const apply = $('.datepicker .date-footer .btn-primary');
	$(apply).on( 'click', ( e ) => {
							///////////////////////////////
							this.evDropdownClose( true );

	});
	///////////////////////////////
	const close = $('body, .datepicker .date-footer .btn');
	///////////////////////////////
	$(close).on( 'click', ( e ) => {
								///////////////////////////////
								this.evDropdownClose();
			});
	///////////////////////////////
};
/////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * Costruttore della classe.
 * @param {Object} v dom, viewTg, view
*/
customFeatDatePicker.prototype.evDropdownClose = function( apply=false ){
	///////////////////////////////
	$(this._dom.dropdownToggle).removeClass('show')
								.next()
								.removeClass('show');
	///////////////////////////////
	const days = $('.datepicker .month-days .day:not(.empty)');
	let day = $(days).filter('.active').text().trim();
	///////////////////////////////
	$(e.currentTarget).closest('.form-group').find('.form-control').val(day+'/06/2024');

	///////////////////////////////
};
/////////////////////////////////////////////////////////////////////////////////////////////