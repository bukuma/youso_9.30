//example.View という新しいクラスを定義
//このクラスは、draw2d.Canvas クラスを拡張（extend）しており、特定の機能を持つキャンバス（canvas）を表す

example.View = draw2d.Canvas.extend({
	//example.View: 新しいクラスの名前
	//このクラスは draw2d.Canvas クラスを拡張しており、新しい機能や設定を追加したキャンバスを表す
	
	init:function(id){
		//init メソッド: クラスのコンストラクタ
		this._super(id);
		//親クラスのコンストラクタを呼び出す
		//つまり、draw2d.Canvas クラスのコンストラクタを実行して、キャンバスを初期化
		
		this.setScrollArea("#"+id);
		//setScrollArea メソッドを使用して、キャンバスのスクロール領域を設定
		//id は HTML 要素の ID であり、"#"+id のように CSS セレクタとして使用される
		//これにより、指定された ID の HTML 要素がキャンバスのスクロール領域として設定される
	}

});
