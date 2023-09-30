//draw2d.Connection クラスを拡張（extend）して HoverConnection という新しいカスタム接続クラスを定義
//この新しいクラスは、Draw2D.jsの Connection クラスの機能を継承し、さらに独自の動作やプロパティを追加できるようにしている
var HoverConnection = draw2d.Connection.extend({

    init: function ( sourcePort, targetPort) {
        //init メソッドは、2つの引数 sourcePort および targetPort を受け取る
        //一般的に、接続が2つのオブジェクトまたはエレメントを接続するときに使用される
        /*init メソッドの中で、通常は以下のようなタスクが実行される
          1.接続の属性の設定: カスタム接続に固有の属性やスタイルを設定します。例えば、線の色や線の種類、矢印のスタイルなどを設定します。
          2.イベントハンドラの登録: 接続に関連するイベントハンドラを登録します。これにより、接続に対するユーザーアクションに応答するためのコードを設定できます。
          3.ターゲットとソースのポートの設定: ターゲットポートとソースポートを接続に関連付けます。これにより、接続がどの要素間で行われるかが決まります。
          4.その他の初期化処理: カスタム接続に固有の初期化処理を実行します。これは接続の振る舞いや特性に関連するものです。
         */

        //カスタムの接続（Connection）クラスのインスタンスを初期化
        var self = this;
        //現在のコンテキスト（this）を self という変数に格納
        //これは通常、コールバック関数内で this の値が変わることを回避するために行われる
        //self 変数を使用することで、後で this の値を元に戻すことができる
        this._super({
            //親クラスのコンストラクタを呼び出している
            //_super は、通常、親クラスのコンストラクタを呼び出すための方法を提供する特別なメソッド
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            //router プロパティは、接続のルーティング方法を指定している
            //raw2d.layout.connection.InteractiveManhattanConnectionRouter クラスのインスタンスを新しく作成
            //"Interactive" という言葉がついていることから、ユーザーの対話に応じてルートが変更できる可能性がある
            radius: 5,
            //radius プロパティは、接続の曲率半径を設定
            source: sourcePort,
            // sourcePort: source プロパティは、接続のソースポートを指定
            //sourcePort は、接続の出発点となるポートを表すオブジェクト
            target: targetPort,
            //target プロパティは、接続のターゲットポートを指定
            //targetPort は、接続の到達点となるポートを表すオブジェクト
            stroke: 1.35
            //stroke プロパティは、接続の線の太さを指定
        });

        //カスタム接続（Connection）に対して "dragEnter" イベントハンドラを追加
        //このイベントハンドラは、接続がドラッグ操作の対象となったときに実行され、接続の外観を変更する
        this.on("dragEnter", function (emitter, event) {
            //this はカスタム接続オブジェクトを表しており、on メソッドを呼び出して "dragEnter" イベントハンドラを設定
            //このイベントハンドラは、接続がドラッグ操作の対象となった場合に実行される
            //function (emitter, event) { ... }: "dragEnter" イベントが発生した際に実行される匿名関数が定義されている
            //emitter: イベントを発生させたオブジェクト（emitter）
            //event: 発生したイベントに関する情報を含むオブジェクト
            self.attr({
                //self は以前に定義された変数で、通常は this のコンテキストをキャプチャするために使用される
                //この行では、self が指すカスタム接続に対して、新しい属性を設定してしている
                outlineColor: "#303030",
                outlineStroke: 2,
                color: "#00a8f0"
            });
        });

        //このコードは、ドラッグ操作から接続が離れたときに、接続の外観を元に戻し、強調表示を解除するために使用される
        //ユーザーが接続をドラッグし、接続元または接続先から離れると、接続は通常のスタイルに戻る
        this.on("dragLeave", function (emitter, event) {
            //this はカスタム接続オブジェクトを表しており、on メソッドを呼び出して "dragLeave" イベントハンドラを設定している
            //このイベントハンドラは、接続がドラッグ操作から離れた場合に実行される
            self.attr({
                //self は以前に定義された変数で、通常は this のコンテキストをキャプチャするために使用される
                outlineColor: "#303030",
                outlineStroke: 0,
                color: "#000000"
            });
        });
    },

    /**
     * required to receive dragEnter/dragLeave request.
     * This figure ignores drag/drop events if it is not a valid target
     * for the draggedFigure
     *
     * @param draggedFigure
     * @returns {HoverConnection}
     */
    //カスタム接続（Connection）の delegateTarget メソッド
    //このメソッドは、接続に関連付けられた図形（Figure）を返す役割を果たす
    delegateTarget: function(draggedFigure)
    //draggedFigure: ドラッグ操作の対象となっている図形を表す引数
    {
        return this;
        //this キーワードを使用して、delegateTarget メソッドが呼び出されたカスタム接続自体を返す
    }
});