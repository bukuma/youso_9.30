
//draw2d.Canvasを拡張したexample.Viewというカスタムビュークラスを定義
//このビュークラスは、特定の要素（idで指定されるHTML要素）に描画領域を設定し、ドラッグアンドドロップのコネクションを操作するためのいくつかのプロパティとメソッドを持っている
example.View = draw2d.Canvas.extend({
    //example.Viewというカスタムクラスを定義
    //draw2d.Canvasクラスを拡張し、新しいカスタムクラスを作成するための構文

	
	init:function(id){
        //JavaScriptのオブジェクトのメソッドであるinitメソッドを定義
		this._super(id);
        //this._super(id);は、親クラス（draw2d.Canvas）のコンストラクタを呼び出している
        //draw2d.Canvasクラスの初期化処理を実行します。親クラスの初期化を行うことで、example.Viewクラスに親クラスの機能やプロパティが継承される
        //_superは、通常、親クラスのコンストラクタを呼び出すために使用される
		
		this.setScrollArea("#"+id);
        //this.setScrollArea("#"+id);は、カスタムクラス内で定義されたメソッド
        //このメソッドは、指定されたHTML要素をスクロール可能な領域として設定
		
		this.currentDropConnection = null;
        //example.ViewクラスのプロパティであるcurrentDropConnectionを初期化
        //このプロパティは、ドラッグアンドドロップ操作中にドロップ先のコネクションを追跡するために使用される変数
        //初期値としてnullが設定されている
	},

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     * 
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    //onDragというメソッドを定義
    //droppedDomNode: ドラッグされているDOMノード（要素）を表します。これはドラッグされたオブジェクトのビューを表す
    {
    },
    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/

    //、オブジェクトがドロップされたときに呼び出されるonDropというメソッドの実装
    //このメソッドは、特定のアクションをトリガーし、新しい図形（figure）を描画領域に追加するために使用される
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    //droppedDomNode: ドロップされたDOMノード
    //x,y: ドロップが発生した座標です。
    //shiftKey: Shiftキーが押されているかどうかを示すブール値
    //ctrlKey: Ctrlキーが押されているかどうかを示すブール値
    {
        var type = $(droppedDomNode).data("shape");
        //ドロップされたDOMノードからデータ属性 "shape" を取得し、それを変数 type に格納
        var figure = eval("new "+type+"();");
        //変数 type の値を使用して新しい図形オブジェクトを作成
        //eval関数は文字列として提供されたコードを実行するために使用されている
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        //新しい図形を描画領域に追加するためのコマンドオブジェクトを作成
        //this: コマンドを実行する描画領域への参照
        //figure: 追加する図形オブジェクト
        //x,y: 追加する位置の座標
        this.getCommandStack().execute(command);
        //コマンドをコマンドスタックに追加して実行
        //コマンドスタックは、操作の履歴を管理し、取り消し（Undo）ややり直し（Redo）などの機能を提供
    }
});
