const xhr = new XMLHttpRequest();

const startTime = Date.now();
xhr.addEventListener('load', ()=>{
    const endTime = Date.now(); // الوقت بعد ما خلص التحميل
  const duration = endTime - startTime;
  console.log("Response time:", duration, "ms");
    console.log(xhr.responseText);
});

xhr.open("GET", "https://supersimplebackend.dev/products/first");

xhr.send();


