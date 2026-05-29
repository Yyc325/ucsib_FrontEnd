!(function (doc: any, win: any): any {
  const docEle = doc.documentElement,
    evt = "onorientationchange" in window ? "orientationchange" : "resize";
  let screenRatio = 1;
  const screenW = window.screen.width;
  if (window.devicePixelRatio !== undefined) {
    screenRatio = window.devicePixelRatio;
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    screenRatio = window.outerWidth / window.innerWidth;
  }
  const fn = function () {
    const platform = navigator.platform;
    const width = docEle.clientWidth;
    let ratio = 1; //浏览器当前缩放比
    const macOperator = ["MacIntel"];
    // if(platform === 'Win32'){
    if (window.devicePixelRatio !== undefined) {
      ratio = screenRatio / window.devicePixelRatio;
    } else if (
      window.outerWidth !== undefined &&
      window.innerWidth !== undefined
    ) {
      ratio = screenRatio / (window.outerWidth / window.innerWidth);
    }
    if(width>600){
      docEle.style.fontSize = (16 * (width / 1920)) / ratio + "px";
    }

    // }else if(macOperator.includes(platform) || platform.includes('Mac')){
    //   // const winWidth = window.innerWidth || document.body.clientWidth
    //   // const zoomNum = winWidth / 1920
    //   // document.body.style.zoom = zoomNum + ''
    //   docEle.style.fontSize =10* (width / screenW)+'px'
    // }
  };

  win.addEventListener(evt, fn, false);
  doc.addEventListener("DOMContentLoaded", fn, false);
})(document, window);
