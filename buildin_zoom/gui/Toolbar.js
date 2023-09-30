//example.Toolbar という新しいクラスを定義
example.Toolbar = Class.extend({
//example.Toolbar: 新しいクラスの名前
//このクラスは example オブジェクトの下に定義されている
//通常、example は特定のアプリケーションや機能の名前空間を表す
	

	init:function(elementId, app,view){
	//JavaScriptのオブジェクト内での初期化（init）関数
	//以下3つの引数を受け取る
		this.html = $("#"+elementId);
		//elementId という引数で渡された文字列を使って、HTML要素をjQueryセレクタ $("#" + elementId) を使って検索し、
		//this.html プロパティにそのjQueryオブジェクトを格納
		//指定された elementId に対応するHTML要素を this.html に保持()
		this.view = view;
		//view という引数で渡された値を this.view プロパティに設定
		//このようにして、init 関数内で受け取った view をオブジェクトのプロパティとして保持
		this.app = app;
		//app という引数で渡された値を this.app プロパティに設定
		//これにより、init 関数内で受け取った app をオブジェクトのプロパティとして保持できる
		
		
		// Inject the UNDO Button and the callbacks
		//zoomInButton というボタンを作成し、それをHTML要素に追加し、ボタンがクリックされたときの動作を設定
		//ボタンのクリックに応じてズーム操作とレイアウトの更新が行われる
		this.zoomInButton  = $("<button>Zoom In</button>");
		//$("<button>Zoom In</button>") を使用して新しいボタン要素を作成し、
		//それを this.zoomInButton プロパティに格納
		//this.zoomInButton プロパティ:オブジェクト内でボタン要素を参照するために使用
		this.html.append(this.zoomInButton);
		//this.html プロパティに格納されたHTML要素に、this.zoomInButton プロパティに格納されたボタン要素を追加
		//ボタンがHTMLコンテナ内に表示されるように
		this.zoomInButton.button().click($.proxy(function(){
		//this.zoomInButton プロパティに対して button() メソッドを呼び出し、ボタンをjQuery UI ボタンに変換
		//そして、.click() メソッドを使用して、ボタンがクリックされたときに実行される関数を設定している
		//proxy(function(){...}, this): これは関数内でのコンテキスト（this の値）を設定するために使用されている
		//クリックイベントのコールバック関数内で this を正しく参照するために、$.proxy 関数が使用されている
		      
		      //this.view.setZoom(this.view.getZoom() * 0.7, true); を使用してビューのズームを調整し、this.app.layout(); を呼び出してアプリケーションのレイアウトを更新
		      this.view.setZoom(this.view.getZoom()*0.7,true);
			  this.app.layout();
		},this));


		// Inject the DELETE Button
		//"1:1" と表示されるリセットボタンを作成し、それをHTML要素に追加し、ボタンがクリックされたときの動作を設定
		//リセットボタンをクリックしたときに、ビューを通常のズーム倍率に戻すための操作を実現
		this.resetButton  = $("<button>1:1</button>");
		//$("<button>1:1</button>") を使用して新しいボタン要素を作成し、それを this.resetButton プロパティに格納
		//this.resetButton プロパティ:オブジェクト内でボタン要素を参照するために使用
		this.html.append(this.resetButton);
		//this.html プロパティに格納されたHTML要素に、this.resetButton プロパティに格納されたボタン要素を追加
		//ボタンがHTMLコンテナ内に表示されるように
		this.resetButton.button().click($.proxy(function(){
	    //this.resetButton プロパティに対して button() メソッドを呼び出し、ボタンをjQuery UI ボタンに変換
		//そして、.click() メソッドを使用して、ボタンがクリックされたときに実行される関数を設定
		//proxy(function(){...}, this): 関数内でのコンテキスト（this の値）を設定するために使用
		//クリックイベントのコールバック関数内で this を正しく参照するために、$.proxy 関数を使用

		    //クリックイベントが発生したときに実行される関数を定義
		    //この関数内では、this.view.setZoom(1.0, true); を使用してビューのズームを1.0倍にリセットし、
			//this.app.layout(); を呼び出してアプリケーションのレイアウトを更新している
			//つまり、ボタンがクリックされると、ビューが通常のズーム倍率（1:1）にリセットされ、アプリケーションのレイアウトが調整される
			this.view.setZoom(1.0, true);
            this.app.layout();
		},this));
		

		// Inject the REDO Button and the callback
		//"Zoom Out" と表示されるズームアウトボタンを作成し、それをHTML要素に追加し、ボタンがクリックされたときの動作を設定
		this.zoomOutButton  = $("<button>Zoom Out</button>");
		//$("<button>Zoom Out</button>") を使用して新しいボタン要素を作成し、それを this.zoomOutButton プロパティに格納
		//this.zoomOutButton プロパティ:オブジェクト内でボタン要素を参照するために使用
		this.html.append(this.zoomOutButton);
		//this.html プロパティに格納されたHTML要素に、this.zoomOutButton プロパティに格納されたボタン要素を追加
		//ボタンがHTMLコンテナ内に表示されるように
		this.zoomOutButton.button().click($.proxy(function(){
		//、this.zoomOutButton プロパティに対して button() メソッドを呼び出し、ボタンをjQuery UI ボタンに変換
		//そして、.click() メソッドを使用して、ボタンがクリックされたときに実行される関数を設定

		    //this.view.setZoom(this.view.getZoom()*1.3, true); を使用してビューのズームを縮小し、this.app.layout(); を呼び出してアプリケーションのレイアウトを更新
			//つまり、ボタンがクリックされると、ビューがズームアウトし、アプリケーションのレイアウトが調整される
            this.view.setZoom(this.view.getZoom()*1.3, true);
            this.app.layout();
		},this));
	}

});