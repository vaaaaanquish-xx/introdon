//------------------------------------------------
//	他者紹介
//	Author: @vaaaaanquish
//------------------------------------------------

(function($, jn){
	// プラグイン情報初期化
	if(!jn.pluginInfo)
		jn.pluginInfo = {};
	// プラグイン情報本体
	jn.pluginInfo['introducerep'] = {
		'name' : {
			'ja' : '他者紹介',
			'en' : 'introduce rep'
		},
		'author' : {
			'en' : '@vaaaaanquish'
		},
		"version" : "1.0くらい",
		'file' : 'introducerep.js',
		'language' : ['ja'],
		"last_update" : "2014/04/04",
		'update_timezone' : '9',
		'jnVersion' : '4.0.0.0',
		'description' : {
			'ja' : '他者紹介(@～～～)をツイート欄にセット',
			'en' : 'follower is introduce!!'
		},
		'updateinfo' : 'http://vaaaaaanquish.hatenablog.com'
	};
	// プラグイン情報

	var pluginInfoClass = function(){};


	pluginInfoClass.prototype = {
		'menuStringintroduce' : '<span>他者紹介</span>',
	};

	var _pi = new pluginInfoClass();

	if(_Janetter_Window_Type == "main") {
		var select_introduce = jn.onContextMemuAtUserBuildStarted;

		//メニュー登録
		jn.onContextMemuAtUserBuildStarted = function(accounts) {
			select_introduce && select_introduce.apply(this, arguments);
			var tweet2 = $("#contextmenu-user");
			if(tweet2.children('li[action="Syava2"]').length == 0) {
				$('li[action="copytext"]', tweet2)
					.after('<li action="introduce">' + _pi.menuStringintroduce + '</li>');
			}
		};

		//他者紹介Fac
		function TweetText(text) {	
			//ツイート欄に追加
			jn.editor.addTweetText('(@'+text+')');
			
			// カーソルを先頭に移動
			var textarea = $(".expanded textarea")[0];
			setTimeout(function() {
				textarea.selectionStart = 0;
				textarea.selectionEnd = 0;
			}, 0);
		}

		// アクションを定義(拡張機能用)
		var action = jn.action;
		jn.action = function(options) {
			var act = options.act,
				elm = options.element,
				event = options.event;
			action(options);
			switch(act) {
				case "introduce":
					TweetText(options.screenname);
					break;
			}
		}

	};
})(jQuery, janet);
