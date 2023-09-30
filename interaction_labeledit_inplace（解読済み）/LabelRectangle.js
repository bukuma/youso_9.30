/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */

//Draw2Dライブラリを使用してカスタムのラベル付き長方形図形を作成する
var LabelRectangle= draw2d.shape.basic.Rectangle.extend({
//LabelRectangle という変数を宣言
// draw2d.shape.basic.Rectangle クラスを拡張して新しい図形クラスを定義   
    init:function(attr)
    //init メソッドは、カスタム図形クラスのコンストラクタとして機能
    //このメソッドは図形が作成されたときに呼び出される
    {
      this._super(attr);
      //_super メソッドを呼び出し、親クラスのコンストラクタを実行
      //これにより、親クラスの属性設定が継承される
    
      this.label = new draw2d.shape.basic.Label({text:"I'm a Label", color:"#0d0d0d", fontColor:"#0d0d0d"});
      //draw2d.shape.basic.Label クラスの新しいインスタンスを作成し、this.label 変数に格納
      //このラベルは "I'm a Label" というテキストを持ち、テキストの色とフォントカラーが設定されている
      
      this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
      //this.add(...) を使用して、ラベルを図形に追加
      //new draw2d.layout.locator.CenterLocator(this) は、ラベルの位置を図形の中央に配置するためのロケータを指定している

      this.label.installEditor(new draw2d.ui.LabelInplaceEditor());
      //this.label.installEditor(...) を使用して、ラベルに対するインプレースエディタ（テキストを直接編集できるツール）をインストール
      //draw2d.ui.LabelInplaceEditor() は、ラベルのインプレースエディタのインスタンスを作成
      //LabelRectangle は、ラベルを持つ長方形図形を表す
      //ラベルは図形の中央に配置され、ユーザーがテキストを編集できるようになる
    }
});