let reference  = {
  name:'refrence',
  age:'12',
  value:'hahah'
}

let worker = new Worker('./work.js')

//worker.postMessage(reference)


function consoleReference() {
  console.log(reference);
}

let canvas = document.querySelector('canvas').transferControlToOffscreen()
worker.postMessage(canvas,[canvas])

