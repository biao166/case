/**
 * dialog
 */
var Dialog = function () {
	var dialog, shadow, dragger, posX, posY, title, content;

	function create_dialog () {
		if ( !dialog ) {
			//create shadow
			shadow = document.createElement('div');
			shadow.setAttribute('id', 'dialogShadow');

			//create the dragger of dialog
			title = document.createElement('h3');
			var anchor = document.createElement('a');
			anchor.setAttribute('id', 'dialogClose');
			dragger = document.createElement('div');
			dragger.setAttribute('class', 'hd');
			dragger.setAttribute('id', 'dialogDragger');
			dragger.appendChild(title);
			dragger.appendChild(anchor);

			//create the body of dialog
			content = document.createElement('div');
			content.setAttribute('class', 'bd');

			//create dialog
			dialog = document.createElement('div');
			dialog.setAttribute('id', 'dialog');
			dialog.appendChild(dragger);
			dialog.appendChild(content);

			//bind event
			anchor.onclick = hide;
			shadow.onclick = hide;

			//append to body
			document.body.appendChild(shadow);
			document.body.appendChild(dialog);
		}
		center();
	}

	function insert_content (tit, cnt) {
		title.innerHTML = tit;
		content.innerHTML = cnt;
	}

	function hide() {
		dialog.style.display = 'none';
		shadow.style.display = 'none';
		title.innerHTML = '';
		content.innerHTML = '';
	}

	function center () {
		shadow.style.display = 'block';
		dialog.style.display = 'block';

		var scroll_pos     = get_scroll_pos();
		var popup_width    = dialog.offsetWidth;
		var popup_height   = dialog.offsetHeight;
		var browser_width  = document.documentElement.clientWidth;
		var browser_height = document.documentElement.clientHeight;
		var offset_left    = (browser_width - popup_width)/2 + scroll_pos.x;
		var offset_top     = (browser_height - popup_height)/2 + scroll_pos.y;

		dialog.style.left = offset_left + 'px';
		dialog.style.top = offset_top + 'px';

		if (dragger) {
			dragger.onmousedown = down;
			dragger.onmouseup = function () {
				document.onmousemove = null;
			};
		}
	}

	/**
	 * 拖拽dialog
	 */
	function down (event) {
		var point = get_mouse_point(event);
		posX = point.x - parseInt(dialog.style.left);
		posY = point.y - parseInt(dialog.style.top);
		document.onmousemove = move;
	};
	function move (event) {
		event = event || window.event;
		var point = get_mouse_point(event);
		dialog.style.left = (point.x - posX) + 'px';
		dialog.style.top = (point.y - posY) + 'px';
	}

	/**
	 * 浏览器窗口大小变化时居中弹窗
	 */
	window.onresize = function () {
		if (dialog && dialog.style.display == 'block') {
			center();
		}
	};

	/**
	 * 滚动浏览器时居中弹窗
	 */
	window.onscroll = function () {
		if (dialog && dialog.style.display == 'block') {
			setTimeout(center, 300);
		}
	};

	/**
	 * 获取滚动条滚动过的距离
	 */
	function get_scroll_pos () {
		var pos = {
			x: 0,
			y: 0
		};
		pos.x = document.documentElement.scrollLeft || document.body.scrollLeft;
		pos.y = document.documentElement.scrollTop || document.body.scrollTop;
		return pos;
	}

	/**
	 * 获取鼠标在页面上的位置
	 */
	function get_mouse_point(event) {
		var event = event || window.event;
		var point = {
			x:0,
			y:0
		};
	 	var pos = get_scroll_pos();
		point.x = event.clientX + pos.x;
		point.y = event.clientY + pos.y;
		return point;
	}

	return {
		open: function (tit, cnt) {
			create_dialog();
			insert_content(tit, cnt);
		}
	};
}();