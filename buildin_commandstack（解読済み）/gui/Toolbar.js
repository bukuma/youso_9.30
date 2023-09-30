
example.Toolbar = Class.extend({
	//example というオブジェクト内に Toolbar プロパティを定義
	
	
	init:function(elementId, view){
    //オブジェクトリテラル内に init というメソッドを定義
	//elementId と view,2つの引数を受け取る
		this.html = $("#"+elementId);
		//elementId を使用して指定された要素を取得し、$ 関数を使ってjQueryで選択
		//その後、選択された要素を this.html に格納
		//html プロパティには指定された elementId に対応するHTML要素が格納される
		this.view = view;
		//view 引数の値を this.view プロパティに格納
		
		view.getCommandStack().addEventListener(this);
		//特定のクラス（おそらく提供されたコードのクラス自体を指しています）をキャンバスのイベントリスナーとして登録
		//のイベントリスナーの主な目的は、キャンバス上のアクションや変更を監視し、それに応じてコマンドスタックを更新すること

		// イベントリスナーを登録するためのコード
        view.on("select", $.proxy(this.onSelectionChanged,this));
		//view オブジェクトに対して、select イベントのリスナーを登録
        //$.proxy はjQueryライブラリのメソッドで、関数のコンテキストを指定するために使用される
		//この場合、onSelectionChanged メソッドが this コンテキスト内で実行されるように指定されている
		
		// Inject the UNDO Button and the callbacks
		//Undo（元に戻す）ボタンを作成し、それに対するクリックイベントハンドラを設定する
		this.undoButton  = $("<button>Undo</button>");
		//<button> タグを作成し、そのテキストを "Undo" と設定した jQuery オブジェクト
		//Undoボタンを作成
		this.html.append(this.undoButton);
		//this.html に対して、先ほど作成した Undo ボタンを追加
		//これにより、UndoボタンがHTML内の特定の要素に追加される
		this.undoButton.button().click($.proxy(function(){
			//Undoボタンに対して .button() メソッドを呼び出す
			//ボタンをjQuery UI ボタンウィジェットに変換するためのもの
			// Undoボタンに対して .click() メソッドを呼び出して、クリックイベントのハンドラを設定
			//$.proxy を使用して、このハンドラ内の this コンテキストを正しく設定している
		       this.view.getCommandStack().undo();
			   //ハンドラ内のコードは、this.view.getCommandStack().undo() を実行し、コマンドスタックから操作を元に戻す
		},this)).button( "option", "disabled", true );
		//Undoボタンを初期状態で無効に設定
		//ボタンは最初はクリックできない状態に

		// Inject the REDO Button and the callback
		//Redo（やり直し）ボタンを作成し、それに対するクリックイベントハンドラを設定
		this.redoButton  = $("<button>Redo</button>");
		//<button> タグを作成し、そのテキストを "Redo" と設定した jQuery オブジェクト
		//Redoボタンの要素が作成される
		this.html.append(this.redoButton);
		//this.html.append(this.redoButton);: this.html に対して、先ほど作成した Redo ボタンを追加
		//これにより、RedoボタンがHTML内の特定の要素に追加される
		this.redoButton.button().click($.proxy(function(){
			//this.redoButton.button(): Redoボタンに対して .button() メソッドを呼び出し
			//これは、ボタンを jQuery UI ボタンウィジェットに変換するためのもの
			// Redoボタンに対して .click() メソッドを呼び出して、クリックイベントのハンドラを設定
			//$.proxy を使用して、このハンドラ内の this コンテキストを正しく設定している
		    this.view.getCommandStack().redo();
			//ハンドラ内のコードは、this.view.getCommandStack().redo() を実行し、コマンドスタックから操作をやり直す
		},this)).button( "option", "disabled", true );
		//Redoボタンを初期状態で無効に設定
		//ボタンは最初はクリックできない状態に
		
		//このコードは、HTML内に区切り記号を表示するために使用される
		//一般的に、UI要素の間にスペーサーや区切り記号を挿入するためにこのようなアプローチが採られる
		//ツールバーなどのUIでよく使用される
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		//this.delimiter は、新しい <span> 要素を作成した jQuery オブジェクト
		//<span> 要素は、区切り記号やスペーサーとして使用される
		//この要素を this.delimiter という変数に格納
		//$("<span class='toolbar_delimiter'>&nbsp;</span>"): $() 関数は新しい要素を作成
		//この場合、<span> 要素を作成し、class 属性に "toolbar_delimiter" を設定している
		//さらに、&nbsp; はHTMLエンティティであり、空白を表している
		this.html.append(this.delimiter);
		//this.html はおそらくあるHTML要素を表しており、その要素に対して append メソッドを呼び出している
		//これにより、新しく作成された <span> 要素（区切り記号として機能する）が this.html 内に追加される

		// Inject the DELETE Button
		//Delete（削除）ボタンを作成し、それに対するクリックイベントハンドラを設定
		this.deleteButton  = $("<button>Delete</button>");
		//this.deleteButton は、新しい <button> 要素を作成した jQuery オブジェクト
		//<button> 要素は、"Delete" というテキストを持つ削除ボタンを示す
		//この要素を this.deleteButton という変数に格納
		//$("<button>Delete</button>"): $() 関数は新しい要素を作成
		//この場合、<button> 要素を作成し、そのテキストに "Delete" を設定
		//これにより、削除ボタンが作成される
		this.html.append(this.deleteButton);
		//this.html はおそらくあるHTML要素を表しており、その要素に対して append メソッドを呼び出している
		//これにより、新しく作成された削除ボタン要素が this.html 内に追加される
		this.deleteButton.button().click($.proxy(function(){
			//削除ボタンに対して .button() メソッドを呼び出す
			//これは、ボタンを jQuery UI ボタンウィジェットに変換するためのもの
			//click($.proxy(function(){ ... }, this)): 削除ボタンに対して .click() メソッドを呼び出して、クリックイベントのハンドラを設定
			//このハンドラは、ボタンがクリックされたときに実行される
			//$.proxy を使用して、このハンドラ内の this コンテキストを正しく設定している
			var node = this.view.getPrimarySelection();
			//this.view.getPrimarySelection() を使用して、ビューオブジェクトから主要な選択項目を取得
			var command= new draw2d.command.CommandDelete(node);
			// 取得した選択項目を使用して、draw2d.command.CommandDelete のインスタンスを作成
			//これは、削除操作を実行するためのコマンドオブジェクト
			this.view.getCommandStack().execute(command);
			//コマンドスタックから execute メソッドを呼び出し、削除コマンドを実行
			//これにより、選択された要素が削除される操作が実行される
		},this)).button( "option", "disabled", true );
		//削除ボタンを初期状態で無効に設定
		//ボタンは最初はクリックできない状態に
	},

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	//onSelectionChanged というメソッドを定義
	//このメソッドは、特定のイベント発生時に呼び出されるように設定されている
	onSelectionChanged : function(emitter, event){
		//emitter: イベントを発生させたオブジェクト
		//通常、このオブジェクトはイベントをリッスンしているオブジェクトまたはコンポーネントを表す
		//event: 発生したイベントに関する情報を含むオブジェクト
		//このコードでは event.figure プロパティを使用して、選択された図形（または要素）を表すオブジェクトにアクセスする
		this.deleteButton.button( "option", "disabled", event.figure===null );
		//this.deleteButton は削除ボタンを表す jQuery オブジェクト
		//これに対して .button("option", "disabled", event.figure === null) を呼び出している
		//.button("option", "disabled", ...) は、ボタンのオプションを変更するための jQuery UI メソッド
		//この場合、"disabled" オプションを設定
		//event.figure === null は、event オブジェクト内の figure プロパティが null であるかどうかを評価している
		//図形が選択されていない場合、event.figure は null に
		//event.figure === null の評価結果に応じて、削除ボタンの有効状態が設定される
		//図形が選択されていない場合（event.figure が null の場合）、削除ボタンは無効→削除ボタンは無効
		//図形が選択されている場合、削除ボタンは有効に→削除ボタンは有効になり、ユーザーがクリックして削除操作を実行できる
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	//stackChanged というメソッドを定義
	//このメソッドは、スタック（おそらくコマンドスタック）の状態が変更されたときに実行されるように設定されている
	//stackChanged メソッドの目的は、コマンドスタックの状態に応じて Undo（元に戻す）ボタンと Redo（やり直し）ボタンの有効状態を制御すること
	stackChanged:function(event)
	//event: スタックの状態変更に関する情報を含むイベントオブジェクト
	//このコードでは event.getStack() を使用して、関連するコマンドスタックオブジェクトにアクセスしている
	{
		this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
		//this.undoButton は Undo ボタンを表す jQuery オブジェクトであり、これに対して .button("option", "disabled", ...) を呼び出している
		//.button("option", "disabled", ...) は、ボタンのオプションを変更するための jQuery UI メソッド
		//event.getStack().canUndo() は、コマンドスタックオブジェクトの canUndo() メソッドを呼び出している
		//これにより、Undo 操作が実行可能かどうかが確認される
		//canUndo() メソッドは、Undo 操作が可能であれば true を返し、そうでなければ false を返す
		this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
		//this.redoButton.button("option", "disabled", !event.getStack().canRedo()): this.redoButton は Redo ボタンを表す jQuery オブジェクト
		//Redo ボタンの有効状態を設定
		//event.getStack().canRedo() はコマンドスタックが Redo 操作を実行できるかどうかを確認する
	}
});