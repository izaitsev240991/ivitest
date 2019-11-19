document.addEventListener("DOMContentLoaded", () => {

  (function changeText() {
    const text = document.querySelector('.diamond span');
    let arr = [ '1','2','3','Go!'],
     current = 0;
    setTimeout(function go() {
      text.textContent = arr[current];
      if (current < arr.length-1) {
        current++;
        setTimeout(go, 500);
      }else{
        current = 0;
        setTimeout(go, 3000);
      }
      
    }, 3000);
  })()

  });
 