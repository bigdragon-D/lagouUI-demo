/**
 *  lagou.utils.js is for laoguUI by lance at 2015-11-5 
 */

/**
 *	声明命名空间
 */
var lg = window.lg || {};

/**
 *	lg.Utils 用于存放各种常用的方法，比如getRandom getDateCN 
 *
 */
lg.Utils = lg.Utils || {};

// lg.Utils = function(options) {

// }
	/**
	 *	获取随机数 常用于ID
	 */
lg.Utils.getRandom = function(num) {
		window._LG_RANDOM ? '' : window._LG_RANDOM = {};
		var _lg_random = window._LG_RANDOM || {},
			_num = num || 4,
			_random = getRandomSimple();
		while (_lg_random[_random]) {
			_random = getRandomSimple();
			if (!_lg_random[_random]) break;
		}
		window._LG_RANDOM[_random] = _random;
		return _random;
		//随即返回随机数  --  可能重复
		function getRandomSimple() {
			var random = '';
			for (var i = 0; i < _num; i++) {
				var r = Math.floor(Math.random() * 10);
				random += r.toString();
			}
			return random.toString();
		}
}
	/**
	 *	转换时间 如：2015年11月03日 10:53
	 */
lg.Utils.transformTimeCN = function(s) {
		return new Date(parseInt(s) * 1000).toLocaleString().substr(0, 17);
}
	/**
	 *	转换时间 如：2015-11-03 10:53:00
	 */
lg.Utils.transformTimeEN = function(s) {
		return new Date(parseInt(s) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ');
}
	/**
	 *	获取日期（中文） 如：2015年12月03日
	 */
lg.Utils.getDateCN = function() {
		var _date = new Date();
		var _year = _month = _day = 0;
		var currDate = '';
		_year = _date.getFullYear();
		_month = _date.getMonth() + 1;
		_day = _date.getDate();
		currDate += _year + '年';
		if (_month >= 10) {
			currDate += _month + '月';
		} else {
			currDate += '0' + _month + '月';
		}
		if (_day >= 10) {
			currDate += _day + '日';
		} else {
			currDate += '0' + _day + '日';
		}
		return currDate;
}
	/**
	 *	获取日期（英文） 如：2015-12-03
	 */
lg.Utils.getDateEN = function() {
		var _date = new Date();
		var _year = _month = _day = 0;
		var currDate = '';
		_year = _date.getFullYear();
		_month = _date.getMonth() + 1;
		_day = _date.getDate();
		currDate += _year + '-';
		if (_month >= 10) {
			currDate += _month + '-';
		} else {
			currDate += '0' + _month + '-';
		}
		if (_day >= 10) {
			currDate += _day;
		} else {
			currDate += '0' + _day;
		}
		return currDate;
}
	/**
	 *	给各位数加0
	 */
lg.Utils.addZero = function(int) {
	if(isNaN(parseInt(int)))return '0';
	if(int<10){
		return '0'+int;
	}else{
		return ''+int;
	}
}
/**
*	解决 低版本IE $.browser 未定义bug
*
*/

jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
;(function ($) {
	'use strict';
	var Checkbox = function (ele,option){
		this.ele = $(ele);
		this.option = option;
		this.dataSetting = this.ele.attr('data-dataSetting');
		this._default = {
            data:[],
            item:{
                value:'',
                text:''
            }, 
            template : '<div class="box_checkbox"><input type="checkbox" value="{{item.value}}" class="checkbox" id="{{data-id}}" data-text="{{item.text}}" ><label for="{{data-id}}" ></label></div>'
        };
        this.option = this.option == '' ? {} : this.option;
        $.extend(this._default, this.option);
        this.init();
	};
	Checkbox.prototype = {
		constructor : Checkbox,
		init : function (){
			if(this.dataSetting != null){
				var _setting = $.parseJSON(this.dataSetting);
				$.extend(this._default, _setting);
			}
			this.render();
		},
		render: function(){
			var that = this,
				id = lg.Utils.getRandom();
			this.ele.each(function() {
				var $this = $(this),
				    _text = $this.attr('data-text'),
				    _value = $this.val(),
				    _template = $(that._default.template);
				if($this.hasClass('screenbox')){
					_template.find('.checkbox').addClass('screenbox');
				}
				_template.find('input').attr('id',id);
            	_template.find('label').attr('for',id);
            	_template.find('input').attr({'data-text': _text,'value': _value}).siblings('label').text(_text);
            	_template.appendTo($this.parent());
			});
			this.ele.remove();	
		},
		setValue: function(str){
			this.ele.attr('data-text', str);
		},
		getValue: function(e){
			var self = this,
			    _template = $(self._default.template);
			return _template.find('input').val();
			e.stopPropagation();
		}
	};
	window['Checkbox'] = Checkbox;
	$.fn.checkbox = function (options){
		return this.each(function() {
			new Checkbox(this,options)
		});
	};
})(jQuery)
$(function(){
/*************    方法     **************/
    //判断是否是闰年,计算每个月的天数
    function leapYear(year){
        var isLeap = year%100==0 ? (year%400==0 ? 1 : 0) : (year%4==0 ? 1 : 0);
        return new Array(31,28+isLeap,31,30,31,30,31,31,30,31,30,31);
    }

    //获得某月第一天是周几
    function firstDay(day){
        return day.getDay();
    }

    //获得当天的相关日期变量
    function dateNoneParam(){
        var day = new Date();
        var today = new Array();
        today['year'] = day.getFullYear();
        today['month'] = day.getMonth();
        today['date'] = day.getDate();
        today['hour'] = day.getHours();
        today['minute'] = day.getMinutes();
        today['second'] = day.getSeconds();
        today['week'] = day.getDay();
        today['firstDay'] = firstDay(new Date(today['year'],today['month'],1)); 
        return today;
    }

    //获得所选日期的相关变量
    function dateWithParam(year,month){
        var day = new Date(year,month);
        var date = new Array();
        date['year'] = day.getFullYear();
        date['month'] = day.getMonth();
        date['firstDay'] = firstDay(new Date(date['year'],date['month'],1));
        return date;
    }

    //生成日历代码 的方法
    //参数依次为 年 月 日 当月第一天(是星期几)
    function kalendarCode(codeYear,codeMonth,codeDay,codeFirst){
        kalendar_html = "<table id='kalendar'>\n<tr id='select'>\n<td colspan=7>\n<div id='year'>\n<ul>\n<li><input type='button' id='yearPrev' value='<<' /></li>\n<li class='selectChange'>\n<select name='year'>";
        //年 选择
        for(var i=1970;i<=codeYear+yearfloor;i++){
            if(i == codeYear){
                kalendar_html += "<option value='"+i+"' selected='true'>"+i+"</option>";
            }else{
                kalendar_html += "<option value='"+i+"'>"+i+"</option>";
            }
        }

        kalendar_html += "</select>\n</li>\n<li><input type='button' id='yearNext' value='>>' /></li>\n</ul>\n</div>\n<div id='month'>\n<ul>\n<li><input type='button' id='monthPrev' value='<' /></li>\n<li class='selectChange'>\n<select name='year'>";

        //月 选择
        for(var j=0;j<=11;j++){
            if(j == codeMonth){
                kalendar_html += "<option value='"+j+"' selected='true'>"+month[j]+"</option>";
            }else{
                kalendar_html += "<option value='"+j+"'>"+month[j]+"</option>";
            }
        }

        kalendar_html += "</select>\n</li>\n<li><input type='button' id='monthNext' value='>' /></li>\n</ul>\n</div>\n<div id='time'>\n</div>\n</td>\n</tr>\n\n<tr id='week'>\n<td>\n<ul>\n<li class='weekend'>星期日</li>\n<li>星期一</li>\n<li>星期二</li>\n<li>星期三</li>\n<li>星期四</li>\n<li>星期五</li>\n<li class='weekend'>星期六</li>\n</ul>\n</td>\n</tr>\n\n<tr id='day'>\n<td colspan=7>\n";

        //日 列表
        for(var m=0;m<6;m++){//日期共 4-6 行
            if(m >= Math.ceil((codeFirst+monthDays[codeMonth])/7)){//第五、六行是否隐藏              
                kalendar_html += "<ul class='dayList hide dayListHide"+m+"'>\n";
            }else{
                kalendar_html += "<ul class='dayList dayListHide"+m+"'>\n";
            }   

            for(var n=0;n<7;n++){//列
                if((7*m+n) < codeFirst || (7*m+n) >= (codeFirst+monthDays[codeMonth])){//某月日历中不存在的日期
                    kalendar_html += "<li></li>";
                }else{
                    if((7*m+n+1-codeFirst == codeDay)&&(((7*m+n)%7 == 0) || ((7*m+n)%7 == 6))){//当天是周末
                        kalendar_html += "<li class='todayWeekend'>"+(7*m+n+1-codeFirst)+"</li>";
                    }else if(((7*m+n)%7 == 0) || ((7*m+n)%7 == 6)){//仅是周末
                        kalendar_html += "<li class='weekend'>"+(7*m+n+1-codeFirst)+"</li>";
                    }else if(7*m+n+1-codeFirst == codeDay){//仅是当天
                        kalendar_html += "<li class='today'>"+(7*m+n+1-codeFirst)+"</li>";
                    }else{//其他日期
                        kalendar_html += "<li>"+(7*m+n+1-codeFirst)+"</li>";
                    }
                }
            }
            kalendar_html += "</ul>\n";
        }
        kalendar_html += "</td>\n</tr>\n</table>";
        return kalendar_html;
    }

    //年-月select框改变数值 的方法
    //参数依次为 1、操作对象(年下拉菜单 或 月下拉菜单) 2、被选中的下拉菜单值
    function y_mChange(obj,stopId){
        obj.val(stopId);
    }

    //修改日历列表 的方法
    //参数依次为 操作对象(每一天) 月份 修改后的第一天是星期几 修改后的总天数 当天的具体日期
    function dateChange(dateObj,dateMonth,dateFirstDay,dateTotalDays,dateCurrentDay){
        //判断新日历有几行,需要显示或隐藏
        var newLine = Math.ceil((dateFirstDay+monthDays[dateMonth])/7);//新行数
        if(newLine > dateLine){//增加行
            for(var i=dateLine;i<newLine;i++){
                $('.dayListHide'+i).show();
            }
        }else if(newLine < dateLine){//减少行
            for(var i=dateLine-1;i>=newLine;i--){
                $('.dayListHide'+i).hide();
            }
        }
        //重置日期排序
        dateLine = newLine;
        /*如果改变 月 后，选中月的总天数小于当前日期，
        *如当前3.31，选中2月，可2月最多29天，则将当前日期改为选中月的最后一天，即2.39
        */
        if(dateTotalDays < dateCurrentDay){
            dateCurrentDay = dateTotalDays;
        }
        for(var i=0;i<7*newLine;i++){
            if(i < dateFirstDay || i> (dateTotalDays+dateFirstDay-1)){//日历中 当月不存在的日期
                dateObj.eq(i).text('').removeClass();
            }else{
                if((i+1-dateFirstDay == dateCurrentDay) && (i%7 == 0 || i%7 == 6)){
                    dateObj.eq(i).removeClass().addClass('todayWeekend');
                }else if(i%7 == 0 || i%7 == 6){//仅周末
                    dateObj.eq(i).removeClass().addClass('weekend');
                }else if(i+1-dateFirstDay == dateCurrentDay){//仅当天
                    dateObj.eq(i).removeClass().addClass('today');
                }else{//其他日期
                    dateObj.eq(i).removeClass();
                }
                dateObj.eq(i).text(i+1-dateFirstDay);
            }
        }
    }

/*************    缓存节点和变量     **************/
    var rili_location = $('#wrap');//日历代码的位置
    var kalendar_html = '';//记录日历自身代码 的变量
    var yearfloor = 10;//选择年份从1970到当前时间的后10年

    var someDay = dateNoneParam();//修改后的某一天,默认是当天
    var yearChange = someDay['year'];//改变后的年份，默认当年
    var monthChange = someDay['month'];//改变后的年份，默认当月

/*************   将日历代码放入相应位置，初始时显示此处内容      **************/

    //获取时间，确定日历显示内容
    var today = dateNoneParam();//当天

    /*月-日 设置*/
    var month = new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月');
    var monthDays = leapYear(today['year']);//返回数组，记录每月有多少天
    var weekDay = new Array('日','一','二','三','四','五','六');
    // alert('年:'+someDay['year']+'\n月:'+someDay['month']+'\n日:'+someDay['date']+'\n星期:'+someDay['week']+'\n本月第一天星期:'+someDay['firstDay']);return false;

    kalendar_html = kalendarCode(today['year'],today['month'],today['date'],today['firstDay']);
    rili_location.html(kalendar_html);

/*************   js写的日历代码中出现的节点     **************/
    var yearPrev = $('#yearPrev');//上一年按钮
    var yearNext = $('#yearNext');//下一年按钮
    var monthPrev = $('#monthPrev');//上一月按钮
    var monthNext = $('#monthNext');//下一月按钮
    var selectYear = $('#year .selectChange select');//选择年份列表
    var listYear = $('#year .selectChange select option');//所有可选年份
    var selectMonth = $('#month .selectChange select');//选择月份列表
    var listMonth = $('#month .selectChange select option');//所有可选月份
    var dateLine = Math.ceil((monthDays[today['month']]+today['firstDay'])/7);;//当前日历中有几行日期，默认是 当年当月
    var dateDay = $('#kalendar tr#day td ul.dayList li');//日历中的每一天


/***************************/
    //年 按钮事件
    yearPrev.bind('click',function(){
        yearChange --;
        if(yearChange < 1970){
            yearChange = 1970;
            alert('太前也没意义了...');
            return false;
        }
        //修改年份
        y_mChange(selectYear,yearChange);
        //重新获得 每月天数
        monthDays = leapYear(yearChange);//alert(monthDays);
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']); 
    });

    yearNext.bind('click',function(){
        yearChange ++;
        if(yearChange >= today['year']+yearfloor){
            yearChange = today['year']+yearfloor;
            alert('太后也没意义了...');
            return false;
        }
        //修改年份
        y_mChange(selectYear,yearChange);
        //重新获得 每月天数
        monthDays = leapYear(yearChange);//alert(monthDays);
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']); 
    });

    // 月 按钮事件
    monthPrev.bind('click',function(){
        monthChange --;
        if(monthChange >= 0){//仍在本年内
            //修改月份
            y_mChange(selectMonth,monthChange);         
        }else{
            monthChange = 11;//前一年的最后一个月
            yearChange --;
            if(yearChange < 1970){
                yearChange = 1970;
                alert('太久远也没意义了...');
                return false;
            }
            //修改月份
            y_mChange(selectMonth,monthChange);
            //修改年份
            y_mChange(selectYear,yearChange);
            //重新获得 每月天数
            monthDays = leapYear(yearChange);
        }
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']); 
    });

    monthNext.bind('click',function(){
        monthChange ++;
        if(monthChange <= 11){//仍在本年内
            //修改月份
            y_mChange(selectMonth,monthChange);
        }else{
            monthChange = 0;//下一年的第一个月
            yearChange ++;
            if(yearChange >= someDay['year']+yearfloor){
                yearChange = someDay['year']+yearfloor;
                alert('太久远也没意义了...');
                return false;
            }
            //修改月份
            y_mChange(selectMonth,monthChange);
            //修改年份
            y_mChange(selectYear,yearChange);
            //重新获得 每月天数
            monthDays = leapYear(yearChange);
        }
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']);         
    });

    // 年 选择事件
    selectYear.bind('change',function(){
        //获得年份
        yearChange = $(this).val();
        //修改年份
        y_mChange(selectYear,yearChange);
        //重新获得 每月天数
        monthDays = leapYear(yearChange);
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']);
    });

    // 月 选择事件
    selectMonth.bind('change',function(){
        //获得 月
        monthChange = $(this).val();
        //修改月份
        y_mChange(selectMonth,monthChange);
        //新 年-月 下的对象信息
        someDay = dateWithParam(yearChange,monthChange);
        //修改 日期 列表
        dateChange(dateDay,someDay['month'],someDay['firstDay'],monthDays[someDay['month']],today['date']);
    });

    /*日 鼠标事件*/
    dateDay.hover(function(){
        $(this).addClass('mouseFloat');
    },function(){
        $(this).removeClass('mouseFloat');
    });

});
;(function ($) {
	'use strict';
	// 第一步：创建一个匿名函数
	var Dropbox = function (ele,options){
		this.ele = $(ele);
		this.dataSetting = this.ele.attr('data-setting'); // 获取自定义设置data-*
		this._options = options == '' ? {} : options;
		this.options = $.extend({},Dropbox._default, this._options,this.ele.data());
		// 第四步 : 初始化配置
		this.init();
		// 第五步：事件委托
		$(document).on('click',hide)
				   .on('click', '.dropbox,[data-role=dropbox]', this.toggle)
			       .on('click', '.dropbox li,[data-role=dropbox] li', this.getValue);
	};
	// 默认配置
	Dropbox._default = {
		width : '',
		height : '',
		minHeight:'',
		bgcolor : "white",
		isOverflow : false,
		placeholder: '请选择',
		data : ['2K以下','5K以下','10K以下','20K以下','25K以下','40K以下','50K以下'],
		template : '<button class="dropbtn"><span></span><i class="caret"></i></button><ul class="drop_menu"></ul>'
	};
	// 第二步：给创建的匿名函数的原型添加方法
	Dropbox.prototype = {
		constructor: Dropbox,
		// 初始化配置
		init: function(){
			if(this.dataSetting != null ){
				var _setting = $.parseJSON(this.dataSetting);
				$.extend(this.options, _setting);
			}
			this.ele.css({ width:this.options.width,height:this.options.height,minHeight: this.options.minHeight});
			this.render();
			this.ele.find('span').text(this.options.placeholder);
			if(this.options.bgcolor == "gray"){
				this.ele.find('.dropbtn').addClass('dropbtn_gray');
			}else{
				this.ele.find('.dropbtn').addClass('dropbtn_white');
			}
			if(this.options.isOverflow){
				this.ele.find('.dropbtn').addClass('text_overflow');
			}
		},
		// 渲染页面
		render: function() {
			this.ele.append(this.options.template);
			this.setValue(this.options.data);
		},
		// 添加数据
		setValue: function (arr){
			var dataContainer = this.ele.find('.drop_menu'),
				dataItem = '';
			arr = (arr instanceof Array) ? arr : [];
			for ( var i = 0 ; i< arr.length ; i++ ) {
				dataItem += '<li>'+arr[i]+'</li>';
			}
			dataContainer.html(dataItem);
		},
		// 切换
		toggle: function (e){
			var $this = $(this);
			var isActive = $this.find('.drop_menu').is(':visible');
			if(isActive){
				// 解决火狐浏览器:focus不支持到bug
				if(!$.browser.mozilla){
					$this.find('i.caret').css('transform', 'rotate(0deg)');
				}
				$this.removeClass('open');
			}else{
				hide();
				$this.addClass('open');
				// 解决火狐浏览器:focus不支持到bug
				if(!$.browser.mozilla){
					$this.find('i.caret').css('transform', 'rotate(180deg)');
				}
			}
			e.stopPropagation();
		},
		// 获取数据
		getValue:function (e){
			var $this = $(this);
			$this.parent().prev('.dropbtn').find('span').text($this.text());
			$this.addClass('hover').siblings('li').removeClass('hover');
			$this.parent().parent().removeClass('open');
			// 解决火狐浏览器:focus不支持到bug
			if(!$.browser.mozilla){
				$this.parent().parent().find('i.caret').css('transform', 'rotate(0deg)');
			}
			e.stopPropagation();
		},
		// 解除所有事件监听，删除所有组件节点
		destroy:function (){
			this.ele.remove(this.options.template);
			$(document).off('click',this.toggle,this.getValue).removeData('dropbox');
		}
	};
	function hide (){
		$('.dropbox,[data-role=dropbox]').each(function() {
			$(this).removeClass('open');
			// 解决火狐浏览器:focus不支持到bug
			if(!$.browser.mozilla){
				$(this).find('i.caret').css('transform', 'rotate(0deg)');
			}
		});
	}
	$.fn.dropbox = function (option){
		return this.each(function() {
			var $this = $(this),
				data = $this.data('dropbox'),
				options = typeof option == 'object' && option;
				if(!data) {
					$this.data('dropbox' , (data = new Dropbox(this,options)))
				}
				if(typeof option == 'string'){
					data[option]();
				}
		});
	}

})(jQuery)
;(function ( $) {
	'use strict';
	var Multiselect = function (ele,options){
		this.ele = $(ele);
		this.dataSetting = this.ele.attr('data-setting');
		this._options = options == '' ? {} : options;
		this.options = $.extend({},Multiselect._default, this._options,this.ele.data());
		this.init();
		$(document).off('click',this.toggle).on('click',hide)
					.on('click', '.multiselect,[data-role=multiselect]', this.toggle)
					.on('click','.multiselect .select_menu,[data-role=multiselect] .select_menu',function(e){ e.stopPropagation();})
					.on('click', '.multiselect li,[data-role=multiselect] li', $.proxy(this.getValue , this));
	}
	// 默认配置
	Multiselect._default = {
		width : '',
		height : '',
		minHeight:'',
		bgcolor : "white",
		isOverflow : false,
		multiNum : 2,
		placeholder : '请选择行业领域',
		multiNumTips : '(最多可选择两个)',
		data : ['2K以下','5K以下','10K以下','20K以下','25K以下','40K以下','50K以下'],
		template : '<button class="selectbtn"><span></span><i class="caret"></i></button><div class="select_menu"><em class="multiNumTips"></em><ul></ul></div>'
	};
	Multiselect.prototype = {
		constructor : Multiselect,
		init : function (){
			if(this.dataSetting != null ){
				var _setting = $.parseJSON(this.dataSetting);
				$.extend(this.options, _setting);
			}
			this.render();
			this.ele.find('span').text(this.options.placeholder);
			this.ele.find('.multiNumTips').text(this.options.multiNumTips)
			if(this.options.bgcolor == "gray"){
				this.ele.find('.selectbtn').addClass('selectbtn_gray');
			}else{
				this.ele.find('.selectbtn').addClass('selectbtn_white');
			}
			if(this.options.isOverflow){
				this.ele.find('.selectbtn').addClass('text_overflow');
			}
		},
		render : function (){
			this.ele.append(this.options.template);
			this.setValue(this.options.data);
		},
		setValue : function ( arr ){
			var dataContainer = this.ele.find('.select_menu > ul'),
				dataItem = '';
			arr = (arr instanceof Array) ? arr : [];
			for ( var i = 0 ; i< arr.length ; i++ ) {
				dataItem += '<li><input type="checkbox" value="" class="checkbox" data-text='+arr[i]+'></li>';
			}
			dataContainer.html(dataItem);
		},
		toggle : function (e){
			var $this = $(this);
			var isActive = $this.find('.select_menu').is(':visible');
			if(isActive){
				// 解决火狐浏览器:focus不支持到bug
				if(!$.browser.mozilla){
					$this.find('i.caret').css('transform', 'rotate(0deg)');
				}
				$this.removeClass('open');
			}else{
				hide();
				$this.addClass('open');
				// 解决火狐浏览器:focus不支持到bug
				if(!$.browser.mozilla){
					$this.find('i.caret').css('transform', 'rotate(180deg)');
				}
			}
			e.stopPropagation();
		},
		getValue : function (e){
			var self = this,
				$this = $(e.currentTarget),
				$parent = $this.parent(),
				multiNum = self.options.multiNum,
				checkedNum = $parent.find('input:checked').length,
				inputItem = $parent.find('input'),
				selectItem =[];
			if(checkedNum == multiNum ){
				return
			}else if(checkedNum > multiNum){
				$parent.prev('.multiNumTips').css('color','#fd5f39');
				return false;
			}
			$parent.prev('.multiNumTips').css('color','#999');
			inputItem.change(function() {
				inputItem.each(function() {
					if($(this).is(':checked')){
						selectItem.push($(this).data('text'));
					}
				});
				$(this).parents('.select_menu').siblings('.selectbtn').find('span').html(selectItem.join(' '));
			});
			e.stopPropagation();
		}
	}

	function hide (){
		$('.multiselect,[data-role=multiselect]').each(function() {
			$(this).removeClass('open');
			// 解决火狐浏览器:focus不支持到bug
			if(!$.browser.mozilla){
				$(this).find('i.caret').css('transform', 'rotate(0deg)');
			}
		});
	}
	$.fn.multiselect = function (option){
		return this.each(function() {
			var $this = $(this),
				data = $this.data('multiselect'),
				options = typeof option == 'object' && option;
				if(!data) {
					$this.data('multiselect' , (data = new Multiselect(this,options)))
				}
				if(typeof option == 'string'){
					data[option]();
				}
		});
	}
	
})(jQuery)
;(function ($) {
	'use strict';
	var Tips = function (ele , options){
		this.ele = $(ele);
		this._options = options;
		this.dataSetting = this.ele.attr('data-setting');
		this.tipsText = this.ele.attr('data-text');
		this._default = {
			placement : 'top',
			template : '',
			text : this.tipsText,
			hasLink : {
				_link : false,
				link_text : '了解更多',
				link_url : '#'
			}
		};
		this._options = this._options == '' ? {} : this._options;
		$.extend(this._default, this._options);
		this.init();
		$(document).on('click','.tips',$.proxy(this.toggle , this));
	};
	Tips.prototype = {
		constructor : Tips,
		init : function (){
			
			if(this.dataSetting != null ){
				var _setting = $.parseJSON(this.dataSetting);
				$.extend(this._default, _setting);
			}
 			this.render();
		},
		render : function (){
			var _style = this._default.hasLink,
				_text = this._default.text,
				tipsbox = this.ele.siblings('[data-tips-id]');
			if(_style._link){
				this._default.template = '<div class="tips_btn_box"><i class="close_icon"></i><p>'+_text+'</p><a class="btn btn_link" href="'+_style.link_url+'">'+_style.link_text+'</a></div>';
				// console.log(this._default.template);
 			}else{
 				this._default.template = '<div class="tips_box">'+_text+'</div>';
 			}
 			if(tipsbox.length > 0){
 				if(tipsbox.is(':visible')){
 					tipsbox.hide();
 				}else{
 					$('[data-tips-id]').hide();
 					tipsbox.show();
 				}
 			}else{
 				console.log(1111111);
 				this.ele.after(this._default.template);
 				var pos = this.getPositon();
 				this.ele.css(pos);
				// var $this = $(this);
				// if($this.attr('data-id')){
				// 	var tipsbox=$('[data-tips-id='+$this.attr('data-id')+']');
				// 	if(tipsbox.is(':visible')){
				// 		tipsbox.hide();
				// 	}else{
				// 		$('[data-tips-id]').hide();
				// 		tipsbox.show();
				// 	}	
				// }else{
				// 	var randomId   = lg.Utils.getRandom();
				// 	$this.attr('data-id',randomId);
				// 	$(this._default.template).attr('data-tips-id',randomId);
				// 	$this.after(this._default.template);
				// }
 			}
		},
		toggle : function (e){
			var self = this,
				$this = $(e.currentTarget);
			
			if(self._default.hasLink._link){
				this.ele.trigger('click');
			}else{
				self.ele.trigger('hover')
			}
		},
		getPositon : function (){
			var placement = this._default.placement,pos='';
			switch(placement){
				case 'top' : pos = { left : $(this.ele).position().left + $(this.ele).width()/2, top : $(this.ele).position().top }
				break
				case 'bottom' : pos = { left : $(this.ele).position().left + $(this.ele).width()/2, top : $(this.ele).position().top + $(this.ele).height() }
				break
			}
			return pos;
		}
	};
	$('.close_icon').on('click', function() {
		$(this).parent().hide();
	});
	$.fn.tips = function ( option){
		return this.each(function(){
			new Tips(this,option)
		})
	}
})(jQuery)