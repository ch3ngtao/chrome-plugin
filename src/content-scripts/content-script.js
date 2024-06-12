/* eslint-disable */ 
// 使用原生JS创建了一个锚点，将vue组件渲染到这个锚点上

window.onload = function () {  
  watchClick()
}

function judgeHost() {
  const host = window.location.host;
  if (host.includes('kugou')) {
    return 'kugou'
  } else if (host.includes('kuwo')) {
    return 'kuwo'
  } else return 'error'
}


function watchClick() {
  var activeBtn = null
  const host = judgeHost()
  if (host === 'kuwo') {
    const btns = document.getElementsByClassName('bg_primary');
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].innerText === '立即播放') {
        activeBtn = btns[i]
        break;
      }
    }
    activeBtn.addEventListener('click', function () {
      window.confirm('是否下载当前播放的歌曲？') ?
      downloadMusic() : ''
    })
  } else if (host === 'kugou') {
    try {
      const audio = document.getElementById('myAudio')
      audio.addEventListener('play', function () {
        window.confirm('是否下载当前播放的歌曲？') ?
        downloadMusic() : ''
      })
    } catch (error) {
      // console.log(error);
    }
  }
}


function downloadMusic() {
  try {
    var audio = null
    if (judgeHost() === 'kuwo') {
      const audios = document.getElementsByTagName('audio');
      console.log(audios, 'audios');
      audio = audios[audios.length - 1];
    } else if (judgeHost() === 'kugou') {
      audio = document.getElementById('myAudio')
    } else return;
    const url = audio.src;
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
  } catch (error) {
      console.error(error);
  }
}
