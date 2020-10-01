var n = 60;
var pause = false;
var spd = 5;
var map = {}, rev_map = {};
var arr = [];
var wdh;
var has_ended = false;
var right_pos = []
var min = 50;
var delay = 1000;

// writes final details of the sorting algorithms.
function write_details(params) {
  var ctx = canvas.getContext('2d');
  ctx.font = '30px serif';
  ctx.fillStyle = '';
  let time = "TIME TAKEN (in milliseconds) : " + params.total_time.toString();
  let comp = "TOTAL COMPARISIONS : " + params.comparisions.toString();
  let swps = "TOTAL SWAPS DONE : " + params.no_of_swaps.toString();
  ctx.fillText("DETAILS OF SORTING", 30, 50);
  ctx.font = '20px serif';
  ctx.fillStyle = '';
  ctx.fillText(time, 30, 75);
  ctx.fillText(comp, 30, 100);
  ctx.fillText(swps, 30, 125);
}

// function to draw the visulaizer
function draw(array, color1, color2, v = false) {
  if (canvas.getContext) {
    var ct = canvas.getContext('2d')
    var curx = 20;
    var wid = wdh, c1 = 0, c2 = 0, c3 = 0;
    ct.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < array.length; i++) {
      console.log("sharma");
      if (has_ended)
        ct.fillStyle = 'blue';
      else
        if (i == color1) {
          ct.fillStyle = 'red';
          c1++;
        }
        else
          if (i == color2) {
            ct.fillStyle = 'yellow';
            c2++;
          }
          else
            if (right_pos.indexOf(i) >= 0) {
              ct.fillStyle = 'blue';
              c3++;
            }
            else
              ct.fillStyle = '#221f3b';
      var h = array[i];
      ct.fillRect(curx, canvas.height - h, wid, h);
      curx += (wid + 1);
    }
  }
  else {
    console.log("error");
  }
}


function FastBubble(arr) {
  var start = performance.now();
  var comp = 0, swp = 0;
  var i, j;
  var swap = false;
  for (i = 0; i < arr.length; i++) {
    swap = false;
    for (j = 0; j < arr.length - 1 - i; j++) {
      comp++;
      if (arr[j] > arr[j + 1]) {
        swap = true;
        swp++;
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  var tot_time = (performance.now() - start);
  var ss = 150;
  return {
    total_time: tot_time,
    comparisions: comp,
    no_of_swaps: swp
  }
}

function shuffle(len) {
  right_pos = []
  arr = []
  n = len;
  var st = min;
  for (var i = 0; i < len; i++) {
    arr.push(st);
    st += 5;
  }
  wdh = Math.floor((1420 - 40 - n + 1) / n);
  var idx = len;
  while (0 !== idx) {
    ridx = Math.floor(Math.random() * idx);
    idx -= 1;
    tmp = arr[idx];
    arr[idx] = arr[ridx];
    arr[ridx] = tmp;
  }

  console.log(arr.length);
}

function new_draw(a) {
  shuffle(a);
  draw(arr, 0, n + 1);
}


//function to implement bubble sort
function* BubbleSort(arr) {
  var swap = false;
  var i, t = arr.length;
  do {
    swap = false;
    for (i = 0; i < t - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap = true;
        var tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        draw(arr, i, i + 1);
        yield swap;
      }
    }
    right_pos.push(i);
    t--;
    if (t == 0 || !swap) {
      has_ended = true;
    }
  } while (swap);
}

function STOP() {
  pause = true;
  document.getElementById('bubblesort').disabled = false;
  document.getElementById("quicksort").disabled = false;
  document.getElementById('insertionsort').disabled = false;
  document.getElementById('ref').disabled = false;
  document.getElementById('change').disabled = false;
  document.getElementById('stop').style.visibility = "hidden";
}
function change_values() {
  var inp = document.getElementById('input').value;
  if (inp.length == 0)
    return;
  arr = [];
  right_pos = [];
  if (inp.length != 0) {
    arr = inp.split(" ").map(Number);
    n = arr.length;
    document.getElementById('input').value = "";
  }
  console.log(arr);
  wdh = Math.floor((1417 - 40 - n) / n);
  draw(arr, 0, 10000);
}

function At_end() {
  if (has_ended) {
    for (var i = 0; i < n; i++) {
      if (right_pos.indexOf(i) >= 0)
        continue;
      right_pos.push(i);
    }
    console.log(right_pos);
    STOP();
    console.log("shubham");

    var params = {
      total_time: 10
      , comparisions: 10,
      no_of_swaps: 20
    };
    draw(arr, 0, 1);
    has_ended = false;
  }
}

function partition(a, l, h) {
  var tmp, left = l;
  var right = h;
  var loc = l, piv = a[loc];
  while (left < right) {
    while (loc != right && a[right] > piv)
      right--;
    if (loc == right)
      return loc;
    tmp = a[loc];
    a[loc] = a[right];
    a[right] = tmp;

    loc = right;

    while (loc != left && a[left] < piv)
      left++;

    if (loc == left)
      return loc;

    tmp = a[loc];
    a[loc] = a[left];
    a[left] = tmp;

    loc = left;
  }
  return loc;
}


//function to implement quick sort
function* QuickSort(arr) {
  var start = [], end = [];
  start.push(0);
  end.push(n - 1);
  do {
    var beg = start[start.length - 1];
    var last = end[end.length - 1];
    start.pop();
    end.pop();
    var loc = partition(arr, beg, last);
    if (beg < loc) {
      start.push(beg);
      end.push(loc - 1);
    }
    if (last > loc) {
      start.push(loc + 1);
      end.push(last);
    }
    right_pos.push(loc);
    draw(arr, beg, loc);
    yield true;
  } while (start.length > 0);
}

function startQuickSort() {
  console.log("quick");
  pause = false;
  has_ended = false;
  document.getElementById('bubblesort').disabled = true;
  document.getElementById("quicksort").disabled = true;
  document.getElementById('insertionsort').disabled = true;
  document.getElementById('ref').disabled = true;
  document.getElementById('change').disabled = true;
  document.getElementById('stop').style.visibility = "visible";
  spd = 16 - parseInt(document.getElementById('speed').value, 10);
  right_pos = []
  canvas = document.getElementById("myCanvas");
  var sort = QuickSort(arr);
  let st = 0;
  function anim(ar) {
    if (pause || has_ended) return;
    if (st >= spd) {
      if (sort.next().done == true)
        has_ended = true;
      if (has_ended)
        At_end();
      st = 0;
    }
    else
      st++;
    requestAnimationFrame(anim);
  }
  setTimeout(anim(arr), 7 * 1000);
}


//function to implement insertion sort
function* InsertionSort(arr) {
  var i, j, t = 0, swap = false, key, pos;
  do {
    key = arr[t];
    pos = t;
    for (i = t - 1; i >= 0; i--) {
      if (arr[i] > key) {
        arr[i + 1] = arr[i];
        swap = true;
      }
      else
        break;
    }
    arr[i + 1] = key;
    draw(arr, pos, i + 1);
    yield swap;
    t++;
  } while (t < arr.length);
}

function startInsertionSort() {
  pause = false;
  document.getElementById('bubblesort').disabled = true;
  document.getElementById("quicksort").disabled = true;
  document.getElementById('insertionsort').disabled = true;
  document.getElementById('ref').disabled = true;
  document.getElementById('change').disabled = true;
  document.getElementById('stop').style.visibility = "visible";
  spd = 16 - parseInt(document.getElementById('speed').value, 10);
  right_pos = []
  canvas = document.getElementById("myCanvas");
  var sort = InsertionSort(arr);
  let st = 0;
  function anim(ar) {
    if (pause || has_ended) return;
    if (st >= spd) {
      if (sort.next().done == true)
        has_ended = true;
      if (has_ended)
        At_end();
      st = 0;
    }
    else
      st++;
    requestAnimationFrame(anim);
  }
  setTimeout(anim(arr), 7 * 1000);
}

function start() {
  pause = false;
  document.getElementById('bubblesort').disabled = true;
  document.getElementById("quicksort").disabled = true;
  document.getElementById('insertionsort').disabled = true;
  document.getElementById('ref').disabled = true;
  document.getElementById('change').disabled = true;
  document.getElementById('stop').style.visibility = "visible";
  spd = 16 - parseInt(document.getElementById('speed').value, 10);
  right_pos = []
  canvas = document.getElementById("myCanvas");
  var sort = BubbleSort(arr);
  let st = 0;
  function anim(ar) {
    if (pause || has_ended) return;
    if (st >= spd) {
      if (sort.next().done == true)
        has_ended = true;
      if (has_ended)
        At_end();
      st = 0;
    }
    else
      st++;
    requestAnimationFrame(anim);
  }
  setTimeout(anim(arr), 7 * 1000);
}
window.onload = function () {
  canvas = document.getElementById("myCanvas");
  new_draw(50);
}
document.getElementById("bubblesort").onclick = function () { start(); };
document.getElementById("insertionsort").onclick = function () { startInsertionSort(); };
document.getElementById("quicksort").onclick = function () { startQuickSort(); };
document.getElementById("ref").onclick = function () { new_draw(50); };
document.getElementById("change").onclick = function () { change_values(); };
document.getElementById('stop').onclick = function () { STOP(); };

