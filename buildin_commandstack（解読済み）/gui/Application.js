// declare the namespace for this example
//JavaScriptでオブジェクトを作成するための基本的な構文
var example = {};
//変数 example を宣言し、それに空のオブジェクト（object）を代入
//= {}: 変数 example に空のオブジェクト {} を代入
//空のオブジェクトは、プロパティを持たない空のコンテナ
//オブジェクトはキーと値のペアを格納できるため、後でプロパティを追加してデータを格納することができる

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
//example.Application という名前のオブジェクトやクラスを定義
example.Application = Class.extend(
{
    NAME : "example.Application", 

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
	// 画面のビューを作成
    {
	      this.view    = new example.View("canvas");
		  //  ツールバーを作成し、ビューと関連付ける
          this.toolbar = new example.Toolbar("toolbar",  this.view );
	       
	       
	       // layout FIRST the body
		   //画面のレイアウトを設定
		   //全体のレイアウトを設定
	       this.appLayout = $('#container').layout({
			//レイアウトは、layout メソッドを使用して設定される
			//画面全体のレイアウトとコンテンツ領域のレイアウトがそれぞれ設定されており、ウェスト（西側）とセンター（中央）のペインが設定されている
	   	     west: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#navigation"
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#content"
	            }
	       });
	      
	       //コンテンツ領域のレイアウトを設定
	       this.contentLayout = $('#content').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	} 

});
/*アプリケーションの初期化とビュー、ツールバー、レイアウトの設定を行う部分
 NAME プロパティ: クラスの名前を表すプロパティです。この場合、クラス名は "example.Application" です。
 init メソッド: クラスのコンストラクタです。アプリケーションの初期化を行います。具体的には、画面のビュー（example.View）とツールバー（example.Toolbar）を作成し、レイアウトを設定しています。
 画面のビューは "canvas" というDOM要素を使用して作成されます。
 ツールバーは "toolbar" というDOM要素を使用して作成され、ビューと関連付けられます。
 レイアウトは、layout メソッドを使用して設定されます。画面全体のレイアウトとコンテンツ領域のレイアウトがそれぞれ設定されており、ウェスト（西側）とセンター（中央）のペインが設定されています。 */