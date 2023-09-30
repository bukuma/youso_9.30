// $.browser function

// required to be compatible with jquery.layout and jquery.handsontable
// 古いバージョンのjQuery（1.x系列）において、ブラウザのユーザーエージェント（User Agent）文字列を解析してブラウザの種類とバージョンを特定し、
//それに基づいてjQueryオブジェクトに jQuery.browser プロパティを追加するためのもの
jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];
    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
    };
    //もしも jQuery.browser プロパティが存在しない場合、ブラウザ情報を取得して設定
    if ( !jQuery.browser ) {
    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};
    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }
    // Chrome is Webkit, but Webkit is also Safari.
    //Chrome は Webkit ですが、Webkit は Safari でもある
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }
    //Query.browser プロパティにブラウザ情報を設定
    jQuery.browser = browser;
    }
    