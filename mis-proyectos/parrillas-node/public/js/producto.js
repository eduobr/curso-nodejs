let producto = document.getElementsByClassName('producto');
let prodBtn = document.getElementsByClassName('producto-boton');

Array.from(producto).forEach((prod,index) => {

    prodBtn[index].style.visibility="hidden";

    prod.addEventListener('mouseover',function(){
        prodBtn[index].style.visibility="visible";
    });

    prod.addEventListener('mouseout',function(){
        prodBtn[index].style.visibility="hidden";
    });
})
console.log(prodBtn);

